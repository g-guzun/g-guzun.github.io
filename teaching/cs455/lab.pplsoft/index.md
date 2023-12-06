## CS 455 - Principles of Database Systems

### SQL Lab: Writing SQL Queries for the University Database!

You're finally ready to conduct the analysis that the college wants. The data, though synthetic, is an analog to the real data in our university's database. The queries I'm having you run are very similar to (or even the same as) the ones that we actually run when generating our year-end reports!


#### Student Outcomes

- To write SQL queries for the retrieval of data.

#### Required Files
The following file have been provided for this assignment.

- [university.db](university.db)

#### Browse your Database!
Start by downloading the database file, and open it up in [DB Browser](https://sqlitebrowser.org/), or  an online tool like [https://sqliteonline.com/](https://sqliteonline.com/). Open the `university.db` file that is provided to you, and browse its contents to gauge the schema and where all the data is stored.<br/><br/>

<img src="universitySchema.png"/>

#### Writing SQL Queries
For each of the following problems, write an SQL query to return the expected results. Your queries should work in general, regardless of what data is currently stored in this instance of the University database. In other words, don't hard code your queries to work for only the given database instance!

#### Day 1: Basic Queries


1. Return the list of first-year (freshman) students. Sort results by descending order of GPA.

   ```
   studentID   name     rank        gpa
   ---------   ----     ----        ---
   1501        Jessica  Freshman    3.3
   1510        Jordan   Freshman    3.0
   1225        Sarah    Freshman    2.9
   1282        Kelly    Freshman    2.5
   1661        Logan    Freshman    0.5
   ```

2. Return a list of departments that are housed in any building starting with the letter `"T"`. Order by `dept ID`.

   ```
   deptID      deptName                        building
   -------     --------                        --------
   CSCI        School of Computer Science      Thompson Hall
   MATH        Department of Mathematics       Tower of Babel
   ```

3. Get all courses being taught by the `MATH` department that start in the afternoon. You may assume that time is in 24-hour format and that single-digit hours are prefixed with `"0"` (e.g., `"07:00"` not `"7:00"`). Order the results by course number.

   ```
   CourseNum   deptID      CourseName  Location    meetDay     meetTime
   ----------  ----------  ----------  ----------  ----------  ----------
   120         MATH        Algebra     MH 10       MW          12:00
   230         MATH        Linear Alg  HH 308      TR          15:00
   460         MATH        Calculus 3  WEY 102     TR          12:30
   ```

4. Return David's, course schedule. Assume you don't have David's student ID, and that they're the only one with that name (not likely in practice, but roll with it). Only `Course`'s attributes should be projected. Order by `DeptID` then by `Course Number`.

   ```
   deptID      CourseNum   CourseName        Location    meetDay     meetTime
   ----------  ----------  ----------------  ----------  ----------  ----------
   CSCI        351         Database Systems  TH 19       MW          12:00
   CSCI        453         Capstone in Comp  TH 398      MWF         16:00
   MATH        230         Linear Algebra    HH 308      TR          15:00
   ```

5. Return a list of courses taught in Wyatt Hall.

   ```
   101	SOAN	Sociology 1	WY 105	MWF	08:00	Department of Anthropology	Wyatt Hall
   102	SOAN	Sociology 2	WY 205	MTWRF	09:00	Department of Anthropology	Wyatt Hall
   101	ENGL	How to Read	WY 100	MWF	13:00	Department of English	Wyatt Hall
   102	ENGL	How to Write	WY 100	MWF	14:00	Department of English	Wyatt Hall
   520	ENGL	Shakespeare Was Da Bomb	HH 20	TR	13:00	Department of English	Wyatt Hall
   ```

6. Haley's advisor wants to know what courses she's taking in her major. Assume you don't know what her major is when writing this query.
 
   ```
   deptID   courseNum
   ------   ---------
   MATH	   120
   MATH	   230
   ```

7. Return a list of all students who are still undeclared (i.e., are without a major). Project their student ID and their name. Sort results by `studentID`.

   ```
   studentID   studentName
   ----------  -----------
   1001        Lia
   1225        Sarah
   1282        Kelly
   1629        Brad
   1640        Adam
   ```

#### Day 2: Aggregation and Grouping

8. Find the average GPA for each of the class ranks (freshman, sophomore, junior, senior). Rename the `avg(GPA)` field to `ClassGPA`.

   ```
   class       ClassGPA
   ----------  ----------
   Freshman    2.44
   Junior      3.125
   Senior      3.1
   Sophomore   2.675
   ```

9. Identify all students who have a lower GPA than the average of his/her respective class rank. Sort the results by class rank and the student's name.

   ```
   studentID   studentName  class       gpa         ClassGPA
   ----------  -----------  ----------  ----------  ----------
   1661        Logan        Freshman    0.5         2.44
   1709        Cassandra    Junior      2.8         3.125
   1934        Kyle         Junior      2.1         3.125
   1629        Brad         Senior      1.6         3.1
   1641        Brittany     Senior      2.7         3.1
   1689        Gabriel      Senior      2.4         3.1
   1304        Jordan       Senior      2.9         3.1
   1316        Austin       Sophomore   2.1         2.675
   1468        Kris         Sophomore   1.0         2.675
   ```

10. List all departments and their respective student enrollments. Sort the results in descending order of enrollment. Be careful! Make sure departments with no enrollments are also represented (with zeroes) in your results! Did you know that counting a NULL value gives you a 0? Wild!

      ```
      deptName                    enrolled
      --------------------------  ----------
      School of Computer Science  16
      Department of English       8
      School of Business          7
      Department of Mathematics   6
      Department of Physics       3
      Department of Anthropology  1
      Department of History       0
      ```


11. Find the students who are enrolled in the most number of courses. Report the names, IDs, and the number of courses they are enrolled in.

      ```
      studentID   studentName  NumCourses
      ----------  -----------  ----------
      1025        John         5
      1247        Alexis       5
      ```


12. Identify all valedictorians in all majors. (This is a real query that we run at the end of each year for the award ceremony!) For each major, find the student(s) with the highest GPA. Sort results by major. (Notice that `ENGL`major  has two students with the same GPA and they're both listed!)

      ```
      (Notice that ENGL has two students with the same GPA)

      studentID   studentName  class       major       gpa
      ----------  -----------  ----------  ----------  ----------
      1101        Haley        Senior      BUS         4.0
      1381        Tiffany      Junior      CSCI        4.0
      1247        Alexis       Senior      ENGL        3.9
      1487        Erin         Sophomore   ENGL        3.9
      1101        Haley        Senior      MATH        4.0
      1510        Jordan       Freshman    PHYS        3.0
      1709        Cassandra    Junior      SOAN        2.8
      ```

13. The runners-up in each major also receive awards! For each major, now find the student(s) with the second highest GPAs. Sort results by `major`. (You may not delete tuples from the database). Hint: How might the previous query help answer this one?

      ```
      studentID   studentName  class       major       gpa
      ----------  -----------  ----------  ----------  ----------
      1782        Andrew       Sophomore   BUS         3.7
      1501        Jessica      Freshman    CSCI        3.3
      1025        John         Senior      ENGL        3.6
      1510        Jordan       Freshman    MATH        3.0
      ```

14. You found a vulnerability to the Students table, and because you haven't taken an Ethics course, you decide to give every CSCI major a 1.0 bump in their GPA. To avoid detection, no GPA can exceed 4.0, so round anything higher than a 4.0 to 4.0. This should just take two UPDATE statements. 

      ```
      (BEFORE)
      > select * from student natural join major where major='CSCI';
      studentID   studentName  class       gpa         major
      ----------  -----------  ----------  ----------  ----------
      1381        Tiffany      Junior      4.0         CSCI
      1709        Cassandra    Junior      2.8         CSCI
      1316        Austin       Sophomore   2.1         CSCI
      1911        David        Senior      3.2         CSCI
      1501        Jessica      Freshman    3.3         CSCI
      1661        Logan        Freshman    0.5         CSCI

      (AFTER)
      > select * from student natural join major where major='CSCI';
      studentID   studentName  class       gpa         major
      ----------  -----------  ----------  ----------  ----------
      1381        Tiffany      Junior      4.0         CSCI
      1709        Cassandra    Junior      3.8         CSCI
      1316        Austin       Sophomore   3.1         CSCI
      1911        David        Senior      4.0         CSCI
      1501        Jessica      Freshman    4.0         CSCI
      1661        Logan        Freshman    1.5         CSCI
      ```

15. After learning about the GPA mishap, the college now wants to add a new department, `Philosophy (PHIL)`, which will housed in a newly constructed building called `Plato's Cave`. They will offer a course on `PHIL 101: Ethics` taught in room `CAVE`, and all CSCI majors SQL statements.

      ```
      (Showing the contents of the Dept, course, and enroll tables.)

      > select * from dept order by deptID;
      deptID      deptName            building
      ----------  ------------------  -------------
      BUS         School of Business  McIntyre Hall
      CSCI        School of Computer  Thompson Hall
      ENGL        Department of Engl  Wyatt Hall
      HIST        Department of Hist  Wyatt Hall
      MATH        Department of Math  Tower of Babe
      PHIL        Philosophy          Plato's Cave
      PHYS        Department of Phys  Harned Hall
      SOAN        Department of Anth  Wyatt Hall


      > select * from course order by deptID,CourseNum;
      CourseNum   deptID      CourseName  Location    meetDay     meetTime
      ----------  ----------  ----------  ----------  ----------  ----------
      122         BUS         Economics   WY 30       MW          13:30
      351         BUS         Finance     WY 29       TR          12:00
      122         CSCI        How to Cod  TH 19       TR          12:00
      351         CSCI        Database S  TH 19       MW          12:00
      453         CSCI        Capstone i  TH 398      MWF         16:00
      460         CSCI        Operating   TH 8        MW          14:00
      520         CSCI        High Perfo  WY 307      TR          15:00
      101         ENGL        How to Rea  WY 100      MWF         13:00
      102         ENGL        How to Wri  WY 100      MWF         14:00
      520         ENGL        Shakespear  HH 20       TR          13:00
      120         MATH        Algebra     MH 10       MW          12:00
      230         MATH        Linear Alg  HH 308      TR          15:00
      320         MATH        Discrete M  TH 307      F           11:00
      330         MATH        Trigonomet  WEY 113     TR          08:30
      460         MATH        Calculus 3  WEY 102     TR          12:30
      101         PHIL        Ethics      CAVE        TR          16:00
      101         PHYS        How Things  HH 191      MWF         10:00
      401         PHYS        Quantum Me  HH 372      TR          09:00
      101         SOAN        Sociology   WY 105      MWF         08:00
      102         SOAN        Sociology   WY 205      MTWRF       09:00


      > select * from enroll order by deptID,courseNum;
      CourseNum   deptID      StudentID
      ----------  ----------  ----------
      122         BUS         1510
      122         BUS         1316
      122         BUS         1282
      351         BUS         1510
      351         BUS         1661
      351         BUS         1025
      351         BUS         1304
      351         CSCI        1282
      351         CSCI        1510
      351         CSCI        1661
      351         CSCI        1247
      351         CSCI        1501
      351         CSCI        1911
      351         CSCI        1025
      351         CSCI        1934
      453         CSCI        1247
      453         CSCI        1911
      453         CSCI        1934
      460         CSCI        1316
      460         CSCI        1689
      460         CSCI        1661
      520         CSCI        1247
      520         CSCI        1025
      101         ENGL        1247
      101         ENGL        1225
      102         ENGL        1304
      520         ENGL        1689
      520         ENGL        1782
      520         ENGL        1304
      520         ENGL        1025
      520         ENGL        1934
      120         MATH        1101
      230         MATH        1101
      230         MATH        1911
      230         MATH        1782
      320         MATH        1247
      460         MATH        1661
      101         PHIL        1381
      101         PHIL        1709
      101         PHIL        1316
      101         PHIL        1911
      101         PHIL        1501
      101         PHIL        1661
      101         PHYS        1304
      101         PHYS        1025
      401         PHYS        1101
      102         SOAN        1709
      ```
#### Credits

Written by David Chiu.