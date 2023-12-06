let days = {
  resources: [
    {
      name: "Course Syllabus",
      url: "syllabus"
    },
    {
      name: "Lecture Notes",
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
      {
        name: "Hwk 4 (coding)",
        title: "Writing SQL Queries",
        url: "hwk4.dml/",
        due: "10/20/2023",
      },
      {
        name: "Hwk 5 (coding)",
        title: "Joins",
        url: "hwk5.joins/",
        due: "11/6/2023",
      },
      {
        name: "Hwk 6 (coding)",
        title: "Extendible Hashing",
        url: "hwk6.exhash/",
        due: "11/27/2023",
      },
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
    projects: [
      {
        name: "Project Teams",
        title: "Team Preferences",
        url: "proj/",
        due: "10/20/2023",
      },
      {
        name: "Project Prop",
        title: "Project Proposal",
        url: "proj/",
        due: "11/3/2023",
      },
      {
        name: "Project Demo",
        title: "Project Demo",
        url: "proj/",
        due: "12/13/2023",
      },
      {
        name: "Project-Code",
        title: "Project Code",
        url: "proj/",
        due: "12/15/2023",
      },
    ],

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
    "Disk and Files: access patterns",
    "Tuple format, file format",
    // wk 9
    "File organization and costs",
    "Join processing on files",
    "Start Indexing: B+Tree",
    // wk 10
    "B+Tree cont.",
    "B+Tree performance",
    "Dynamic hashing",
    // "Consistent hashing",
    // "Bitmap indexing",
    // "Disks and files; access patterns",
    // wk 11
    "Bitmap indexing",
    "<strong><emph>Review</emph></strong>",
    "<strong><emph>Exam 2</emph></strong>",
     // "Files: Structure of tuples",
     // "Files: Organization of tuples",
     // "Files: Cost analysis; Join algorithms",
    // wk 12
    "Design Theory: functional dependencies",
    "Theory: functional dependencies, Attribute set closure",
    "Theory: Review of attribute-set closure; superkeys algorithm",
    // wk 13
    "Theory: FD-set closure; Armstrong's Axioms, proof of inference rules",
    "<strong>Thanksgiving</strong>",
    "<strong>Thanksgiving</strong>",
    // wk 14
    "Theory: Normal Forms: 1NF, 2NF, BCNF",
    "Theory: Lossless join; dependency preservation",
    "Theory: Canonical cover; 3NF synthesis",
    // wk 15
    "Cancelled",
    "Cancelled",
    // "Start transactions: ACID, serializability",
    // "Transactions: serializability test, precedence graphs",
    // "Transactions: Concurrency control",
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

