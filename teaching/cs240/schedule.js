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
        name: "Hwk 1",
        title: "Github Homepage (extended deadline)",
        url: "hwk1.ghpages/",
        due: "9/22/2021",
      },
      {
        name: "Hwk 2",
        title: "Wordplay",
        url: "hwk2.wordplay/",
        due: "10/4/2021",
      },
      {
        name: "Hwk 3",
        title: "Scoreboard",
        url: "hwk3.scoreboard/",
        due: "10/13/2021",
      },
      {
        name: "Hwk 4",
        title: "Schelling's Model",
        url: "hwk4.schelling/",
        due: "10/27/2021",
      },
      {
        name: "Hwk 5",
        title: "Simone the Memory Game",
        url: "hwk5.simone/",
        due: "11/15/2021",
      },
    ],

    ////////////////////////////// PROJECTS ///////////////////////////////
    projects: [
      {
        name: "Phase 1",
        title: "Planning and Design",
        url: "proj1.planning/",
        due: "11/12/2021",
      },
      {
        name: "Phase 2.1",
        title: "1st Sprint",
        url: "proj2.sprints/",
        due: "11/22/2021",
      },
      {
        name: "Phase 2.2",
        title: "2nd Sprint",
        url: "proj2.sprints/",
        due: "11/29/2021",
      },
      {
        name: "Phase 2.3",
        title: "3rd Sprint",
        url: "proj2.sprints/",
        due: "12/6/2021",
      },
      {
        name: "Phase 2.4",
        title: "4th Sprint",
        url: "proj2.sprints/",
        due: "12/13/2021",
      },

      {
        name: "Presentation",
        title: "Wrapup and Presentation",
        url: "proj3.final/",
        due: "12/14/2021",
      },
    ],

    ////////////////////////////////// LABS ////////////////////////////////
    labs: [
      {
        name: "Lab 1",
        title: "Command Line Bootcamp",
        url: "lab.cmd/",
      },
      {
        name: "Lab 2",
        title: "Git Basics",
        url: "lab.git1/",
      },
      {
        name: "Lab 3",
        title: "Git Branching",
        url: "lab.git2/",
      },
      {
        name: "Lab 4",
        title: "JavaScript Basics",
        url: "lab.js1/",
      },
      {
        name: "Lab 5",
        title: "DOM & Events",
        url: "lab.js2/",
      },
      {
        name: "Lab 6",
        title: "More DOM & Events",
        url: "lab.js3.evt/",
      },
      {
        name: "Lab 7",
        title: "Promises, Await, and Async",
        url: "lab.js4.async/",
      },
      {
        name: "Lab 8",
        title: "Ajax",
        url: "lab.js5.ajax/",
      },
      {
        name: "Lab 9",
        title: "Node.js, npm",
        url: "lab.js6.npm/",
      },
      {
        name: "Lab 10a",
        title: "Vision, Personas",
        url: "lab.personas/",
      },
      {
        name: "Lab 10b",
        title: "Scenarios",
        url: "lab.scenarios/",
      },
      {
        name: "Lab 10c",
        title: "User Stories and Sprint Planning",
        url: "lab.stories/",
      },
      {
        name: "Lab 11",
        title: "Express Lab",
        url: "lab.express/",
      },
      {
        name: "Lab 12",
        title: "Express+EJS Lab",
        url: "lab.express2.ejs/",
      },
      //   {
      //     name: "Lab 12",
      //     title: "Unit Testing",
      //     url: "lab.testing/",
      //   },
    ],
  },

  lectures: [
    // wk 1
    "Introduction",
    "VS Code; Start command line",
    // wk 2
    "File system manipulation; permissions; Command-line Lab",
    "Command line: execution and $PATH; Start Git - staging, committing",
    // wk 3
    "Git: ignoring, undoing; Git lab 1",
    "Github: pulling, pushing; Start branching",
    // wk 4
    "Lab on branching; Start JS",
    "JS Fundamentals (Part I)",
    // wk 5
    "JS Fundamentals (Part II)",
    "DOM navigation and manipulation; DOM Lab",
    // wk 6
    "Event handling; Events Lab",
    "Asynchronous execution and Promises",
    // wk 7
    "async and await; Promise Lab",
    "Ajax, JSON, Axios",
    // wk 8
    "<strong>Fall Break<strong>",
    "Review Ajax; Ajax Lab",
    // wk 9
    "Node.js and npm",
    "Software Process Models; Agile/Scrum",
    // wk 10
    "Vision and Persona Lab",
    "Continued work: Scenarios Lab",
    // wk 11
    "User Stories and Features Lab",
    "Remote development; Express",
    // wk 12
    "Work on first sprint officially starts! Express + EJS",
    "Software Testing; Testing lab",
    // wk 13
    "Work/Sprint Review with David",
    "<strong>Thanksgiving</strong>",
    // wk 14
    "Work/Sprint Review with David",
    "Industry Panel: Alexia Ingerson (Intel); Banji Oyewole (FreeFly); Kayla Ramos (ActZero); Dr. Sayantan Sur (Nvidia)",
    // wk 15
    "Work/Sprint Review with David",
    "<strong>Reading Period</span>",
    // wk final
    "<strong>Presentations<br/>(12p - 2p)<strong>",
    "",
  ],
};

// print out the schedule to HTML
const schedule = new CourseCalendar("8/30/2021", days, TR);
schedule.generateHTMLResources();
schedule.generateHTMLAssigments();
schedule.generateHTMLCalendar();
