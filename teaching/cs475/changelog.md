# TODO
- I think I have to take the first week to teach C. Then give them just one or two significant C programs.
- Move off of Deadlocks in favor of File Systems. Need a simpler MMU homework.
- Let them pair up on a few homework assignments
- Give them (much) more time for Hwk 3. Maybe make it due on Wednesday or Friday.
- Hwk 3: Don't give them a stack. It's confusing them. Give them a list.
- Hwk 3: Do I need to talk about creating arrays of strings this early? Maybe save for Hwk 4.
- Hwk 3: More hand-holding. For instance, tell them their recursive method should return 1 or 0 depending on whether something was found. Then use that value to determine if the current directory should be printed.
- Move off of zyBooks. Use diveintosystems instead for C.

# Change Log

## Spring'22
- Replaced Hwk 7 thebar (C) with OneLaneBridge (Java)
- Added Hwk 6 ts_hashmap (locks)
- Added a short valgrind tutorial to Hwk 3.
- Modified Hwk 4 to remove .dsh_motd
- Modified Hwk 3 to cover string allocation, 2D array allocation; struct allocation; added more string examples; and assignment now more challenging ls2 (syscalls) instead of rpncalc (no syscalls)
- Modified Hwk 2 to include structs
- Modified Hwk 1 to be shorter (removed structs) or to use & instead. Emphasize string functions and fgets().
- Wrote a new Hwk 0 to get students started on remote VS Code.
- No more projects. More aggressive timeline for Homework 1, 2, 3. 
- Testing out 3 lab-work days.
- Transitioned off VirtualBox. Now using remote dev on Jetstream VM.

## Spring'22
- Old develop-end VM stopped working on macs (even intel). New VM is a disaster. Network not connecting regularly. Need to work off of it.
- Added Bankers for Hwk 7
- Proj 1: No longer making them do getFirst and getLast.

# Xinu thoughts
- New Xinu project 1
  - Adding xsh commands: ps. Add uptime and cputime (and cputime/uptime)
  - Adding run <prog> command: a way to run user functions as processes (like in the test/ folder)

- New Xinu project 2: Aging
  - 
  - 

- What to do with Xinu? If I go Vbox-less (I have to at some point...)
  - Opt 0: turn on low-res mode on Mac
    - App finder -> Right click on VirtualBox -> Show package contents -> Right click on VirtualBoxVM.app -> low res
  - Opt 1: remote desktop to localhost seems to work without resTab?
    - Install VirtualBox Extensions too
    - Under setting => display, enable remote desktop
    - Using MicroSoft remote desktop client, connect to localhost
    - Hard to test.
- Want to cover filesystems
  - Nix moving average
  - Nix explaining the implementation of semaphores
  - Labs would buy me 2 more days (exams)
- Double check the monitor examples. Notify and continue? Create the animation instead of drawing.
- BackItUp instead of MMM.
- Keep Bartender, but make it harder. Let multiple people in
- If no Xinu, add sched simulation Hwk
- If no Xinu, add RAG and knots
- If no Xinu, add a Java project

- What would a Lab schedule (2 hr) consist of?

  - Lab 1: VM, shell, navigation, running binaries; C basics; gcc
  - Lab 2: Multi-file, Makefile; Arrays and Strings
  - Lab X: Debugging, gdb, other tools
  - Lab 3: Pointers and Dynamic allocation
  - Lab 4: Fork, Wait, Exec, Reaping
  - Lab 5: Threads. Get them to dispatch, join/reap; What happens on fork+thread_create? task parallel vs data parallel
  - Lab 6: Exam 1
  - Lab 7: Threads II: OpenMP?
  - Lab 8: Locks
  - Lab 9: Spring Break
  - Lab 10: Semaphores?
  - Lab 11: monitors Java
  - Lab 12: Exam 2
  - Lab 13: Bankers?
  - Lab 14: Graphs?
  - Lab 15: Work Day

- Remove prev edges, then merge Proj1 and Proj2?
