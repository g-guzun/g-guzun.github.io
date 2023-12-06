  

let days = {
  resources: [
    {
      name: "Course Syllabus",
      url: "syllabus"
    },
    {
      name: "Notes and Sample Code",
      url: "https://canvas.pugetsound.edu"
    },
  ],
  assignments: {
    homework: [
      {
        name: "Hwk 0 (vscode)",
        title: "Setting up VS Code",
        url: "hwk0.vscode/",
        due: "1/18/2023",
      },
      {
        name: "Hwk 1 (wordstat)",
        title: "Getting Started with C",
        url: "hwk1.ws/",
        due: "1/23/2023",
      },
      {
        name: "Hwk 2 (sorting)",
        title: "Pointers, Arrays, Strings",
        url: "hwk2.ptrs/",
        due: "1/30/2023",
      },
      {
        name: "Hwk 3 (ls2)",
        title: "Dynamic Memory Allocation",
        url: "hwk3.malloc/",
        due: "2/6/2023",
      },
      {
        name: "Hwk 4 (dsh)",
        title: "David Shell",
        url: "hwk4.dsh/",
        due: "2/20/2023",
      },
      {
        name: "Hwk 5 (mmm)",
        title: "Matrix Multiplication",
        url: "hwk5.mmm/",
        due: "3/7/2023",
      },
      {
        name: "Hwk 6 (ts_hashmap)",
        title: "Thread-Safe Hashmap",
        url: "hwk6.hashmap/",
        due: "3/27/2023", // after break
      },
      {
        name: "Hwk 7 (OneLaneBridge)",
        title: "The One Lane Bridge ",
        url: "hwk7.thebridge/",
        due: "4/14/2023",
      },
      {
        name: "Hwk 8 (bankers)",
        title: "Banker's Algorithm",
        url: "hwk8.bankers/",
        due: "4/28/2023",
      },
      {
        name: "Extra Credit",
        title: "Bonus Tech Report",
        url: "hwkB.report/",
        due: "5/3/2023",
      },
    ],
    ////////////////////////////// PROJECTS ///////////////////////////////
    projects: [
    //   {
    //     name: "Proj 1",
    //     title: "Ready Queue",
    //     url: "proj1/",
    //     due: "3/7/2022",
    //   },
    //   {
    //     name: "Proj 2",
    //     title: "Priority Scheduling",
    //     url: "proj2/",
    //     due: "3/25/2022",
    //   },
    //   {
    //     name: "Proj 3",
    //     title: "Time-Sharing and Locks",
    //     url: "proj3/",
    //     due: "4/18/2022",
    //   },
    //   {
    //     name: "Proj 4",
    //     title: "Deadlock Detection",
    //     url: "proj4/",
    //     due: "5/13/2022",
    //   },
    ],
  },

  lectures: [
    // wk 1
    "<strong>MLK Day<br/>(no class)</strong>",
    "Intro: What is OS?",
    "<font color='blue'>C Lab (Attendance required; Bring laptops)</font>",
    // wk 2
    "Intro: History of computer systems",
    "Intro: Job scheduling models",
    "<font color='blue'>C Lab (Attendance required; Bring laptops)</font>",
    // wk 3
    "Invoking OS: Booting, interrupts",
    "Invoking OS: Traps and system calls",
    "<font color='blue'>C Lab (Attendance required; Bring laptops)</font>",
    // wk 4
    "Processes: PCB, address space, program stack",
    "Processes: state transitions, fork()",
    "Processes: wait(); zombies and orphans",
    // wk 5
    "Processes: exec() system call",
    "Start Threads; User vs. kernel threads",
    "Threads: pthread library",
    // wk 6
    "Threads: Performance and data sharing; Amdahl's Law",
    "<strong><emph>Review</emph></strong>",
    "<strong><emph>Exam 1</emph></strong>",
    // wk 7
    "Scheduling: goals and metrics; FCFS",
    "Sched: RR, SJF, SRTF",
    "Sched: Priority, MLFQ; Examples: Linux O(1) and CFS",
    // wk 8
    "Sched: hyperthreading, multicore considerations",
    "Synchronization: critical section",
    "Sync: spin locks; atomic ops",
    // wk 9
    "<strong><emph>Spring break</emph></strong>",
    "<strong><emph>Spring break</emph></strong>",
    "<strong><emph>Spring break</emph></strong>",
    // wk 10
    "Sync: blocking locks",
    "Sync: semaphores",
    "Sync: more semaphores",
    // wk 11
    "Sync: monitors and condition variables",
    "Sync: synchronization in Java",
    "Start deadlock conditions",
    // wk 12
    "DL: RAGs, detection and recovery",
    "<strong><emph>Review</emph></strong>",
    "<strong><emph>Exam 2</emph></strong>",
    // wk 13
    "DL: Banker's algorithm",
    "Memory Management: virtual addressing",
    "MM: memory partitioning",
    // wk 14
    "MM: segmentation",
    "MM: paging",
    // "MM: multi-level paging",
    "MM: translation caching",
    // wk 15
    "<strong><emph>Cancelled</emph></strong>",
    "Start Virtual Memory",
    "VM: Replacement policies: FIFO, LRU",
    // wk 16
    "VM: Clock",
    "Memory allocation and working set",
    // "Start File System",
    // "File System",
    "<strong>Reading Period</strong>",
    // "VM: memory allocation (cont.)",
    // "VM: malloc(), free()",
    // wk final
    "<strong><emph>Final Exam<br/>4:00-6:00</emph></strong>",
    "",
    "",
  ],
};

// print out the schedule to HTML
const schedule = new CourseCalendar("1/16/23", days, MWF);
schedule.generateHTMLResources();
schedule.generateHTMLAssigments();
schedule.generateHTMLCalendar();
