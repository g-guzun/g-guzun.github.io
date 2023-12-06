## CS 455 - Principles of Database Systems

### Hwk: Data Cleansing

A local college uses a popular software to manage its data. The software has been collecting years' worth of data on their students and course enrollment in a single spreadsheet, and over time, the size of this file has gotten out of hand. College administrators can no longer "eyeball" the spreadsheet to do simple analysis, and require the help of someone with database expertise...

Get started by downloading [SQLite](https://www.sqlite.org/download.html). If you're using Windows, choose the "bundled" version. If you prefer to not use the sqlite command-line, there are several free SQLite GUIs you can find on Google. I am a fan of [DB Browser for SQLite](https://sqlitebrowser.org/). It's actively maintained and free.

#### Student Outcomes

- To use SQL for the creation of a relational schema, including definition of keys and constraints.
- To practice data cleansing, a process in which you convert inconsistent (or other bad) data into correct, structured data.

#### Required Files

The following file(s) have been provided for this assignment.

- [enrollment.raw.txt](enrollment.raw.txt)

#### Raw Enrollment Data

To best serve you, the university provided a dump of its enrollment data into a comma-delimited file. (Aside: This is how data usually is presented to you in the real world.). They give you a snippet of this file, shown below, which represents just 0.01% of the actual size of data to see if you can build a database around it for querying and more manageable analysis. They say that the remaining 99.99% of the data set follow the same format. **You are not allowed to make changes to this file.**

```
studentID,studentName,class,gpa,major,CourseNum,deptID,CourseName,Location,meetDay,meetTime,deptName,building
-----------------------------------------------------------------------------------------------------------------
1001,Lia,Junior,3.6,ENG,,,,,,,,
1282,Kelly,Freshman,2.5,,122,BUS,Economics,WY 30,MW,13:30,School of Business,McIntyre Hall
1025,John,Senior,3.6,ENGL,101,PHYS,How Things Move,HH 191,MWF,10:00,Department of Physics,Harned Hall
,,,,,,HIST,,,,,Department of History,Wyatt Hall
1247,Alexis,SR,3.9,ENG,320,MATH,Discrete Mathematics,TH 307,F,11:00,Department of Mathematics,Tower of Babel
1101,Haley,SR,4.0,BUS;MATH,120,MATH,Algebra,MH 10,MW,12:00,Department of Mathematics,Tower of Babel
1247,Alexis,Senior,3.9,ENG,351,CSCI,Database Systems,TH 19,MW,12:00,School of Computer Science,Thompson Hall
1304,Jordan,SR,2.9,MATH,101,PHYS,How Things Move,HH 191,MWF,10:00,Department of Physics,Harned Hall
1101,Haley,Senior,4.0,BUS;MATH,230,MATH,Linear Algebra,HH 308,TR,15:00,Department of Mathematics,Tower of Babel
1709,Cassandra,Junior,2.8,CSCI;SOAN,102,SOAN,Sociology 2,WY 205,MTWRF,09:00,Department of Anthropology,Wyatt Hall
1101,Haley,Senior,4.0,BUS;MATH,401,PHYS,Quantum Mechanics,HH 372,TR,09:00,Department of Physics,Harned Hall
1225,Sarah,Freshman,2.9,,101,ENGL,How to Read,WY 100,MWF,13:00,Department of English,Wyatt Hall
1247,Alexis,Senior,3.9,ENGL,453,CSCI,Capstone in Computer Science,TH 398,MWF,16:00,School of Computer Science,Thompson Hall
1911,David,Senior,3.2,CSCI;ENGL,453,CSCI,Capstone in Computer Science,TH 398,MWF,16:00,School of Computer Science,Thompson Hall
1025,John,Senior,3.6,ENGL,520,ENGL,Shakespeare Was Da Bomb,HH 20,TR,13:00,Department of English,Wyatt Hall
1282,Kelly,Freshman,2.5,,351,CSCI,Database Systems,TH 19,MW,12:00,School of Computer Science,Thompson Hall
1247,Alexis,SR,3.9,ENGL,520,CSCI,High Performance Computing,WY 307,TR,15:00,School of Computer Science,Thompson Hall
,,,,,330,MATH,Trigonometry,WEY 113,TR,08:30,,
1510,Jordan,Freshman,3.0,MATH;PHYS,351,CSCI,Database Systems,TH 19,MW,12:00,School of Computer Science,Thompson Hall
1247,Alexis,SR,3.9,ENGL,101,ENGL,How to Read,WY 100,MWF,13:00,Department of English,Wyatt Hall
1025,John,Senior,3.6,ENGL,351,BUS,Finance,WY 29,TR,12:00,School of Business,McIntyre Hall
,,,,,122,CSCI,How to Code Good,TH 19,TR,12:00,,
1661,Logan,Freshman,0.5,CSCI,351,CSCI,Database Systems,TH 19,MW,12:00,School of Computer Science,Thompson Hall
1304,Jordan,Senior,2.9,MATH,102,ENGL,How to Write,WY 100,MWF,14:00,Department of English,Wyatt Hall
1316,Austin,Sophomore,2.1,CSCI,122,BUS,Economics,WY 30,MW,13:30,School of Business,McIntyre Hall
1025,John,SR,3.6,ENGL,351,CSCI,Database Systems,TH 19,MW,12:00,School of Computer Science,Thompson Hall
1316,Austin,Sophomore,2.1,CSCI,460,CSCI,Operating Systems,TH 8,MW,14:00,School of Computer Science,Thompson Hall
1381,Tiffany,JR,4.0,CSCI,,,,,,,,
1468,Kris,Sophomore,1.0,ENGL,,,,,,,,
1487,Erin,Sophomore,3.9,ENGL,,,,,,,,
1501,Jessica,Freshman,3.3,CSCI,351,CSCI,Database Systems,TH 19,MW,12:00,School of Computer Science,Thompson Hall
1510,Jordan,Freshman,3.0,MATH;PHYS,122,BUS,Economics,WY 30,MW,13:30,School of Business,McIntyre Hall
1934,Kyle,JR,2.1,BUS;ENGL,453,CSCI,Capstone in Computer Science,TH 398,MWF,16:00,School of Computer Science,Thompson Hall
1782,Andrew,Sophomore,3.7,BUS,230,MATH,Linear Algebra,HH 308,TR,15:00,Department of Mathematics,Tower of Babel
1510,Jordan,Freshman,3.0,MATH;PHYS,351,BUS,Finance,WY 29,TR,12:00,School of Business,McIntyre Hall
1629,Brad,Senior,1.6,,,,,,,,,
1640,Adam,Senior,3.6,,,,,,,,,
1304,Jordan,Senior,2.9,MATH,351,BUS,Finance,WY 29,TR,12:00,School of Business,McIntyre Hall
1304,Jordan,SR,2.9,MATH,520,ENGL,Shakespeare Was Da Bomb,HH 20,TR,13:00,Department of English,Wyatt Hall
1641,Brittany,SR,2.7,ENG,,,,,,,,
1661,Logan,Freshman,0.5,CSCI,351,BUS,Finance,WY 29,TR,12:00,School of Business,McIntyre Hall
1025,John,Senior,3.6,ENG,520,CSCI,High Performance Computing,WY 307,TR,15:00,School of Computer Science,Thompson Hall
1689,Gabriel,SR,2.4,BUS,520,ENGL,Shakespeare Was Da Bomb,HH 20,TR,13:00,Department of English,Wyatt Hall
1661,Logan,Freshman,0.5,CSCI,460,CSCI,Operating Systems,TH 8,MW,14:00,School of Computer Science,Thompson Hall
,,,,,101,SOAN,Sociology 1,WY 105,MWF,08:00,,
1782,Andrew,Sophomore,3.7,BUS,520,ENGL,Shakespeare Was Da Bomb,HH 20,TR,13:00,Department of English,Wyatt Hall
1911,David,Senior,3.2,CSCI;ENGL,230,MATH,Linear Algebra,HH 308,TR,15:00,Department of Mathematics,Tower of Babel
1689,Gabriel,Senior,2.4,BUS,460,CSCI,Operating Systems,TH 8,MW,14:00,School of Computer Science,Thompson Hall
1661,Logan,Freshman,0.5,CSCI,460,MATH,Calculus 3,WEY 102,TR,12:30,Department of Mathematics,Tower of Babel
1911,David,SR,3.2,CSCI;ENGL,351,CSCI,Database Systems,TH 19,MW,12:00,School of Computer Science,Thompson Hall
1934,Kyle,Junior,2.1,BUS;ENGL,351,CSCI,Database Systems,TH 19,MW,12:00,School of Computer Science,Thompson Hall
1934,Kyle,Junior,2.1,BUS;ENGL,520,ENGL,Shakespeare Was Da Bomb,HH 20,TR,13:00,Department of English,Wyatt Hall
```

Each line in this file represents a student enrollment. For instance, take a look at Kyle's (1934) info at the tail end of this file. Kyle is a BUS and ENGL double-major who is enrolled in CSCI 351, ENGL 520, and CSCI 453 (the latter enrollment a bit harder to find). At the end of each row, the last two tokens (department name and building) refer to the department in which the course is offered (and not the student's major). Take note of all the problems this file suffers from:

1. **Redundancies**: It is easy to see that a student's information is duplicated for each course they are enrolled in.
2. **Multi-valued attributes:** One of the attributes can have multiple values. A student can have 0-2 majors, and each of them is separated by a colon.
3. **Incomplete data:** When a student is not enrolled in any course, the course-enrollment fields are delimited with commas, but there's no data. Look at Lia's (first row) information. She does not have a major and is not enrolled in any courses. Now take a look at the courses without the student info, like MATH 330 (Trigonometry). These are courses that exist on the books that no one is enrolled in. There are also departments without student or course info. This is the case for the History Department (4th row). This happens when an existing department has not yet added any courses to the schedule.
4. **Inconsistencies:** The redundancies led to bad or stale data over time. School administrators alert you that sometimes "ENGL" is mislabeled as simply "ENG" (that's the only one people screw up) and that some people tend to abbreviate "Junior" as "JR" and "Senior" as "SR" under a student's class rank. (The abbreviated versions need to be corrected to the full spelling).

#### Task 1: Schema Definition

Your task is two-part: (1) You must first define a database schema in SQL. I will explain the schema's requirements below. (2) After your schema has been defined, you must write a script that will take the data from its raw format and insert it into your database.

We'll focus first on Task 1. You can assume there will be no other relations needed. Create a plain-text file called **YourLastname_HW3_DDL.sql** that will store the schema definition in SQL. (Disclaimer: Yes this file must be in plain-text. Do not write these in Word (.doc), Wordpad (.rtf), etc., that adds special formatting. Use an editor like Sublime Text or Atom). Submissions in non-plaintext will be returned without a grade.

Give the SQL commands to create the relations described below. Where appropriate, all foreign-key constraints must cascade on update and delete operations, unless otherwise stated below. To make your lives easier, I've gotten a start on it for you. Place the following SQLite3 block in the top of your file:

```sql
-- Turn on foreign keys
PRAGMA foreign_keys = ON;

-- Delete the tables if they already exist
drop table if exists Student;
drop table if exists Course;
drop table if exists Major;
drop table if exists Enroll;
drop table if exists Dept;

-- Create the schema for your tables below
CREATE TABLE ...
```

##### Defining Relations

Here is the schema you need to define in SQL. As you define these relations, keep in mind that the order of each table in your file matters. Like referencing variables in any language, SQLite will throw an error informing you that relations do not yet exist if you refer to them too early in the file! Each table must have a primary key defined, and each attribute must have an appropriate data type (TEXT, REAL, INTEGER).

<ul>
<li>
	<p>Student(studentID, studentName, class, gpa)<br/>
	Students are identified with a unique studentID, a first name, 
	a class standing, and a cumulative GPA, which can be `NULL`. 
	The studentName may not be unique, but it cannot be `NULL`. The 
	class standing <i>must</i> be one of: 
	"Freshman," "Sophomore," "Junior," or "Senior." The database should reject 
	any insertions or updates if a student's class rank is not one of these.
	Similarly, GPAs must be either `NULL` or between 0.0 to 4.0.
	</p>
</li>
<li>
	<p>Major(studentID, major)<br/>
	A student's major(s) is/are recognized by an entry in this table (an undeclared student
	therefore would not have an entry). StudentID is self-explanatory, 
	and the major code is the department's ID (see Department table below). That is, if a department
	decided to recode its ID (e.g., `CS` changes its department code to `CSCI`), the changes must be reflected
	automatically in this table. When defining the primary key for this table, you need to 
	consider that a student may have several majors.
	</p>
</li>
<li>
	<p>
	Course(courseNum, deptID, courseName, location, meetDay, meetTime)<br/>
	Courses have a course number, a department it belongs to, a course name, 
	location, day, and time. Some courses can be cross listed. For instance, 
	the course Discrete Math might belong to both CS and Math departments! By 
	itself, neither course number nor deptID are unique in this relation, but the
	two taken together is. No courses can be taught before '07:00' or after '17:00'.
	I would use a TEXT field to store meeting days and meeting times (Hint: recall that
	<code>&gt;</code> and <code>&lt;</code> operators can be used with TEXT fields).
	</p>
</li>
<li>
	<p>
	Dept(deptID, name, building)<br/>
	Departments are identified by a label (deptID), which is not numerical. For 
	instance, `CS` would be the deptID for the computer science department. 
	It also requires a full name of the department, and each is housed in a 
	particular building on campus. A department cannot be housed in more than
	one building, nor can they have more than one label.
	Constraint: deptID should not be more than 4 characters in length, and 
	the department names should be unique and cannot be NULL. If a department is 
	removed, then all its course offerings are removed. Anyone enrolled in a
	course offered by the department should have that course removed.
	All students whose majors are from that department should be set to NULL (i.e., the 
	database should not delete any students upon the removal of a department).
	</p>
</li>
<li>
	<p>
	Enroll(courseNum, deptID, studentID)<br/>
	Students can enroll in any number of courses. A course-enrollment is given by 
	course number, the department of the course offering, and the student taking
	the course. For instance, that Kelly is enrolled in Databases 
	would be represented in this table as the tuple `(351, 'CS', 1282)`.
	</p>
</li>
</ul>

##### Task 2: Data Cleansing and Preparation

The next step is to get the raw data into your database.

1. Write a script that inputs the raw data file and prints out a sequence of `INSERT INTO ...` statements that you can later copy-and-paste into SQLite to fully populate the tables in your database. You may use either Java or Python to write this script. It is recommended that you use Python for this type of work, as is mostly the case in industry.

2. Along the way, your script will need to resolve all those anomalies I listed before (inconsistencies, redundancies, etc.). This step is called Data Cleansing in the real world. In some cases, you can rely on the database to resolve some anomalies. For instance, if you set a deptID to be the primary key of Department like you were supposed to, then multiple insertions of the same department would be automatically rejected by SQLite. (You will see the warnings pop up in SQLite when you go to execute.)

3. Here are the first few lines generated by my script when given the raw data. Duplicate insert statements in your output are allowed by me, so don't be alarmed when SQLite3 outputs errors when you try to load your file. Don't worry, because you set your primary keys correctly, duplicate tuples will not be inserted.

   ```sql
   INSERT INTO Student VALUES (1001,'Lia','Junior','3.6');
   INSERT INTO Major VALUES (1001,'ENGL');
   INSERT INTO Student VALUES (1282,'Kelly','Freshman','2.5');
   INSERT INTO Dept VALUES ('BUS','School of Business','McIntyre Hall');
   INSERT INTO Course VALUES (122,'BUS','Economics','WY 30','MW','13:30');
   INSERT INTO Enroll VALUES (122,'BUS',1282);
   INSERT INTO Student VALUES (1025,'John','Senior','3.6');
   INSERT INTO Dept VALUES ('PHYS','Department of Physics','Harned Hall');
   INSERT INTO Major VALUES (1025,'ENGL');
   INSERT INTO Course VALUES (101,'PHYS','How Things Move','HH 191','MWF','10:00');
   INSERT INTO Enroll VALUES (101,'PHYS',1025);
   INSERT INTO Dept VALUES ('HIST','Department of History','Wyatt Hall');
   ```

4. One thing you'll figure out very shortly is that your foreign key constraints will reject insertions where primary keys don't exist. For instance, when you insert into the Major table `(1001,'ENGL')`, but let's say `ENGL` does not yet exist in the Dept table, then SQLite will reject the insertion. This means you need to organize your insertions so that you do them in order in chunks: all Students first, then Depts, then Courses, Major, and Enroll.

5. **Important:** Save your script for submission. I don't need your script's output. I will run your script, and copy-and-paste its output directly into SQLite to grade it.

#### Expected Output

If you did everything correctly, type in the following queries, and your results should match mine exactly:

```sql
sqlite> select * from Dept order by deptID;
```

```
deptID      deptName            building
----------  ------------------  -------------
BUS         School of Business  McIntyre Hall
CSCI        School of Computer  Thompson Hall
ENGL        Department of Engl  Wyatt Hall
HIST        Department of Hist  Wyatt Hall
MATH        Department of Math  Tower of Babe
PHYS        Department of Phys  Harned Hall
SOAN        Department of Anth  Wyatt Hall
```

```sql
sqlite> select * from Student order by studentID;
```

```
studentID   studentName  class       gpa
----------  -----------  ----------  ----------
1001        Lia          Junior      3.6
1025        John         Senior      3.6
1101        Haley        Senior      4.0
1225        Sarah        Freshman    2.9
1247        Alexis       Senior      3.9
1282        Kelly        Freshman    2.5
1304        Jordan       Senior      2.9
1316        Austin       Sophomore   3.1
1381        Tiffany      Junior      4.0
1468        Kris         Sophomore   1.0
1487        Erin         Sophomore   3.9
1501        Jessica      Freshman    4.0
1510        Jordan       Freshman    3.0
1629        Brad         Senior      1.6
1640        Adam         Senior      3.6
1641        Brittany     Senior      2.7
1661        Logan        Freshman    1.5
1689        Gabriel      Senior      2.4
1709        Cassandra    Junior      2.8
1782        Andrew       Sophomore   3.7
1911        David        Senior      4.0
1934        Kyle         Junior      2.1
```

```sql
sqlite> select * from course order by deptID,courseNum;
```

```
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
101         PHYS        How Things  HH 191      MWF         10:00
401         PHYS        Quantum Me  HH 372      TR          09:00
101         SOAN        Sociology   WY 105      MWF         08:00
102         SOAN        Sociology   WY 205      MTWRF       09:00
```

```sql
sqlite> select * from major order by major, StudentID;
```

```
StudentID   major
----------  ----------
1101        BUS
1689        BUS
1782        BUS
1934        BUS
1316        CSCI
1381        CSCI
1501        CSCI
1661        CSCI
1709        CSCI
1911        CSCI
1001        ENGL
1025        ENGL
1247        ENGL
1468        ENGL
1487        ENGL
1641        ENGL
1911        ENGL
1934        ENGL
1101        MATH
1304        MATH
1510        MATH
1510        PHYS
1709        SOAN
```

```sql
sqlite> select * from Enroll order by StudentID,deptID,courseNum;
```

```
CourseNum   deptID      StudentID
----------  ----------  ----------
351         BUS         1025
351         CSCI        1025
520         CSCI        1025
520         ENGL        1025
101         PHYS        1025
120         MATH        1101
230         MATH        1101
401         PHYS        1101
101         ENGL        1225
351         CSCI        1247
453         CSCI        1247
520         CSCI        1247
101         ENGL        1247
320         MATH        1247
122         BUS         1282
351         CSCI        1282
351         BUS         1304
102         ENGL        1304
520         ENGL        1304
101         PHYS        1304
122         BUS         1316
460         CSCI        1316
351         CSCI        1501
122         BUS         1510
351         BUS         1510
351         CSCI        1510
351         BUS         1661
351         CSCI        1661
460         CSCI        1661
460         MATH        1661
460         CSCI        1689
520         ENGL        1689
102         SOAN        1709
520         ENGL        1782
230         MATH        1782
351         CSCI        1911
453         CSCI        1911
230         MATH        1911
351         CSCI        1934
453         CSCI        1934
520         ENGL        1934
```

#### Grading

```
[25pt] Correctness of the schema definition, including data types, primary and foreign
    keys. (5 points per table)

[35pt] Correctness of the insertion script, broken down as follows:

    [25pt] Your script prints a sequence of valid INSERT statements that
        properly populates all tables. Duplicate INSERT statements
        are acceptable.

    [5pt] Your script must resolve incomplete data (nonexistent majors, for instance).

    [5pt] Your script resolves multi-valued majors.

    [5pt] Your script resolves inconsistent class-rank and department labels.

[misc] Files not submitted in plain-text format will be returned without a grade.


Total: 60pts
```

#### Submitting Your Assignment

After you have completed the homework, use the following to submit your work on Canvas.
You must submit two files: (1) The file containing the SQL schema definition. This file must be in plain-text. (2) The script used to generate the insert statements. Zip these files up.

Navigate to our course on Canvas. You should see the Homework 3 Dropbox. Click on this link, and you should be able to drag your file right into the submission box. Click "Save Changes". You may submit as often as you'd like before the deadline. I will grade the most recent copy.

#### Credits

Written by David Chiu.
