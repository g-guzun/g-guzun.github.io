## CS 475 - Operating Systems

### Hwk: The Bartender Problem (Synchronization)

A bar down the street from where I live recently hired me to study their operation's efficiency, so they asked me to write a bar simulator. Before I could finish, I got distracted by a note that I left on my fridge, and I haven't been able to do anything since.

I need your help to finish my code! I got things started, so take a look at the starter code to see how I've broken things down. You just need to add synchronization mechanisms, wait times, and some good comments (I recommend starting with the comments to gain a good understanding of the code).

#### Student Outcomes

- To work with semaphores for synchronization.
- To understand how to enforce synchronization and coordination of threads.

#### Starter Code

Starter code for this assignment is provided on the github repo. You are not required to submit your code to me on Github, but it's strongly recommended that you do.

- **This step is imperative:** Login to github, and go here: [https://github.com/davidtchiu/cs475-hwk7-thebar](https://github.com/davidtchiu/cs475-hwk7-thebar). Choose to _*fork*_ this repository over to your github account to obtain your own copy. Copy the Github URL to _your_ newly forked project. Then follow the rest of the instructions below. From  VS Code, open a terminal, and _*clone*_ your forked Github repo down to your local working directory using:

	```
	git clone <your-github-url-for-this-project>
	```


#### Working Solution

I have included a working solution of my program along with the starter code. The binary executable file is called `thebarSol`. You can run it from the terminal by first navigating in to the Hwk directory and typing the command `./thebarSol`. This is how your solution should behave when it's done.

#### The Bartender Problem

Simulate a bar establishment with the following ground rules for customers and the bartender.

- **The Bar**

  - Contains the `main()` method, which inputs an integer argument, `num`, the number of Customers.
  - The establishment is so small, it only has a max capacity of 2: the Bartender and one other Customer. All other Customers wait at outside.

- **Bartender Rules**

  - Waits until a customer arrives at (and enters) the bar.
  - When a customer places an order, it takes the Bartender a random amount of time between 5 ms and 1000 ms to make the drink.
  - When the drink is made the bartender waits for the customer to pay. (While mixing the drink, the customer is browsing some wall art.)
  - The Bartender must wait until the next customer to come and order.

- **Customer Rules**
  - Each customer takes a random amount of time between 20 ms and 5000 ms to travel to the bar. (You'll want to look into `usleep()`)
  - If there's already another customer inside the bar, customers have to wait outside until the bar is empty before entering.
  - Once indoor, the customer can ordering their drink, and afterwards, the customer can browse the wall art for a random amount of time between 3ms and 4000ms.
  - If their drink is not ready by the time they are done admiring the art, they must wait until the bartender has finished.
  - When the bartender is finished mixing, the customer pays the bartender.
  - After the bartender confirms that the payment was received, the customer leaves the bar and lets the next customer in.

#### Semaphores in C

Two important files have been included for you: `semaphore.h` and `fcntl.h`. Here are the useful semaphore functions:

- `sem_t* sem_open(const char *name, int oflag, mode_t mode, unsigned int initialValue)` -- Creates a new semaphore with the given name, mode, and initial value. Important: the given name must begin with a "/" and the initial value must be non-negative.
- `int sem_post(sem_t *s)` -- Signals (increments) the semaphore
- `int sem_wait(sem_t *s)` -- Waits on (then decrements) the semaphore
- `int sem_close(sem_t *s)` -- Closes connection to the semaphore
- `int sem_unlink(char *name)` -- Removes the semaphore by its name

The following example gives you an idea of how to use these functions.

```c
//declare this in shared space
sem_t* mutex;

//create a semaphore called mutex, with an initial value of 1
sem_unlink("/mutex");   // remove the semaphore if it exists (important!)
mutex = sem_open("/mutex", O_CREAT, 0600, 1);

//wait on the semaphore
sem_wait(mutex);

//<<do some critical-section stuff>>

//let someone else in the critical section
sem_post(mutex);

//cleanup: remove semaphores
sem_close(mutex);
sem_unlink("/mutex");
```

- Let me save you some headache: Remember in lecture how I said to think about C's semaphores like you would think about files? Let's say your program creates a semaphore, and as you run it, it deadlocks so you need to terminate the process. Even though your program is no longer running, the semaphores you opened previously are still around (just like any files that you create in the program would still be around)! The next time you run your program, their state remains how you left it **(!)** before the process exited. This is why I like to unlink (remove) any semaphores before opening them.

- It is worth noting that, online tutorials on C's semaphores sometimes use functions that have now been deprecated.

  - `sem_init()` -- deprecated: use `sem_open()` instead.
  - `sem_destroy()` -- deprecated: use `sem_close()` and `sem_unlink()` instead.

#### Example Output for 1 customer

```
Customer:										| Employee:
Traveling	Arrived		Ordering	Browsing	Register	Leaving	| Waiting	Mixing		At Register	Payment Recv
----------------------------------------------------------------------------------------+-----------------------------------------------------------
Cust 0											|
											| Bartender
		Cust 0									|
				Cust 0							|
						Cust 0					|
											| 		Bartender
											| 				Bartender
								Cust 0			|
											| 						Bartender
										Cust 0	|
```

#### Example Output for 2 customers

```
Customer:										| Employee:
Traveling	Arrived		Ordering	Browsing	Register	Leaving	| Waiting	Mixing		At Register	Payment Recv
----------------------------------------------------------------------------------------+-----------------------------------------------------------
Cust 0											|
Cust 1											|
											| Bartender
		Cust 1									|
				Cust 1							|
						Cust 1					|
											| 		Bartender
											| 				Bartender
								Cust 1			|
											| 						Bartender
											| Bartender
										Cust 1	|
		Cust 0									|
				Cust 0							|
						Cust 0					|
											| 		Bartender
											| 				Bartender
								Cust 0			|
											| 						Bartender
										Cust 0	|
```

#### Grading

```
This assignment will be graded out of 55 points:
[5pt] Threads are correctly spawned and reaped. Semaphore creation and
       removal are correctly managed.

[28pt] Proper synchronization is implemented
       (e.g., customers cannot leave before bartender receives payment).

[15pt] Your solution is free from deadlocks and starvation. All customers
       eventually get served and leave.

[2pt] Your program observes good style and commenting.

[5pt] Your program is free of memory leaks and dangling pointers.
```

#### Submitting Your Assignment

1. Commit and push your code to your Github repo. Make sure your repo is public (or private and accessible by me).

2. On canvas, simply submit the URL to your Github repo. No other form of submission is accepted.

#### Credits

Written by David Chiu and Jason Sawin. 2015.
