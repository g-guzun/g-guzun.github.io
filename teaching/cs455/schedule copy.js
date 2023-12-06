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
        name: "Hwk 1 (written)",
        title: "The Relational Model",
        url: "hwk1.rel/",
        due: "9/11/2023",
      },
      {
        name: "Hwk 2 (written)",
        title: "Relational Algebra",
        url: "hwk2.ra/",
        due: "9/22/2023",
      },
      {
        name: "Hwk 3 (coding)",
        title: "Data Preparation",
        url: "hwk3.ddl/",
        due: "10/6/2023",
      },
    
      // {
      //   name: "Hwk 4 (coding)",
      //   title: "Writing SQL Queries",
      //   url: "hwk4.dml/",
      //   due: "10/13/2023",
      // },
      // {
      //   name: "Hwk 5 (coding)",
      //   title: "Design Theory - Closure of FD Sets",
      //   url: "hwk5.closure/",
      //   due: "10/27/2023",
      // },
      // {
      //   name: "Hwk 6 (coding)",
      //   title: "Design Theory - BCNF Normalization",
      //   url: "hwk6.bcnf/",
      //   due: "11/10/2023",
      // },
      // {
      //   name: "Hwk 7 (coding)",
      //   title: "Joins!",
      //   url: "hwk7.joins/",
      //   due: "11/18/2021",
      // },
      // {
      //   name: "Hwk 7 (coding)",
      //   title: "B+Tree",
      //   url: "hwk7.btree/",
      //   due: "11/24/2021",
      // },
    ],

    ////////////////////////////// PROJECTS ///////////////////////////////
    // projects: [
      // {
      //   name: "Project Teams",
      //   title: "Team Preferences",
      //   url: "proj/",
      //   due: "10/28/2022",
      // },
      // {
      //   name: "Project Prop",
      //   title: "Project Proposal",
      //   url: "proj/",
      //   due: "11/4/2022",
      // },
      // {
      //   name: "Project Demo",
      //   title: "Project Demo",
      //   url: "proj/",
      //   due: "12/5/2022",
      // },
      // {
      //   name: "Project-Code",
      //   title: "Project Code",
      //   url: "proj/",
      //   due: "12/16/2022",
      // },
    // ],

    ////////////////////////////////// LABS ////////////////////////////////
    labs: [
      {
        name: "Lab",
        title: "SQL Lab!",
        url: "lab.pplsoft/",
      },
    ],
  },

  lectures: [
    // wk 1
    "Why DBMS? Data independence",
    "Data independence",
    "Relational Model: Connection to sets",
    // wk 2
    "<strong>Labor Day<br/>(no class)</strong>",
    "Relational Model: keys",
    "Relational Model: designing schema",
    // wk 3
    "Relational Algebra: selection, projection, and query plans",
    "RA: natural join",
    "RA: outer joins, rename, NULL",
    // wk 4
    "RA: aggregation and grouping",
    "SQL: schema definition; integrity constraints",
    "SQL: foreign keys; insert, delete, update operations",
    // wk 5
    "SQL: selection, joins, set ops",
    "SQL: outer joins, renaming, WITH",
    "<strong><emph>Class Cancelled</emph></strong>",
    // wk 6
    "SQL Work Day",
    "SQL: subqueries",
    "SQL: grouping and aggregation",
    // wk 7
    "SQL Work Day",
    "<strong><emph>Review</emph></strong>",
    "<strong><emph>Exam 1</emph></strong>",
    // wk 8
    "<strong>Fall Break</strong>",
    "Design Theory: functional dependencies",
    "Theory: functional dependencies, Attribute set closure",
    // wk 9
    "Theory: Review of attribute-set closure; superkeys algorithm",
    "Theory: FD-set closure; Armstrong's Axioms, proof of inference rules",
    "Theory: Normal Forms: 1NF, 2NF, BCNF",
    // wk 10
    // "Disks and files; access patterns",
    "Theory: Lossless join; dependency preservation",
    "Theory: Canonical cover; 3NF synthesis",
    "Disk and Files: access patterns",
    // wk 11
    "Disk scheduling",
    "<strong><emph>Review</emph></strong>",
    "<strong><emph>Exam 2</emph></strong>",
     // "Files: Structure of tuples",
     // "Files: Organization of tuples",
     // "Files: Cost analysis; Join algorithms",
    // wk 12
    "Start Indexing",
    "B+Tree properties, operations",
    "B+Tree performance",
    // wk 13
    "Dynamic hashing",
    "<strong>Thanksgiving</strong>",
    "<strong>Thanksgiving</strong>",
    // wk 14
    "Indexing: Bitmaps",
    "Bitmaps",
    "Start transactions: ACID, serializability",
    // "Indexing: Consistent hashing",
    // wk 15
    "Transactions: serializability test, precedence graphs",
    "Transactions: Concurrency control",
    "<strong>Reading Period</strong>",
    // wk final
    "",
    "<strong><emph>Final Presentation<br/>4:00-6:00</emph></strong>",
    "",
  ],
};

// print out the schedule to HTML
const schedule = new CourseCalendar("8/28/23", days, MWF);
schedule.generateHTMLResources();
schedule.generateHTMLAssigments();
schedule.generateHTMLCalendar();
