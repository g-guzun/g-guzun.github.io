## CS 161 - Intro to Computer Science

### Lab: Writing the Stomach Class

In this assignment you will use BlueJ to practice creating and calling methods on some limited Shape objects. You will manipulate these shapes to create a simple picture of Pac-Man. You will then create a picture of your own.

#### Student Outcomes

- Practice basic class writing from scratch
- To learn to use the Random class

#### Helpful APIs

The API handout that you'll want to have in front of you:

- [Random](../api/RandomAPI.pdf)

#### The Stomach Class

- There is no starter code this week to download. You need to create a new project in BlueJ. Open BlueJ and use the Project > New Project menu. It'll want you to choose a location on your computer to store and save this project. Make sure you choose somewhere appropriate that you won't forget.

- You should see a blank project window. Using the button, create a new class called Stomach. Go ahead and remove everything in the body of the class. Recall that to write a new class, we need to specify three sections: (1) Fields, (2) Constructors, and (3) Methods. In the future, you'll be doing this on your own, but in this early lab, I'm going to tell you what you'll need in each section.

  - **Fields (Instance Variables):** Your stomach needs to have two fields:

    - A whole number variable to hold the current amount of food sitting in the stomach.
    - A whole number variable to hold the total amount of food that has been digested.

      ```java
      private dataType fieldName;
      ```

  - **Constructors:** Recall that it is the job of the constructor to set up initial values for the fields. Your class should have two constructors:

    - A default constructor. The assumption here is that, when the stomach is created using this constructor, it is empty and has digested no food.
    - An overloaded constructor that lets users determine a pre-existing amount of food that's been ingested in the stomach.

    ```java
    public Classname(parameterList) {  //the parameter list is optional
      // code to initialize fields
    }
    ```

  - **Methods:** Add the following methods to your class. Test to make sure a method is working before writing the next! Remember what I told you about writing methods? Don't start writing until you've designed it.

    - First, determine what inputs (if any) the method requires (It's early in the semester, so I will tell you in this lab.) For each input, also determine its data type.
    - Next, determine what, if any, this method "owes" the caller. The owed value is called the return value. The data type of the return value is called the return type. The return type is void if the method does not owe the caller anything.
    - Now you're ready to write the method.

    ```java
    // If the method returns nothing, its return type is void
    public returnType methodName(parameterList) {
      // code here
      // if returnType is non-void, it must have a return statement
    }
    ```

  - Here are all the methods that your class needs to support. Read each description carefully. After you've designed each method, write it in BlueJ, and test it vigorously before moving on!

    - `getAmountFood` - Inputs nothing, and returns (doesn't print!) the current amount of food in the stomach.

    - `getAmountDigested` - Inputs nothing, and returns (doesn't print! the total amount of food that the stomach has digested.

    - `ingest` - This method accepts one input, and does not `return` a value. Running this method causes the stomach to ingest the amount of food given in the input parameter, and this amount should be added to the current amount of food sitting in the stomach.

    - `digest` - This method accepts no inputs and does not `return` a value. Running it causes a random amount of the food that's currently in the stomach to be "digested" and pulled out of the stomach. For example, suppose there are 13 units of food in the stomach, and 30 units have been digested. Select a random number between 0 and 13 (see below on how) to digest. Let's say the random number, 6, is chosen. After the method is finished, the stomach should now contain 7 units of food ingested, with 36 units digested.

      - To write this method, you need to figure out how to ask Java to generate a random value. **Read on.** Java has a convenient built-in class called `Random`, and to use it, you need to import it into your code. Place this line at the very top of your class file, above the class header:

        ```java
        import java.util.Random;
        ```

      - In the body of `digest()`, create a local variable of type `Random` as follows:

        ```java
        Random rng = new Random();   // Create a random number generator called 'rng'
        ```

        Now, `rng` is a variable that stores a `Random` object. You can think of it as a random number generator that you can request to spit out a number whenever you need one!

      - Then you can call its `nextInt(int n)` method to fetch a random integer between 0 (inclusive) and n (exclusive). For example:

        ```java
        Random rng = new Random();
        int x = rng.nextInt(10);     // Get a random number between 0 and 9, and
                                     // store it in local variable 'x'
        ```

        This will store a random integer between 0 and 9 in `x`.

      - **As a reminder,** you don't want to just generate a number between 0 and 9 as shown in the example above. It should be a number between 0 and X, where X is the current amount of food in the stomach!

    - `toString` - Inputs nothing, and returns a String that summarizes the state of the stomach. This method does not print to the screen! In other words, you need to define a local `String` variable that is assigned something like `"Ingested: X, digested: Y"`, where `X` and `Y` refer to those respective field values.

  - It would be nice to know how "efficiently" our stomach is working. On average, how much are we digesting every time the `digest()` method is called? This might be a useful piece of information to know. (E.g., if we’re digesting a very small amount on average then we might have a blockage in our stomach that needs to be examined.)

  Add the following method to your Stomach class: `public double getAverageAmountDigested()`. This method should return the average amount of food that has been digested. For example, if 10 units of food was digested the first time we called `digest()` and 4 units of food the second time we called `digest()`, then on average, we are digesting 7 units of food.

  - **Defensive Programming:** Our Stomach is not very robust to erroneous inputs. For instance, Try creating a new Stomach with a negative amount of food in it. It lets you! Now try ingesting a negative amount of food. It lets you! You need to fix these problems next.

    Use an if-then-else statement to alert the user that they've entered an invalid input, and ignore further actions on the stomach's state. For fixing your constructor, it is appropriate to just let Java create an empty stomach.

  - **The Test Code:** Here's some code to test your Stomach class. You can type the following into Blue's codepad. Ask one of us if you don't remember where this is. If your class is bug-free, your output (below the Test code) should look similar to mine.

  ```java
  System.out.println("Creating a new stomach...");
  Stomach s = new Stomach();
  System.out.println(s.toString());
  System.out.println();

  System.out.println("Eating breakfast...");
  s.ingest(5);
  System.out.println(s.toString());
  System.out.println();

  System.out.println("Digesting...");
  s.digest();
  System.out.println(s.toString());
  System.out.println();

  System.out.println("Eating lunch...");
  s.ingest(10);
  System.out.println(s.toString());
  System.out.println();

  System.out.println("Eating an early dinner...");
  s.ingest(20);
  System.out.println(s.toString());
  System.out.println();

  System.out.println("Digesting...");
  s.digest();
  System.out.println(s.toString());
  System.out.println();

  // Let's see how much food remains in our stomach
  int a = s.getAmountFood();
  System.out.println("We still have " + a + " units of food in our stomach");

  int d = s.getAmountDigested();
  System.out.println("Total we have digested " + d + " units of food");
  System.out.println();
  ```

- If everything is working, you should get something similar to what I got below. Because `digest()` is random, most your values will likely differ. But read through your output carefully to make sure everything makes sense.

  ```
  Creating a new stomach...
  Ingested: 0,  digested: 0

  Eating breakfast...
  Ingested: 5,  digested: 0

  Digesting...
  Ingested: 1,  digested: 4

  Eating lunch...
  Ingested: 11,  digested: 4

  Eating an early dinner...
  Ingested: 31,  digested: 4

  Digesting...
  Ingested: 3,  digested: 32
  ```

#### Grading

```
This assignment will be graded out of 10 points, provided:

You were in attendance.
Your Stomach class is properly implemented and passes all tests.
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

Adapted for use from a previous lab by America Chambers.

#### Lab Attendance Policies

Attendance is required for lab. Unexcused absence = no credit even if you turned in the lab. Unexcused tardiness = half credit.
