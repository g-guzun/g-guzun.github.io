## CS 455 - Principles of Database Systems

### Project 4: Project Implementation

#### Overview

At this point, you have a relational schema, and a plan to build a dynamic website over this database. In this project, you will first normalize your relational schema to satisfy BCNF. Then, you will implement your use-cases using a set of dynamic web pages. You will then demonstrate your final project in class.

#### Student Learning Objectives

Students will:

- Apply normalization techniques on their project database to minimize data anomalies.
- Work in a team setting on the development of their projects.
- Communicate through a project demonstration.
- Reflect on their own contributions and evaluate others.

#### Part 1: Preparing Your Database

Take your relational schema and normalize it so that all relations satisfy BCNF.

- Create a DDL file from your normalized schema, and load it into your database on your web server.

- Write a few scripts that generate and populate each of your tables with either dummy data or real data (depending on your project) for testing, similar to the university-populate file I provided for your SQL homework.

- Make sure you save this database.

#### Part 2: Implementing Features

For each of your use-cases, you must now implement a set of web pages to support it. Your web pages should conform to the following criteria:

- Pretend that the code you write is production-level and that thousands of visitors can be on your website simultaneously. For every SQL query, particularly ones involving joins, you should optimize them in such a way that the fewest amount of intermediate data is required process it.

- Your queries must be able to resist SQL-injection attacks.

- You don't need to spend too much time with styling your web pages. I definitely don't want team members whose only role is HTML and styling, which has happened in the past, and it doesn't end well in terms of their grades. Your pages should have a consistent look and feel, and you can do this by defining a relevant set of CSS style sheets. Try changing the font face, and adding some colors to links, backgrounds, tables, etc., but I wouldn't spend much more time than that.

- **Section III: In-Class Demo and Evaluation** --
  Be prepared by the due date to give a ~15 minute presentation to the class on your project, allowing a few minutes for question and answer. The demo should showcase your use-cases, and every team member must have equal participation in the demo (you will be graded on balance). The demo must be organized, which means you should prepare a "script," with fluid transitions from one use-case to another. It is recommended that you do a couple practice runs to iron out all the wrinkles before the class demo.

**Peer Evaluation:** Members of the class will each submit an anonymous evaluation on your team's project and demo (out of 10 points). You will be assigned the average of their evaluations. As you evaluate others team, try to be objective about the content and quality of their implementation, and not about how enthusiastic you are about project idea.

- [Peer Eval Form](PeerEvaluation.pdf)

**Internal Evaluation (On Final Exam)** Members of your team will each submit an anonymous evaluation of the other team members to me. In this evaluation, you should be honest about the work balance and dynamics of yourself and other members.

- [Internal Eval Form](InternalEvaluation.pdf)

**Instructor's Evaluation:** Finally, you will receive an evaluation from me about my assessment on the quality of your work.

- [Instructor's Eval Form](ProjectEvaluation.pdf)

#### Submission

List the group membership on your proposal page. Go to [Canvas](https://canvas.pugetsound.edu) and submit the URL to your project's front page under the `Project 4` Dropbox.

#### Grading

```
This assignment will be graded out of 100 points:
[10pt] Your database is normalized to BCNF, and populated using dummy or real data.
[45pt] The use-cases you outlined in the project planning phase are implemented properly and resist SQL injection.
[10pt] The in-class demo/presentation is well-prepared, fluid, and organized.
[10pt] Peer evaluation. All other teams will evaluate the quality of your project.
[25pt] Internal/self evaluation. Each of your teammates will evaluate your contributions to the overall project. You will take this on the final exam.

Misc.
[-5pt] Failure to turn in a peer evaluation. (On demo days)
[-5pt] Failure to turn in an internal evaluation. (On date of Final Exam)
```
