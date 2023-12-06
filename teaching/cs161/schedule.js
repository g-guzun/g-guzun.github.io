let days = {
  resources: [
    {
      name: "Course Syllabus",
      url: "syllabus"
    },
    {
      name: "Community Statement",
      url: "community"
    },
    {
      name: "Notes and Sample Code",
      url: "https://canvas.pugetsound.edu"
    },
    {
      name: "Download BlueJ",
      url: "https://bluej.org"
    },
    {
      name: "Download Google Drive App",
      url: "https://www.google.com/drive/download/"
    },
  ],
  assignments: {
    homework: [
      {
        name: "Hwk 0",
        title: "All About Me",
        url: "hwk0.me/",
        due: "1/23/2023", // Mon
      },
      {
        name: "Hwk 1",
        title: "A Better Circle",
        url: "hwk1.circle/",
        due: "2/1/2023", // Wed
      },
      {
        name: "Hwk 2",
        title: "Alarm Clock",
        url: "hwk2.clock/",
        due: "2/10/2023", // Fri
      },
      {
        name: "Hwk 3",
        title: "Orca Card",
        url: "hwk3.orca/",
        due: "2/20/2023", //Mon
      },
      {
        name: "Hwk 4",
        title: "Robots!",
        url: "hwk4.robot/",
        due: "3/1/2023", //Wed
      },
      {
        name: "Hwk 5",
        title: "Loops Practice I",
        url: "hwk5.loops/",
        due: "3/10/2023",  // Fri
      },
      {
        name: "Hwk 6",
        title: "Loops Practice II",
        url: "hwk6.loops2/",
        due: "3/24/2023", // Fri
      },
      {
        name: "Hwk 7",
        title: "Tweet Processor",
        url: "hwk7.twitter/",
        due: "4/7/2023", // Fri
      },
      // {
      //   name: "Hwk 7",
      //   title: "Pooled Testing",
      //   url: "hwk7.pooled/",
      //   due: "4/19/2023",  // Wed
      // },
      {
        name: "Final Hwk Prop",
        title: "Final Homework Proposal (Optional)",
        url: "hwkF.prep/",
        due: "4/14/2023",  // Fri
      },
      // // {
      // //   name: "Final Hwk (alternate)",
      // //   title: "Pooled Testing",
      // //   url: "hwkF.pooled/",
      // //   due: "5/4/2021",
      // // },
      {
        name: "Final Hwk",
        title: "Black Jack",
        url: "hwkF.blackjack.enums/",
        due: "5/3/2023", // Mon (exam period)
      },
    ],
    /////////////////////////////////// labs /////////////////////////////////////////
    labs: [
      {
        name: "Lab 1",
        title: "Draw My Picture (BlueJ)",
        url: "lab1.bluej/",
        due: "1/20/2023",
      },
      {
        name: "Lab 2",
        title: "Triangle Class (Variables, Scope, and Lifetime)",
        url: "lab2.vars/",
        due: "1/27/2023",
      },
      {
        name: "Lab 3",
        title: "Stomach Class (Class Writing)",
        url: "lab3.stomach/",
        due: "2/3/2023",
      },
      {
        name: "Lab 4",
        title: "Guessing Game (If-Else)",
        url: "lab4.guessing/",
        due: "2/10/2023",
      },
      {
        name: "Lab 5",
        title: "Circle Drawer (Objects)",
        url: "lab5.circleDrawer/",
        due: "2/17/2023",
      },
      {
        name: "Lab 6",
        title: "Diamonds (Abstraction)",
        url: "lab6.diamonds/",
        due: "3/3/2023",
      },
      {
        name: "Lab 7",
        title: "Turtle (Loops)",
        url: "lab7.turtle/",
        due: "3/10/2023",
      },
      {
        name: "Lab 8",
        title: "CC Validator (Arrays)",
        url: "lab8.cc/",
        due: "3/24/2023",
      },
      {
        name: "Lab 9",
        title: "Super Circle Drawer (ArrayLists)",
        url: "lab9.superCircleDrawer/",
        due: "3/31/2023",
      },
      // {
      //   name: "Lab 10",
      //   title: "Election (Files and HashMaps)",
      //   url: "lab10.election/",
      //   due: "4/14/2023",
      // },
      {
        name: "Lab 10",
        title: "Boulders (Files)",
        url: "lab10.boulders/",
        due: "4/14/2023",
      },
      {
        name: "Lab 11",
        title: "Playing Cards (Constants, Enum)",
        url: "lab11.cards/",
        due: "4/21/2023",
      },
      // // {
      // //   name: "Lab 11",
      // //   title: "Elementary Complexity Analysis",
      // //   url: "lab11.perf/",
      // //   due: "4/11/2023",
      // // },
    ],
  },
  lectures: [
    // wk 1
    "<strong>MLK Day<br/>(no class)</strong>",
    "Introductions: Who are we? Syllabus",
    "What is CS? Plus, Lab 1",
    "Algorithms, hardware, languages",
    // wk 2
    "Reading Java code: comments, fields, data types",
    "Constructors; input parameters, assignment statements",
    "Lab 2: Triangle",
    "Variable: instance, local, input; lifetime and scope",
    // wk 3
    "Methods and returning; Finish Circle, start TicketMachine",
    "Printing, String concatenation; conditionals",
    "Code Pad; Classes as Types; Lab 3",
    "Lab 3 review; Defensive Programming",
    // wk 4
    "Nested if-statements; else-if statements",
    "Logical operators",
    "Lab 4: Secret Number",
    "Lab 4 review; Data Types",
    // wk 5
    "Primitives and numeric type-casting (narrowing, widening)",
    "Classes as types: references, null",
    "Lab 5: Circle Drawer",
    "Lab 5 review; Object comparison",
    // "Abstraction: Working with APIs; Unpacking Strings",
    // wk 6
    "Abstraction and modularity: Organism",
    "<strong><emph>Review</emph></strong>",
    "<strong><emph>Exam 1</emph></strong>",
    "Using APIs: Strings",
    // wk 7
    "Start loops; reading; tracing",
    "More loops",
    "Lab 6: Diamonds",
    "More loops: Prime number testing, etc.",
    // wk 8
    "Nested loops",
    "Nested loops (cont.)",
    "Lab 7: Turtle",
    "Start Arrays; Write the Bank class",
    // wk 9: spring break
    "<strong><emph>Spring break</emph></strong>",
    "<strong><emph>Spring break</emph></strong>",
    "<strong><emph>Spring break</emph></strong>",
    "<strong><emph>Spring break</emph></strong>",
    // wk 10
    "Array exercises",
    "Array exercises; for-each",
    "Lab 8: CC Validator (arrays)",
    "Arrays of objects: TurtleMob",
    // wk 11
    "Start ArrayList",
    "More ArrayList",
    "Lab 9: Super CircleDrawer (ArrayList)",
    "Wrapper classes; Accepting user input (Scanner)",
    // wk 12
    "Finish ChatBot; Start HashMap",
    "<strong><emph>Review</emph></strong>",
    "<strong><emph>Exam 2</emph></strong>",
    "Smarter chatbot; string parsing",
    // wk 13
    "Files",
    "Files (cont.)",
    "Lab 10: Files",
    "Review lab",
    // wk 14
    "Information hiding; constants",
    "Static scope and enums",
    "Lab 11: enum",
    "Start complexity: Linear search",
    // wk 15
    "<strong><emph>Cancelled</emph></strong>",
    "Binary search",
    "Lab 12",
    "Sorting",
    // wk 16
    "Selection sort",
    "Bubble Sort",
    "<strong>Reading Period</strong>",
    "<strong>Reading Period</strong>",
    // wk final
    "<strong><emph>Final Exam (8a - 10a)</strong></emph>",
    "",
    "",
    "",
  ],
};

// print out the schedule to HTML
const schedule = new CourseCalendar("1/16/2023", days, MWRF);
schedule.generateHTMLResources();
schedule.generateHTMLAssigments();
schedule.generateHTMLCalendar();
