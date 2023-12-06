## CS 475 - Operating Systems

### Project 3: Timesharing and Synchronization

The current version of Xinu implements a priority scheduling policy with aging. It's an improvement over FIFO, to be sure, but it still lacks responsiveness if processes aren't cooperatively yielding the CPU to one another. In those cases, a high priority CPU-intensive job could still dominate and monopolize system resources.

In this project, we will first introduce the hardware timer, which will interrupt the system and invoke the scheduler at fixed intervals of time, known as a quantum. We must also then implement mutex exclusion through the implementation of a spin lock.

#### Student Outcomes

- To extend Xinu to support a time-sharing environment
- To extend Xinu with an atomic locking mechanism
- Experience programming the classic Intel 8254 Programmable Interval Timer (PIT)
- Experience reading hardware specifications

#### Pair Assignments

You will be working with the following students. Just one submission per group is sufficient.

```
[J Kaeppel, R Weaver]
[J Ota, M Sanchez-Forman]
[B Gamble, R Mathur]
[E Markewitz, C Hong, C Brace]
[B McAuliffe, B Williams]
[L Leary, F Godfrey-Link]
[S Park, K Schuh]
[A Vermeulen, T Gaeta]
[R Pietenpol, E Shimanski]
```

#### Starter Code

Starter code for this assignment is provided on the github repo. You are not required to submit your code to me on Github, but it's strongly recommended that you do.

- If you want to submit your code on Github, do this step. If not, you may skip this step. Make sure you already have a Github account. Login to github, and go here: [https://github.com/davidtchiu/cs475-proj3](https://github.com/davidtchiu/cs475-proj3). Choose to _*fork*_ this repository over to your github account to obtain your own copy. Copy the Github URL to _your_ newly forked project. Then follow the rest of the instructions below. From your Ubuntu virtual machine, open a terminal, and _*clone*_ your forked Github repo down to your local working directory using:

  ```
  git clone <your-github-url-for-this-project>
  ```

- If you aren't planning to submit your assignment via a Github link, then you can simply download the starter files onto your Ubuntu virtual machine using:

  ```
  git clone https://github.com/davidtchiu/cs475-proj3
  ```

#### Solution Executable

I've provided you with a precompiled solution called `xinuSol` in the `compile/` directory. If you're interested to see the proper behavior, navigate to `compile/` and run `./uploadSol.sh` to upload my precompiled kernel to the back-end VM. Then start up the back-end VM and run `minicom`.

#### Part 1: Preliminary

The current version of Xinu is a **cooperative multiprogramming system**, because a running process only gives up the CPU when it terminates, blocks on I/O, or politely relinquishes the CPU by calling `resched()` (that's the cooperative part). What this means is that a not-so-polite process could still hog the CPU until it finishes its job, forcing all other processes to wait. This makes for a system that is not very interactive. Furthermore, if an executing process is in an infinite loop (malicious or just buggy), how does any other process on the ready queue ever get a chance to execute? Indeed, if one of those waiting processes is the kernel itself, then it would never regain control, and that's a big problem.

Luckily, our hardware architecture includes a programmable interval timer (PIT), that can trigger an interrupt at fixed intervals of time known as a `QUANTUM`. A global variable called `preempt` is initialized to the value of `QUANTUM` milliseconds. Every time the timer triggers, it will interrupt the currently running process, and its handler function hands back control to Xinu, which decrements `preempt`, and if `preempt` reaches zero, it will call `resched()`. This effectively allows our system to automatically reschedule another process on the queue at fixed intervals -- without explicitly calling `resched()` ourselves. This approach is known as a time-sharing system.

1. Before we get started, add an `#include` directive for `clock.h` in `include/xinu.h` so that the clock's header is recognized by the OS code base.

2. Now let's define the length of a `QUANTUM`. Open up `include/kernel.h`. Scroll to the config params section (you know, where you added the `AGING` parameter from last project). Define a new parameter called `QUANTUM` and initialize it to a value of 10 (milliseconds).

#### Programming the Hardware Timer

It is hard to reliably generate consistent ticks using software (you'd probably understand why, by now), which is why most systems are equip with a hardware timer. On our virtual machine setup, the timer chipset is the Intel 8254-2. This is a programmable hardware timer, meaning we need to tell it what to do when the Xinu boots up. First, we need to understand what we're dealing with.

1. Download the specification for the [Intel 8254 Programmable Interval Timer](8254.pdf) here, and read up to **page 10** before moving on any further. It's okay if you don't understand everything just yet, but you'd know that these are the main takeaways:

   - There are actually three timers on this chip, called `counter 0`, `counter 1`, and `counter 2`. We only need one counter, and we'll use `counter 0`.

   - The timer doesn't know what to do with itself until it is programmed, and to program it, we write an 8-bit control word, and then an initial value for the count-down.

   - A timer will count from its initial value down to 0. When it hits 0, the timer will trigger an interrupt the CPU. The countdown value will automatically reset back to the initial value afterwards.

   - Counter 0 operates at 1.193 Mhz (that is, 1,193,000 ticks per second)

   - Our goal is to program this timer so that interrupts the CPU every millisecond.

2. To communicate with I/O devices (e.g., keyboard, mouse, graphic devices, and the 8254 timer!), the x86 architecture uses a technique known as [Port-Mapped I/O](https://en.wikipedia.org/wiki/Input/output_base_address). The architecture defines address ranges which associate with each device's registers and memory. For instance, our 8254 timer occupies ranges `0x40` to `0x5F` (these values are in hexadecimal). To talk to I/O devices, the we use two classes of instructions: `in(port_addr, val)` and `out(port_addr, val)`.

3. We want Xinu to communicate with this timer. Let's take some time to understand the `clock.h` file. This is just a simple header file with some constants defined.

   ```c
   /* clock.h */

   /* Intel 8254-2 clock chip constants */

   #define CLOCKBASE   0x40        /* I/O base port of clock chip  */
   #define CLOCK0      CLOCKBASE
   #define CLKCNTL     (CLOCKBASE+3)   /* chip CSW I/O port        */
   #define CLKTICKS_PER_SEC  1000  /* clock timer resolution       */
   extern  uint32  clktime;    /* current time in secs since boot  */
   extern  uint32  preempt;    /* preemption counter           */
   ```

   - The constant `CLOCK0` is defined. As I just described, port `0x40` is the port address of `counter 0` on the hardware timer. We'll be talking to this port to program `counter 0`'s initial value.
   - The constant `CLKCNTL` is defined. Port `0x43` is the address of control word register on the timer. We'll be talking to this port to program the chip's operations.

4. Now we need to program the timer to do what we want. Open up `clkinit.c`:

   ```c
   /* clkinit.c - clkinit */

   #include <xinu.h>
   #include <interrupt.h>
   #include <clock.h>

   uint32  clktime;        /* seconds since boot           */
   uint32  ctr1000 = 0;    /* milliseconds since boot      */
   uint32  preempt;        /* preemption counter           */

   /**
   * Initialize the clock at system start up
   */
   void    clkinit(void)
   {
       // TODO -- program the timer!
       //  Use Counter 0, 16-bit binary counter, rate generator mod, read/write
       //  least significant byte first, followed by most significant byte
       outb(CLKCNTL, ??);

       // TODO -- set initial value of the countdown!
       //  We want to set countdown in such a way that
       //  the timer goes off every 1ms
       uint16  countdown = ??;

       // TODO -- Now program the initial value for countdown
       //  must write in two operations
       outb(CLOCK0, (char) (??));  //write least significant byte of countdown
       outb(CLOCK0, (char) (??));  //write most significant byte of countdown


       // Set interrupt vector for clock to invoke clkint
       set_evec(IRQBASE, (uint32)clkint);

       preempt = QUANTUM;  // initial time quantum

       clktime = 0;        // start counting seconds

       return;
   }
   ```

   - Lines 7-9: These are important globals we'll use later. In particular, `preempt` is a count-down value. When it reaches 0, the scheduler will preempt the currently-running process, with the next eligible process on the ready queue.

   - Line 15: the `clkinit()` function is defined. This will initialize and program our hardware timer.

   - Line 19: we want to program the hardware timer (by writing to its control-word register) with the specifications given in the TODO comment. The diagram on Page 6 of the Intel 8254 Programmable Interval Timer Specification is useful. Because the control word is only one byte we'll cast it into a `char`. Use the `outb(port, value)` command, where `port` is the I/O port of the timer's control register, and `value` is the value of the control word.

   - Line 24: it's time to set the initial value for the countdown. Your timers should have a 1ms granularity -- that is, it should interrupt the CPU at a rate of every 1ms. Hint: all you need to know is that the timer ticks 1,193,000 times per second.

   - Line 28 and 29: we need to tell counter 0 about its initial value. Previously, you had programmed counter 0 to accept this value in two-steps: least-significant byte first, followed by the most-significant byte of `countdown`. You'll need to use the following bitwise operators:

     - Bitwise AND (`&`)
     - Shift right (`>>`)

   - Line 33: we register the timer with Xinu's interrupt vector. The first argument is the timer's interrupt request (IRQ) line. On x86, the timer (due to its importance) occupies IRQ line 0 (`IRQBASE`). The second argument is a pointer to the interrupt-handler function, `clkint()` (not to be confused with `clkinit()`!), which will be invoked every time the timer interrupts the CPU.

   - Line 35: `preempt` is set to the value of `QUANTUM`, and `QUANTUM` was earlier defined (10ms) as the length of a time-slice in our system.

   - Though not necessary, you can check-in with me on these values before moving on.

5. Finally, let's open up the assembly code file containing the timer's interrupt-handler `clkint.S`. You _do not_ need to modify this code, but you should try to follow the code and read the comments I made to the side. In a nutshell, here's what the timer-interrupt handler is doing:

   - First, recall the work you did previously in which you've programmed the timer to interrupt the CPU, and run this handler code every 1ms. Second, recall that we've set our `QUANTUM` to 10ms, and that a global variable named `preempt` was initialized to `QUANTUM`.

   - Push values of general-purpose registers onto the program stack (`pushal`)

   - Disable interrupts (`cli`). We wouldn't want this interrupt handler to be interrupted by another event!

   - The `preempt` global is decremented.

   - If `preempt` reaches zero, then we know we've reached `QUANTUM` ms, so `resched()` is called.

   - Otherwise, it's not time to trigger the scheduler yet, so reenable interrupts (`sti`), pop register values off the stack (and back into originating registers).

   - Return to running the code before the CPU was interrupted.

6. At this point, Xinu still doesn't know that the clock exists. Make sure you call `clkinit()` to program the timer when the system boots up. To do this, open `initialize.c`, find `sysinit()`, and call it after the PCI bus has been initialized.

7. Finally, we need to make sure that every time Xinu schedules a process, the preemption timer is reset. Open up `system/resched.c`, and right before the context switch, you must reset `preempt = QUANTUM;`

8. Take a moment to think about what scheduling policy we're running now.

#### Part 3: The Need for Synchronization

The hardware timer is installed! That's great and all, but it can lead to some really wonky results.

1. Let's demonstrate a problem with the code provided in the new `main.c` file:

   ```c
   /*  main.c  - main */

   #include <xinu.h>
   #include <stdio.h>

   void    printchar(char c)
   {
       int i;
       for (i=0; i<10; i++)
           kprintf("%c", c);
   }

   int main(uint32 argc, uint32 *argv)
   {
       //priority of process is input as the 3rd argument of create()
       ready(create((void*) printchar, INITSTK, 15, "P1", 1, 'A'), FALSE);
       ready(create((void*) printchar, INITSTK, 15, "P2", 1, 'B'), FALSE);

       return 0;
   }
   ```

   Looks harmless, right? Two processes are created: one prints 'A' ten times, another prints 'B' ten times. Notice that we don't have to call `resched()` explicitly either, because the timer's interrupt handler will do that for us. Neat!

2. Before you compile Xinu, let's define a new type called `mutex_t`, which is just an alias to a `uint32`. Open `include/kernel.h`, and define this new type under the "Xinu-specific" section.

3. Compile Xinu and run it a few times -- I'll bet you get a different result printed onto the screen each time, with As and Bs interleaved on your screen. Here are a few examples from my runs:

   ```
   BBBBBBBBAABAAAAABAAA
   ABABAABABAABBAABABBB
   ```

   If you get this effect, then the timer interrupt is working! Every time you see a switch between A and B on your screen, a context switch occurred due to the timer expiring.

   If you don't see this interleaving effect (after you've vetted the values in `system/clkinit.c`), don't panic -- this tends to happen when your computer is too fast, and it's actually completing the A and B the processes before the timer triggers. First try using a smaller value for `QUANTUM`, for instance, 2? If changing the `QUANTUM` still doesn't give you interleaving results, then go back inside `system/clkinit.c` and lower the `countdown` so that the interrupt is triggered more frequently. How much to lower it by is system dependent and a bit of trial-and-error. Try 200, then 100, then 50, ...

4. **Critical Section:** The core problem is that the stdout device is a shared resource, and printing to it is a critical section of code that cannot been interrupted to guarantee the correctness of the original intent of your code. That's right, all that effort we put into enabling the hardware timer just made our system very unpredictable. Once again, it falls on the kernel to provide a mechanism to programmers for enabling mutually exclusive access to critical sections of code in a preemptive environment. These mechanisms are known as mutex locks.

We can show that it is indeed a function of the timer by changing `QUANTUM` to a higher value. Try changing it to 1000 (1 sec), and run Xinu again. Now you're more likely to see all the As being printed before the Bs, or vice versa. This is because a process now gets one full second (which is more than enough time) to complete its print job. Reset `QUANTUM` to 10 before moving on.

5. "So, why don't we just increase quantum?!" I hear you asking. Well, if we increase `QUANTUM` to a value such that every process can finish before scheduling the next process, then aren't we back to where we started?

6. We need a more robust approach. One that will provide mutual exclusion to a critical section in a preemptive environment.

#### Part 4: Spin Locks

To provide basic synchronization in Xinu, we will now implement a mutex lock. But as we discussed in class, the lock code itself has a critical section, so it needs to rely on atomic operations. Recall that the instructions in atomic operations cannot be broken up, and therefore, an interrupt (context switch) cannot occur between.

##### Test and Set

- For kicks, we've provided our own implementation of the atomic `test_and_set()`.

- Open `system/testandset.S` to reveal the assembly code for the `test_and_set()` operation. **You need to add a comment for every line of code**. You can use this syntax: `#` line comment. I've started the first one for you.

- `test_and_set()` inputs a pointer, `p` which references an integer. It then sets the value referenced by `p` to 1 and returns the old value referenced by `p`.

- If you're rusty or new to x86 assembly, [this link is very helpful.](https://en.wikibooks.org/wiki/X86_Assembly/X86_Instructions)

##### Mutex Locks

- Commenting the `test_and_set()` function should give you a better understanding of what it does at the assembly level. We now need to use it to implement locks.

- Open the `system/mutex.c` file, and complete the implementation for the following two functions. I've given you the prototypes and TODO comments. Important: It is assumed that a `mutex_t` variable storing `FALSE` means it is unlocked, and `TRUE` implies that it is locked.

  - `mutex_lock(mutex_t *lock)`: Given a pointer to a `mutex_t`, create a busy-wait loop using the `test_and_set()` operation.

  - `mutex_unlock(mutex_t *lock)`: Given a pointer to a `mutex_t`, unlock the given lock. It is worth noting here that a simple assignment statement is atomic on the x86 architecture.

##### Fixing the Printer Sync Problem

- After you've implemented the lock functions, we'll return to `system/main.c`, and fix the code so that a printer-process will execute the print loop to completion without being interrupted by the other printer-process:

  ```c
  /*  main.c  - main */

  #include <xinu.h>
  #include <stdio.h>

  mutex_t lock = FALSE;    // define a lock here

  void    printchar(char c)
  {
     mutex_lock(&lock);    // lock up the critical section!
     int i;
     for (i=0; i<10; i++)
        kprintf("%c", c);
     mutex_unlock(&lock);  // unlock it!
  }

  int main(uint32 argc, uint32 *argv)
  {
     //priority of process is input as the 3rd argument of create()
     ready(create((void*) printchar, INITSTK, 15, "P1", 1, 'A'), FALSE);
     ready(create((void*) printchar, INITSTK, 15, "P2", 1, 'B'), FALSE);

     return 0;
  }
  ```

  - **Line 6:** the `mutex_t` lock variable is defined as a global, because we want both processes to have shared access to it.

  - **Lines 10:** the first process reaching this line will atomically lock out the critical section. Because lock was initially set to FALSE, the winning process will not busy-wait.

  - **Lines 11-13:** this code block is considered the critical section, as it cannot be interrupted. Because lock is now set to `TRUE`, if the kernel context-switches to any other process trying to access this block, we can rest assured that they will be denied, and busy-waiting.

  - **Lines 14:** remember to unlock the critical section to let the a busy-waiting process in.

3. Upon successful implementation, Xinu should only print _one_ of the following:
   ```
   AAAAAAAAAABBBBBBBBBB
   BBBBBBBBBBAAAAAAAAAA
   ```
   Any other result would indicate that there is likely a bug in `mutex.c`.

#### Dining Philosophers (Graded)

You are to implement Dining Philosophers, a classic synchronization problem defined by Edsger Dijkstra (who else?). Behold, the figure below illustrates this important problem:

![Dining Phils](diningphil.jpg)

Assume there are N = 5 hungry philosophers (processes) sitting around a table, with N forks (shared resources), each between a pair of philosophers. A philosopher can only be in one of two states: eating or thinking. To think, a philosopher simply pauses for a random amount of time. To eat, a philosopher must obtain both forks on his/her left-hand and right-hand side. After eating, a philosopher releases both forks. If a philosopher obtains one fork, but cannot obtain the other, he/she relinquishes his/her other fork. Your implementation may not be deadlock free (and that's okay... for now).

##### Specific Requirements

I've started a skeleton file for you, in `system/main_phil.c`. Some noteworthy items:

- Replace `system/main.c` with `system/main_phil.c`

- The number of philosophers (and forks) N can be `#define`d to be 5.

- The function `delay()` has been defined for you. When called, the process delays execution for a random period of time.

- You can model the forks as an array of N mutex locks. Each philosopher must obtain both the left and right fork in order to eat. When N = 5, the left and right forks for each philosopher is defined as follows.

  ```
  Phil_ID   Left Fork   Right Fork
  0	      fork[0]	   fork[4]
  1	      fork[1]	   fork[0]
  2	      fork[2]	   fork[1]
  3	      fork[3]	   fork[2]
  4	      fork[4]	   fork[3]
  ```

- You must declare and initialize all locks' values in the global scope, not from inside `main()`.

- The `philosopher()` function is the code executed by each process. It contains an infinite loop, whose body has the following requirements:

  - There is a 30% chance that the philosopher will want to eat, and a 70% chance the philosopher just wants to think. Use `srand(uint32)` to seed the random number generator for each philosopher (just input the philosopher's ID. After seeding, use `rand()` to get a random integer.

  - When the philosopher wants to think, print out a message with the philosopher's ID. Then call `think()` to delay the philosopher's execution by a random amount of time.

  - When the philosopher wants to eat, attempt to grab both forks. If you can only obtain one, but not the other, you must release the fork you acquired, and make a think/eat decision again. If you successfully obtained both forks, print out a message with the philosopher's ID. Then call `eat()` to delay the philosopher's execution by a random amount of time. Release the forks after you eat so other philosophers won't starve!

- Here is the first 100 lines from my sample run:

  ```
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 4 eating: nom nom nom
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 4 thinking: zzzzzZZZz
  Philosopher 3 thinking: zzzzzZZZz
  Philosopher 4 thinking: zzzzzZZZz
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 1 thinking: zzzzzZZZz
  Philosopher 2 thinking: zzzzzZZZz
  Philosopher 2 eating: nom nom nom
  Philosopher 3 thinking: zzzzzZZZz
  Philosopher 3 thinking: zzzzzZZZz
  Philosopher 4 eating: nom nom nom
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 1 thinking: zzzzzZZZz
  Philosopher 1 thinking: zzzzzZZZz
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 4 thinking: zzzzzZZZz
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 2 eating: nom nom nom
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 4 eating: nom nom nom
  Philosopher 3 thinking: zzzzzZZZz
  Philosopher 2 thinking: zzzzzZZZz
  Philosopher 1 eating: nom nom nom
  Philosopher 2 thinking: zzzzzZZZz
  Philosopher 1 thinking: zzzzzZZZz
  Philosopher 1 thinking: zzzzzZZZz
  Philosopher 1 thinking: zzzzzZZZz
  Philosopher 1 thinking: zzzzzZZZz
  Philosopher 1 eating: nom nom nom
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 4 thinking: zzzzzZZZz
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 4 thinking: zzzzzZZZz
  Philosopher 4 thinking: zzzzzZZZz
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 4 eating: nom nom nom
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 1 thinking: zzzzzZZZz
  Philosopher 1 eating: nom nom nom
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 4 eating: nom nom nom
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 1 thinking: zzzzzZZZz
  Philosopher 1 thinking: zzzzzZZZz
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 4 eating: nom nom nom
  Philosopher 3 thinking: zzzzzZZZz
  Philosopher 2 thinking: zzzzzZZZz
  Philosopher 1 thinking: zzzzzZZZz
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 2 eating: nom nom nom
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 3 thinking: zzzzzZZZz
  Philosopher 3 thinking: zzzzzZZZz
  Philosopher 4 thinking: zzzzzZZZz
  Philosopher 4 thinking: zzzzzZZZz
  Philosopher 3 eating: nom nom nom
  Philosopher 2 thinking: zzzzzZZZz
  Philosopher 2 thinking: zzzzzZZZz
  Philosopher 4 thinking: zzzzzZZZz
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 4 thinking: zzzzzZZZz
  Philosopher 4 thinking: zzzzzZZZz
  Philosopher 3 thinking: zzzzzZZZz
  Philosopher 4 thinking: zzzzzZZZz
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 4 thinking: zzzzzZZZz
  Philosopher 4 thinking: zzzzzZZZz
  Philosopher 4 thinking: zzzzzZZZz
  Philosopher 3 thinking: zzzzzZZZz
  Philosopher 2 thinking: zzzzzZZZz
  Philosopher 3 thinking: zzzzzZZZz
  Philosopher 3 thinking: zzzzzZZZz
  Philosopher 4 eating: nom nom nom
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 4 thinking: zzzzzZZZz
  Philosopher 4 thinking: zzzzzZZZz
  Philosopher 4 thinking: zzzzzZZZz
  Philosopher 3 thinking: zzzzzZZZz
  Philosopher 2 thinking: zzzzzZZZz
  Philosopher 1 eating: nom nom nom
  Philosopher 0 thinking: zzzzzZZZz
  Philosopher 4 thinking: zzzzzZZZz
  Philosopher 4 thinking: zzzzzZZZz
  Philosopher 3 eating: nom nom nom
  ```

#### Grading

```
This assignment will be graded out of 100 points:

[20pt] The hardware timer has been properly programmed, and will cause
an interrupt every 1 msec (and scheduler is invoked every QUANTUM msecs).

[20pt] The test_and_set() assembly code has been correctly commented
line-by-line.

[15pt] The functions in system/mutex.c have been properly implemented.
Specifically, spin locks must be atomic.

[50pt] The dining philosophers problem has been successfully implemented.

[5pt] The README is written and placed in your project directory. Your
program observes good style and commenting.
```

#### Submitting Your Assignment

After you have completed the assignment, use the following to submit your work on Canvas. I assume you wrote your program inside your virtual machine. There are two options to submit your work.

1. If you pushed all your code to a Github repository: Make sure your Github repo is public, and simply submit the URL to your repo to me on Canvas.

2. If you'd rather submit a "zipped" file on Canvas, do the following .

   - Open the Terminal, navigate into your project's `compile/` directory. Run `make clean` to remove the binaries.

   - Zip up your project directory: `tar -czvf proj3_name1_name2.tar.gz proj3/` where name1 and name2 refer to your last names.

3. Go into canvas and click on `Submit Assignment`, and you should be able to "browse" for your file.

4. When you've selected the proper file, click Submit Assignment again to upload it.

5. You may submit as often as you'd like before the deadline. I will grade the most recent copy.

6. I do not need separate submissions from your partner!

#### Credits

Written by David Chiu. 2015.
