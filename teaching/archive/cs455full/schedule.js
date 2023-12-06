let days = {
  assignments: {
    homework: [
      {
        name: "Hwk 1",
        title: "The Relational Model",
        url: "hwk1.rel/",
        due: "9/10/2021",
      },
      {
        name: "Hwk 2",
        title: "Relational Algebra",
        url: "hwk2.ra/",
        due: "9/24/2021",
      },
      {
        name: "Hwk 3",
        title: "Data Preparation",
        url: "hwk3.ddl/",
        due: "10/8/2021",
      },
      {
        name: "Hwk 4",
        title: "Writing SQL Queries",
        url: "hwk4.dml/",
        due: "10/22/2021",
      },
      {
        name: "Hwk 5",
        title: "Normalization",
        url: "hwk5.norm/",
        due: "11/5/2021",
      },
      {
        name: "Hwk 6",
        title: "Joins!",
        url: "hwk6.joins/",
        due: "11/23/2021",
      },
    ],

    ////////////////////////////// PROJECTS ///////////////////////////////
    projects: [
      {
        name: "Proj 1",
        title: "To the Cloud",
        url: "proj1.cloud/",
        due: "9/20/2021",
      },
      {
        name: "Proj 2",
        title: "Server-Side Web Development with PHP",
        url: "proj2.php/",
        due: "10/22/2021", //extended this year only (move back to 10/18 in future)
      },
      {
        name: "Proj 3",
        title: "Project Planning",
        url: "proj3.planning/",
        due: "11/1/2021",
      },
      {
        name: "Proj 4",
        title: "Implementation",
        url: "proj4.impl/",
        due: "12/10/2021",
      },
    ],

    ////////////////////////////////// LABS ////////////////////////////////
    labs: [
      {
        name: "Lab",
        title: "2-Day SQL Bootcamp",
        url: "lab.sql/",
        // due: "10/5/2021",
      },
    ],
  },

  lectures: [
    // wk 1
    "Why DBMS? Data independence",
    "Relational model; set theory",
    "Keys and schema",
    // wk 2
    "<strong>Labor Day<br/>(no class)</strong>",
    "Relational algebra",
    "RA: expression trees; composition",
    // wk 3
    "RA: natural join, theta join",
    "RA: outer joins, rename, NULL",
    "RA: aggregation and grouping <b>(Zoom recording)</b>",
    // wk 4
    "SQL: schema definition; integrity constraints",
    "SQL: selection, joins, set ops",
    "SQL: outer joins, rename, WITH",
    // wk 5
    "SQL: subqueries: IN, EXISTS; start aggregation",
    "SQL: grouping and aggregation, triggers, transactions",
    "SQL Lab Day 1",
    // wk 6
    "SQL Lab Day 2",
    "<strong><emph>Review</emph></strong>",
    "<strong><emph>Exam 1 (in person)</emph></strong>",
    // wk 7
    "DB theory: functional dependencies (FD)",
    "Armstrong’s axioms, inference rules",
    "Class canceled",
    // wk 8
    "<strong>Fall Break</strong>",
    "Normal forms: 1NF, 2NF",
    "Shortfalls of 2NF; BCNF",
    // wk 9
    "Canonical cover of FD Sets",
    "Disks and files; access patterns",
    "Data access time",
    // wk 10
    "Disk scheduling; Buffer management",
    "Database files",
    "File organization of tuples",
    // wk 11
    "Cost analysis: join algorithms",
    "<strong><emph>Review</emph></strong>",
    "<strong><emph>Exam 2</emph></strong>",
    // wk 12
    // "B+Trees: properties, operations",
    "Start Indexing",
    "B+Trees",
    "B+Trees: complexity analysis",
    // wk 13
    "Project Work Day",
    "<strong>Thanksgiving</strong>",
    "<strong>Thanksgiving</strong>",
    // wk 14
    // "Extendible hashing",
    // "Bitmap indexing",
    "Project Work Day",
    "Project Work Day",
    "Project Work Day",
    // "Start transactions: ACID, serializability",
    // "Transactions: serializability test, precedence graphs",
    // "Transactions: Concurrency control",
    // wk 15
    "Project Demos",
    "Project Demos",
    "<strong>Reading Period</strong>",
    // wk final
    "",
    "<strong><emph>Final Exam<br/>4:00-6:00</emph></strong>",
    "",
  ],
};

// print out the schedule to HTML
const schedule = new CourseCalendar("8/30/21", days, MWF);
schedule.generateHTMLAssigments();
schedule.generateHTMLCalendar();
