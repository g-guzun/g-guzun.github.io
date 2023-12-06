## CS 161 - Intro to Computer Science

### Lab: Election

This week, we'll write a program that counts ballots cast for an election! In doing this lab you will get a sense of _when_ to use HashMaps (over say, ArrayLists) for solving certain types of problems. You will also be exposed to for-each loops to iterate through index-less structures, like HashMaps (and HasSets).

<img width="25%" src="figures/ivoted.png"/>

#### Student Outcomes

- To use HashMaps for problem solving
- To use for-each loops to iterate through `HashMaps`
- Use of wrapper classes, such as `Integer`

#### Required Files

The following file(s) have been provided for this homework.

- [Lab9_Election.zip](Lab9_Election.zip)

#### Helpful APIs

The API handout that you'll want to have in front of you:

- [HashMap](../api/HashMapAPI.pdf)

#### Part I: Ballot Counter

- Download and extract the project zip file. Open up the BlueJ project. You'll see a `BallotCounter` class with tiny bit of code given to you (mainly just the import statements).

- Fields: You need to store the election results in a `HashMap`. Each entry is keyed on the candidate's name and maps to the number of votes they've received.

- Browse through the constructor and method-skeletons. The default constructor is already provided to you, but read through it to understand what it's doing.

- Write the `inputVotes()` method. It needs to repeated scan for user input. Each line of input should just contain the name of the candidate who received a vote. For each name that we scan in, we need to examine the `HashMap` to see if that candidate already exists. If not, create a new entry in the map, and give their vote count a 1. If the candidate already exists, you just need to increment their vote by 1. This method should continue asking for candidate names until "quit" is entered. (Make sure "quit" is not added as a candidate!)

  After this method is called, your `HashMap` should contain the election result. Double click on the object to ensure that is the case.

- Write the `totalVotes()` method that returns the total number of votes cast.

  To write this method, you will need to use the `HashMap`'s `keySet()` method. To loop through a `Set` object, you must use a for-each loop. Here's a reminder of how to use a for-each loop over a `HashMap`:

  ```java
  // Assuming 'map' is your HashMap<String,Integer>

  // This loop will iterate through all keys the map
  for (String str : map.keySet()) {
  // 'str' is now a key in your hashmap (in no particular order)
  // use map.get(str) to obtain its corresponding value
  }

  // This loop will iterate through all values in the map
  for (int val : map.values()) {
  // val refers one of the values in your map (in no particular order)
  }
  ```

- Write the `margin` method that inputs the names of two candidates. It returns the _difference of votes_ between the two as a percentage. For instance, if one candidate receives 50 votes, and the second candidate receives 60 votes, then the method should return `−0.09`, which is `(50−60)/(50+60)`. If either candidate doesn't exist in the map, or if the sum of their votes is zero, return the `Double.NaN` constant (Not-a-Number).

- Write the `winners()` method. It scans your `HashMap` and determines the winner(s). Yes, plural, due to possible ties for first. Stick the winner(s)' names into an `ArrayList` and return it. (Hint: I would first loop through all the values of the HashMap to obtain the highest vote count. Then I would write another loop to determine all the candidates who shared that vote count).

- Write the `printResults()` It should spit out the contents of your `HashMap` in a uniform way, and display the winner(s). It should report the total votes cast, as well as the percentage of votes captured by each candidate. The output should look something like this::

  ```
  ******************************
        ELECTION RESULTS
        Ballots Cast: 12
  ******************************
  David Chiu: 4 (33%)
  Adam Smith: 2 (16%)
  America Chambers: 4 (33%)
  Brad Richards: 2 (16%)

  The winner is: [David Chiu, America Chambers]
  ```

#### Grading

```

This assignment will be graded out of a total of 10pts.

```

#### Submitting Your Assignment

After you have completed the assignment, use the following to submit your work.
Exit BlueJ

- Open your computer's File Finder (some times called File Explorer). Locate the project folder.

- Right-click on the project folder, then:

  - If using Windows, select Send to then Zip file
  - If using MacOS, select Compress ... items
  - This step takes your selected creates a .zip file that you will submit to me.

  It's really important you got this right. If you have doubts, ask one of us to check for you! I recommend that you double-check by opening the zip file, and investigating the contents to ensure that all the files are in there.

- Navigate to our course page on Canvas and click on the assignment to which you are submitting.

- Click on Submit Assignment, and you should be able to "browse" for your file

- Select the `.zip` you just created, and click Submit Assignment again to upload it.

- You may submit as often as you'd like before the deadline. I will grade the most recent copy.

#### Credits

Written by David Chiu.

#### Lab Attendance Policies

Attendance is required for lab. Unexcused absence = no credit even if you turned in the lab. Unexcused tardiness = half credit.
