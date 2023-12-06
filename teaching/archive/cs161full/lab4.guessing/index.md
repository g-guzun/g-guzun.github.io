## CS 161 - Intro to Computer Science

### Lab: The Guessing Game

In this lab, you will create the "number guessing game" --- the computer will pick a random number between 1 and 50 (inclusive), and then the player will try to guess it in as few guesses as possible.

The player will enter guesses through the BlueJ interface, calling a `guess()` method and providing a parameter. The program will let the player know how close their guess is (if they are "hot" or "cold", and whether their guess was too high or too low). When finished, your program's output might look something like:

Note that I called a `guess()` method multiple times with parameters 25, 15, 30, 40, 38, and 37. If you have BlueJ's Terminal set to "Clear screen at method call", then you will only see one of these at a time. Uncheck that option to be able to see your game history!

```
Welcome to the Guessing Game!
I picked a number between 1 and 50. Try and guess!

You guessed 25.
Your guess is cold.
Try a little higher.

You guessed 15.
Your guess is icy freezing miserable cold.
Try a little higher.

You guessed 30.
Your guess is warm.
Try a little higher

You guessed 40.
Your guess is extremely warm.
Try a little lower.

You guessed 38.
Your guess is scalding hot!
Try a little lower.

You guessed 37.
Congratulations, you figured it out in 7 guesses!
I've seen better.
```

#### Student Outcomes

- To practice with conditionals
- More practice with class writing

#### Helpful APIs

The API handout that you'll want to have in front of you:

- [Random](../api/RandomAPI.pdf)

#### Part 1: The Bare-Bones Version

- Create a new project in BlueJ using the `Project > New Project` menu option. Inside, you will create just one Java class: `GuessingGame`. We'll start by building a naive class, and eventually build on top of it. Remember our systematic way of defining classes? The `GuessingGame` class has the secret number, as well as the number of times the user has tried to guess that number. Go ahead and get started putting those in place.

- Your class should have two constructors:

  - A default constructor that picks a random number between 1 and 50, and remembers it as its secret number.
  - An overloaded constructor that inputs the upper-bound for the secret number. It then picks a random number between 1 and that upper-bound (inclusive). So if the user starts a game with 200 input as the upper-bound, the game would randomly choose a secret number between 1 and 200.

  Both constructors should also greet the player with a message and inform them of the range of numbers from which to guess. See the interaction in the beginning of this lab for a sample greeting. Check-in with us before moving on to ensure correctness.

- You will need to write a `guess(..)` method that is called every time the user wants to guess a number. This method should take a number as its parameter, and it does not return a value. The method then compares the parameter with the secret number and whether the guess is too low or too high.

  When the user calls `guess(..)`, several things need to happen:

  - If the user's guess is correct, you should print out a message congratulating the user, and let them know how many guesses it took them. (Again, see above output).

  - If the user's guess is wrong, you need to do several things. Tell the user whether their guess should be "higher" or "lower" (as in the above example).

- Debugging strategy: Be sure to test and retest your code at each step of the process! You may want to (temporarily) print out the secret number so you know what you are looking for, then you can guess numbers that are within a certain range to test your conditionals.

  Double-check that your program works perfectly by playing multiple games. If there is ever any behavior that seems wrong, stop and figure out what caused that!

#### Part 2: Upgrading the Game

With a bare-bones version of the `GuessingGame` written, you should now include the following functionalities.

- **Upgrade #1 - Congratulate or Mock the Player:** When the user guesses the answer correctly, we now want to either mock or compliment them depending on the number of guesses it took. (Now your game needs to know how many tries it's taking the user!) Using the table below, print out the appropriate message when the guess is correct:

  | Guesses    | Message to Print                  |
  | ---------- | --------------------------------- |
  | 1          | "All luck!"                       |
  | 2 to 4     | "Okay, that was amazing!"         |
  | 5 to 6     | "Not bad!"                        |
  | 7          | "I think you can do better..."    |
  | 8 to 9     | "Try harder."                     |
  | 10 or more | "Are you even serious right now?" |

- **Upgrade #2 - Hot or Cold:** This next one is a little harder. When a user guesses wrong, currently your code only tells them to go higher or lower. Now, print out a message corresponding to how close their guess was to the secret number. Print a different message depending on its distance:

  | Distance from Secret | Message to Print              |
  | -------------------- | ----------------------------- |
  | Within 1             | "scalding hot"                |
  | Within 2             | "extremely warm"              |
  | Within 3             | "very warm"                   |
  | Within 5             | "warm"                        |
  | Within 8             | "cold"                        |
  | Within 13            | "very cold"                   |
  | Within 20            | "extremely cold"              |
  | More than 20 away    | "icy freezing miserably cold" |

  For example, if the secret number is 35, and the user guesses either 34 or 36, then they should both print "scalding hot." (Hint: we learned how to compute the absolute value of a number in class... how might that help?)

- **Upgrade #3 - Game Over:** Finally, once the user correctly guesses the secret number, your game right now continues to allow more guesses to be made (go ahead try it, I'll wait!). Update your code so that, when more guesses are made after the game ends, you should print out something like this instead:

  ```
   Game Over: You won!
  You guessed that the secret number was 37 in 5 tries.
  ```

  Hint: Your game needs to know whether the player has _already_ won...

#### Optional Extensions

- If you're done, and want a bit more challenge, do this upgrade. There have been complaints that some people are really bad at guessing, and are hogging too much of your program's time. It would be really nice if we could `limit` the numbers of guesses the player gets to make. Before you dive into the code, think critically about what needs to happen inside your `guess()` method. Here are its specifications:

  - You are going to want to another constructor that allows you to initialize the game with a parameter that inputs the limit on the number of guesses. Store this limit. Make sure you update the existing constructor to give initialize limit with a value. Worth considering: What value should you set this limit if there is no limit?

  - If the limit has been reached without the user successfully guessing, then the game is over, and you need to flag it as such (the work you did previously in `Upgrade #3` may come in handy).

  - However, this breaks the code you wrote for `Upgrade #1`. That is, when the user tries to `guess() `again, the message it prints assumes they got it right! This is no longer correct. If the user met the limit, and still didn't get it right, you should instead print:

    ```
    Game Over: You Lost!
    You've reached the limit of 25 tries.
    The secret number was 46.
    Please stop playing now.
    ```

- Food for Thought: By now, you've probably played the game several times to test your program. Have you figured out a guessing strategy based on the "higher" or "lower" information that minimizes the number of guesses you need to find the secret number? (Foreshadowing: Could such a strategy be useful in other ways...?)

#### Grading

```
This assignment will be graded out of 10 points, provided:

- You attended lab.
- You got through part 1 at the minimum, and made good progress on part 2.
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

Written by David Chiu and Joel Ross.

#### Lab Attendance Policies

Attendance is required for lab. Unexcused absence = no credit even if you turned in the lab. Unexcused tardiness = half credit.
