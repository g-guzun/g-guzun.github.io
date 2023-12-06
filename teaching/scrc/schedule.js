let days = {
  resources: [
    // {
    //   name: "Course Syllabus",
    //   url: "syllabus"
    // },
    // {
    //   name: "Notes and Sample Code",
    //   url: "https://canvas.pugetsound.edu"
    // },
  ],
  assignments: {
    homework: [
      // {
      //   name: "Hwk 1 (written)",
      //   title: "The Relational Model",
      //   url: "hwk1.rel/",
      //   due: "9/11/2023",
      // },
      // {
      //   name: "Hwk 2 (written)",
      //   title: "Relational Algebra",
      //   url: "hwk2.ra/",
      //   due: "9/22/2023",
      // },
      // {
      //   name: "Hwk 3 (coding)",
      //   title: "Data Preparation",
      //   url: "hwk3.ddl/",
      //   due: "10/2/2023",
      // },
    
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
    // labs: [
    //   {
    //     name: "Lab",
    //     title: "SQL Lab!",
    //     url: "lab.pplsoft/",
    //   },
    // ],
  },

  lectures: [
    // wk 1
    "<span color='#0e84b5'>Classes begin</span>",
    "Group gathering",
    "",
    "",
    "",
    // wk 2
    "<span color='#0e84b5'>Labor Day<br/>(no class)</span>",
    "Group gathering",
    "",
    "",
    "",
    // wk 3
    "<span color='#0e84b5'>Last day to drop classes without record</span>",
    "Group gathering",
    "",
    "",
    "",
    // wk 4
    "",
    "Group gathering",
    "",
    "",
    "",
    // wk 5
    "",
    "Group gathering",
    "",
    "",
    "",
    // wk 6
    "",
    "Group gathering",
    "",
    "",
    "",
    // wk 7
    "",
    "Group gathering",
    "",
    "",
    "",
    // wk 8
    "<span color='#0e84b5'>Fall break</span>",
    "<span color='#0e84b5'>Fall break</span><br/>(No group gathering)",
    "",
    "",
    "",
    // wk 9
    "",
    "Group gathering",
    "",
    "",
    "",
    // wk 10
    "",
    "Group gathering: Advising signup",
    "",
    "",
    "",
    // wk 11
    "<span color='#0e84b5'>Spring course registration</span>",
    "<span color='#0e84b5'>Spring course registration</span>,<br/>Group gathering",
    "<span color='#0e84b5'>Spring course registration</span>",
    "<span color='#0e84b5'>Spring course registration</span>",
    "<span color='#0e84b5'>Spring course registration</span>",
    // wk 12
    "",
    "Group gathering",
    "",
    "",
    "<span color='#0e84b5'>Last day to withdraw with 'W'</span>",
    // wk 13
    "<span color='#0e84b5'>Open registration begins</span>",
    "Group gathering",
    "<span color='#0e84b5'>Thanksgiving break</span>",
    "<span color='#0e84b5'>Thanksgiving break</span>",
    "<span color='#0e84b5'>Thanksgiving break</span>",
    // wk 14
    "",
    "Group gathering",
    "",
    "",
    "",
    // wk 15
    "",
    "Group gathering",
    "<span color='#0e84b5'>Last day of classes</span>",
    "<span color='#0e84b5'>Reading period</span>",
    "<span color='#0e84b5'>Reading period</span>",
    // wk final
    "Finals Week",
    "Finals Week",
    "Finals Week",
    "Finals Week",
    "Finals Week",
  ],
};

// print out the schedule to HTML
const schedule = new CourseCalendar("8/28/23", days, MTWRF);
schedule.generateHTMLResources();
schedule.generateHTMLAssigments();
schedule.generateHTMLCalendar();
