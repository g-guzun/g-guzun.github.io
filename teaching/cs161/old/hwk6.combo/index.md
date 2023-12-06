## CS 161 - Intro to Computer Science

### Lab: Combo Guesser

David is pretty impressed with all the programs that you've been writing! He has been talking you up to his buddies. One of them, who wishes to remain anonymous, wants your help installing a new electronic lock on the safe (like the one shown to the right) to store their valuables. The safe is one of those fancy ones that allow you to "program" its combination.

The "key" for the lock is just a sequence (array) of integers, and David's friend is trying to decide how long this key sequence should be (how many numbers it contains), and the range of values used for each number in the key (between zero and some upper limit). They want to make sure it's hard for intruders to guess, but their memory isn't what it used to be, so they also to keep it on the simple side, if possible.

Your job is to help estimate the "strength" of various combination configurations. Sure, you could just calculate the total number of possible combinations (permutations), given the length of a combination and the range of possible values at each position, and use that to estimate the strength of a configuration but it'll be more fun to write a program to test it!

#### Student Outcomes

- Practice writing methods for object comparison
- Using arrays
- Using loops to access array elements

#### Instructions

Your program will consist of two classes: The `Combination` class that represents the sequence of integers that make up a combination, and a `ComboGuesser` class that repeatedly creates `Combination` instances, and compares them to the "right answer".
  
##### Combination Class

Your `Combination` class should contain the following methods:

- A constructor that takes two integer arguments: `length` and `max`. The `length` refers to the length of the combination sequence to be constructed, and the `max` refers to the highest value for each of the numbers in the combination. A single number in the combination can therefore range between 0 to `max` (both inclusive). It should initialize the `Combination` instance to hold random values within the prescribed range for each of the values in the array. 


- A method called` toString()` that returns a `String` containing the values in the combination. For full credit, the values should be separated by commas, with square brackets around the entire thing. There should not be a comma after the last value. For example, if the combination contains the values 1, 2, and 3, the returned value from your method should be `"[1, 2, 3]"`.

  The sample interactions below illustrate the creation of several different `Combination` objects, and output from `toString` for each:

  ```java
  Combination c = new Combination(4, 2);
  System.out.println(c.toString())
  > [2, 1, 2, 0]

  c = new Combination(4, 2);
  System.out.println(c.toString())
  > [1, 1, 0, 2]

  c = new Combination(6, 10);
  System.out.println(c.toString())
  > [1, 6, 10, 8, 7, 0]

  c = new Combination(1, 2);
  System.out.println(c.toString())
  > [2]
  ```

- A `setValue(int index, int newValue)` method that takes two integer arguments: The (zero-based) index of the value within the sequence to be changed, and the new value to be stored there. The value should only be changed if the index is *valid* in the array *and* the specified value is within the allowed range. 

  ```java
  //create a 4-number combination, and each number can range from 0 to 2
  Combination c = new Combination(4, 2);
  System.out.println(c.toString())
  > [1, 0, 0, 2]

  c.setValue(0, 2);   //set the number at the 0-position to 2
  System.out.println(c.toString())
  > [2, 0, 0, 2]

  c.setValue(-4, 2);  //invalid position (-4) given: should have no effect
  System.out.println(c.toString())
  > [2, 0, 0, 2]

  c.setValue(3, 1);   //set the number at the 3-position to 1
  System.out.println(c.toString())
  > [2, 0, 0, 1]

  c.setValue(3, 3);   //trying to set a number out of range (3): should have no effect
  System.out.println(c.toString())
  > [2, 0, 0, 1]

  c.setValue(4, 0);   //invalid position (4) given: should have no effect
  System.out.println(c.toString())
  > [2, 0, 0, 1]

  c.setValue(1, -3);  //trying to set a number out of range (-3): should have no effect
  System.out.println(c.toString())
  > [2, 0, 0, 1]
  ```

- A method called `equals(Combination other)` that takes a `Combination` object as its only argument, and returns a `boolean`. If the `Combination` object passed in has the same length _and_ sequence as the object on which the method is called, the method should return true. It should return false if the length and/or if its contents differ.

  ```java
  Combination c1 = new Combination(4, 2);
  System.out.println(c1.toString())
  > [0, 0, 0, 1]

  Combination c2 = new Combination(4, 2);
  System.out.println(c2.toString())
  > [2, 0, 2, 1]

  System.out.println(c1.equals(c2));
  > false

  System.out.println(c1.equals(c1));
  > true

  c2.setValue(0, 0);  //set the number at the 0 position to 0
  c2.setValue(2, 0);  //set the number at the 2 position to 0
  System.out.println(c2.toString())
  > [0, 0, 0, 1]

  System.out.println(c1.equals(c2));
  > true
  ```

##### ComboGuesser Class

After testing your `Combination` class thoroughly, create a new `ComboGuesser` class. The `ComboGuesser` class will keep track of a specific `Combination` (we'll call it the `key`), and repeatedly generate random `Combination` instances until it finds one that matches. The longer it takes your combo guesser to "guess" the key, the stronger your `key` is. Your `ComboGuesser` class should contain the following methods:

- A constructor that takes three arguments: The length of the combination, the maximum value, and a `Combination` instance to use as the key. Store all these inputs as fields. (You may assume that the length and maximum value passed as arguments are the same as the values used to create the `Combination` instance that is input.)

- A method called public void `guessCombo()` that generates random Combination instances until it finds one that matches the key. It should then print information about the key and the number of guesses required.

- The sample outputs below first show a `ComboGuesser` guessing at a randomly-determined key. Then, a specific key is constructed (setting values within the key to the maximum and minimum possible helps ensure thorough testing), and a new `ComboGuesser` is created to guess the specified key. (The output from `guessCombo()` would appear in the terminal window, not the codepad.)

  ```java
  // create a key first
  Combination key = new Combination(5, 10);
  System.out.println(key.toString());
  > [5, 3, 9, 4, 4]

  key.setValue(0, 10);
  key.setValue(4, 0);
  System.out.println(key.toString());
  > [10, 3, 9, 4, 0]

  // Hmm, how strong is my key? Let's see how many tries it takes to "crack it"
  ComboGuesser cracker = new ComboGuesser(5, 10, key);
  cracker.guessCombo();
  > It took 116561 guesses to guess
  > [10, 3, 9, 4, 0]
  ```

#### Grading

```
This assignment will be graded out of a total of 50 pts, provided:

[10pts] Combination's constructor randomly generates a combination of the
given length and max (limit) per number.

[10pts] The toString() method has been implemented, according to the format,
in the Combination class. For instance, a comma should not be
generated after the last number.

[5pts] setValue() has been implemented, and will only operate on inputs
within the allowed range.

[10pts] The equals() method is properly implemented in Combination.
Returns true if the number sequence that is stored in a
given Combination object matches this combination sequence.

[5pts] The 3-argument constructor is implemented for ComboGuesser.

[10pts] guessCombo() is implemented for ComboGuesser.
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

Written by Brad Richards.

#### Lab Attendance Policies

Attendance is required for lab. Unexcused absence = no credit even if you turned in the lab. Unexcused tardiness = half credit.
