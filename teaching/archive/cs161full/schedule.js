let days = {
  assignments: {
    homework: [
      {
        name: "Hwk 1",
        title: "A Better Circle",
        url: "hwk1.circle/",
        due: "9/13/2021",
      },
      {
        name: "Hwk 2",
        title: "Calculator",
        url: "hwk2.calc/",
        due: "9/24/2021",
      },
      {
        name: "Hwk 3",
        title: "Orca Card",
        url: "hwk3.orca/",
        due: "10/6/2021",
      },
      {
        name: "Hwk 4",
        title: "Robots!",
        url: "hwk4.robot/",
        due: "10/20/2021",
      },
      {
        name: "Hwk 5",
        title: "Loops",
        url: "hwk5.loops/",
        due: "11/1/2021",
      },
      {
        name: "Hwk 6",
        title: "Tweet Processor",
        url: "hwk6.twitter/",
        due: "11/15/2021",
      },
      {
        name: "Final Hwk Prep",
        title: "Final Homework Proposal (Optional)",
        url: "hwk7.prep/",
        due: "11/19/2021",
      },
      {
        name: "Final Hwk (alternate)",
        title: "Pooled Testing",
        url: "hwk7.pooled/",
        due: "12/6/2021",
      },
      // {
      //   name: "Final Hwk",
      //   title: "Black Jack",
      //   url: "hwk8.blackjack/",
      //   due: "12/10/2021",
      // },
    ],
    /////////////////////////////////// labs /////////////////////////////////////////
    labs: [
      {
        name: "Zoom Lab 1",
        title: "Draw My Picture (BlueJ)",
        url: "lab1.bluej/",
        due: "9/3/2021",
      },
      {
        name: "Zoom Lab 2",
        title: "Variables (Scope and Lifetime)",
        url: "lab2.vars/",
        due: "9/10/2021",
      },
      {
        name: "Zoom Lab 3",
        title: "Stomach Class (Class Writing)",
        url: "lab3.stomach/",
        due: "9/17/2021",
      },
      {
        name: "Zoom Lab 4",
        title: "Guessing Game (Conditionals)",
        url: "lab4.guessing/",
        due: "9/24/2021",
      },
      {
        name: "Zoom Lab 5",
        title: "Circle Drawer (Objects)",
        url: "lab5.circleDrawer/",
        due: "10/1/2021",
      },
      {
        name: "Zoom Lab 6",
        title: "Turtle Graphics (Loops)",
        url: "lab6.turtle/",
        due: "10/15/2021",
      },
      {
        name: "Zoom Lab 7",
        title: "Combo Guesser (Arrays)",
        url: "lab7.combo/",
        due: "10/22/2021",
      },
      {
        name: "Zoom Lab 8",
        title: "Super Circle Drawer (ArrayLists)",
        url: "lab8.superCircleDrawer/",
        due: "10/29/2021",
      },
      {
        name: "Zoom Lab 9",
        title: "Election (HashMaps)",
        url: "lab9.election/",
        due: "11/5/2021",
      },
      {
        name: "Zoom Lab 10",
        title: "Boulders (File I/O, Parsing)",
        url: "lab10.boulders/",
        due: "11/19/2021",
      },
      // {
      //   name: "Zoom Lab 11",
      //   title: "Playing Cards (Constants, Enum; IntelliJ IDE)",
      //   url: "lab11.cards/",
      //   due: "12/3/2021",
      // },
      {
        name: "Zoom Lab 11",
        title: "Elementary Complexity Analysis",
        url: "lab11.perf/",
        due: "12/3/2021",
      },
    ],
  },
  lectures: [
    // wk 1
    "Introductions: Who are we? Syllabus",
    "What is CS?",
    "Zoom Lab 1",
    "CS: hardware, languages",
    // wk 2
    "<strong>Labor Day<br/>(no class)</strong>",
    "Circle class: Comments, fields, data types",
    "Zoom Lab 2",
    "Writing constructors; parameters, assignment statement",
    // wk 3
    "Writing methods, calling methods, returning",
    "Writing classes: TicketMachine. Printing",
    "Zoom Lab 3",
    "Conditionals",
    // wk 4
    "Else-if; Start data types: primitives",
    "Type-casting (narrowing, widening)",
    "Zoom Lab 4",
    "Classes as types: references, object equivalence",
    // wk 5
    "Abstraction and modularity: Organism",
    "Abstraction: Working with APIs; Unpacking Strings",
    "Zoom Lab 5",
    "String exercises",
    // wk 6
    "Start loops; reading; tracing",
    "<strong><emph>Review</emph></strong>",
    "<strong><emph>Exam 1</emph></strong>",
    "Writing loops: while",
    // wk 7
    "Exam review; Start For loops",
    "More loop examples",
    "Zoom Lab 6",
    "Nested loops",
    // wk 8
    "<strong>Fall Break (no class)</strong>",
    "Arrays; Start Bank",
    "Zoom Lab 7",
    "Review Lab; Finish Bank",
    // wk 9
    "Start ArrayList",
    "ArrayList",
    "Zoom Lab 8",
    "Scanning for input: ChatBot",
    // wk 10
    "Finish ChatBot; Start HashMap",
    "HashMap, for-each loop",
    "Zoom Lab 9",
    "HashMap (cont.): Smarter ChatBot",
    // wk 11
    "Start files",
    "<strong><emph>Review</emph></strong>",
    "<strong><emph>Exam 2</emph></strong>",
    "File I/O; String parsing; Sorting ArrayLists",
    // wk 12
    "Information hiding, static, main()",
    "enum; IntelliJ IDE",
    "Zoom Lab 10",
    "enum; IntelliJ IDE",
    // wk 13
    "Start complexity: Linear and Binary search",
    "<strong>Thanksgiving</strong>",
    "<strong>Thanksgiving</strong>",
    "<strong>Thanksgiving</strong>",
    // wk 14
    "Selection sort",
    "Bubble Sort and optimizations",
    "Zoom Lab 11",
    // "Shaker sort, list operations",
    "Recursion",
    // wk 15
    "Recursion (cont.)",
    "<strong><emph>Review</emph></strong>",
    "<strong>Reading Period</strong>",
    "<strong>Reading Period</strong>",
    // wk final
    "",
    "<strong><emph>Final Exam (12p - 2p)</strong></emph>",
    "",
    "",
  ],
};

// print out the schedule to HTML
const schedule = new CourseCalendar("8/30/2021", days, MWRF);
schedule.generateHTMLAssigments();
schedule.generateHTMLCalendar();
