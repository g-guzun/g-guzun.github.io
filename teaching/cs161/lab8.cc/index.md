## CS 161 - Intro to Computer Science

### Lab: Credit Card Validation

Most credit cards carry a unique 16-digit number. With the length being this long,  people often make mistakes when filling out a form or giving it over the phone. (Just think of the number of times you've screwed up typing your credit card number when making an online purchase!) Back before the Internet and Web existed, how did our credit card readers immediately determine when a credit card number was entered incorrectly? That is the topic of today's lab!

<img src="figures/gui.png" width="250px"/>



#### Student Outcomes

- Using arrays
- Using loops to access array elements

#### Required Files

The following file(s) have been provided for this homework.

- [Lab8_CC.zip](Lab8_CC.zip)

#### Validating Credit Cards (Luhn's Algorithm)

Let's take a sec to understand that a 16-digit credit number actually represents two pieces of information. The first 15 digits are the "real" credit number, called the *payload*. The final digit of the credit card number is called the *checksum*. To determine whether a given credit card number is valid, there's a slick algorithm that does some transformations on the payload to render it down to a single number, and then it checks it against the checksum. If the credit card number is valid, then the payload and checksum "matches" in pre-defined way.

- Download the lab file, extract it, and open it up. For this project, you don't need to make any changes to the `Main` or the `GUI` class. I expect that `GUI` will not compile because you haven't provided a couple of methods in `CCValidator`.

- Open the `CCValidator` class. You just need the two instance variables. We'll need to store the payload as an int array, and separately, the checksum as just an integer variable.

- Write a default constructor that instantiates your `payload` array (recall that the payload of a credit card number is the first 15 digits). Go ahead and set the `checksum` to 0.

- Write a method called `loadSequence()` that takes as input a `String` credit card number. This method should first check to see if the number is 16 digits. If not, then return `false` immediately. You will want to refer to your **String API** to get the length of a string. Otherwise, you'll need to do the following:

  - Use the `charAt()` method in the **String API** to extract and store the final digit in the credit card number in your `checksum` field. But there's a small problem. `charAt()` returns a `char` and not an `int`, so you'll also need to a conversion by calling `Character.getNumericValue()` on the last digit before storing it in `checksum`.

  - Next, iterate through the input string and extract every digit (just as you did previously) into its corresponding position in `payload`. After all that is done, return `true`.

  - Test it out using some 16-digit strings, like `"3979250428219432"`. Inspect your `CCValidator` object to ensure that the payload and checksum are properly assigned.

- Next, write a method called `toString()` that returns the credit card number as a `String`. To do this, you'll need to build up a string by running through your `payload` array and concatenating all of the digits together, including the checksum at the end. For better readability, each group of 4 digits should should be separated by space. Here's what it should look like:

    ```java
    CCValidator reader = new CCValidator();
    reader.loadSequence("3979250428219432");
    System.out.println(reader.toString());

    > 3979 2504 2821 9432
    ```
    
- Next, you'll want to start writing another method called `validate()` that returns a `boolean` and inputs nothing. The algorithm you're about to write is known as [Luhn's Algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) and it's implemented in just about every credit-card reading device in the world! **It gets complicated, so you should read through this whole section before starting to code.**

  - **Step 1:** I would start by creating a copy of `payload` array, because you'll be modifying the numbers. Then working off the copy, starting with the right-most digit, double that digit and moving left, double every other digit that you encounter. 

  - For instance, let's say that I entered my 16-digit credit card info manually into an online form: `3979250428219432`. The payload is `397925042821943` and the checksum is `2`. Starting with the right-most digit of the payload, we'll double every other digit (including `3`) to obtain the results for "Step 1" below:

    <table border="1">
      <tr>
        <td>Original Payload</td>
        <td>3</td>
        <td>9</td>
        <td>7</td>
        <td>9</td>
        <td>2</td>
        <td>5</td>
        <td>0</td>
        <td>4</td>
        <td>2</td>
        <td>8</td>
        <td>2</td>
        <td>1</td>
        <td>9</td>
        <td>4</td>
        <td>3</td>
      </tr>
      <tr>
        <td>Step 1: Doubling Every Other Digit</td>
        <td>6</td>
        <td>9</td>
        <td>14</td>
        <td>9</td>
        <td>4</td>
        <td>5</td>
        <td>0</td>
        <td>4</td>
        <td>4</td>
        <td>8</td>
        <td>4</td>
        <td>1</td>
        <td>18</td>
        <td>4</td>
        <td>6</td>
      </tr>
      <tr>
        <td>Step 2: Sum the Digits in Each Position</td>
        <td>6</td>
        <td>9</td>
        <td>5</td>
        <td>9</td>
        <td>4</td>
        <td>5</td>
        <td>0</td>
        <td>4</td>
        <td>4</td>
        <td>8</td>
        <td>4</td>
        <td>1</td>
        <td>9</td>
        <td>4</td>
        <td>6</td>
      </tr>
      </table>


  - **Step 2:** Then add up all the all the digits for any number that we doubled back in **Step 1**. This seems rather difficult, but look for a pattern... Because you're multiplying by 2 on a single digit that ranges from 0 to 9 from **Step 1**, the doubled numbers here can only range from 0, 2, 4, 6, ..., 18. Of those, you only need to worry about half of them, because you just need to be concerned about adding up the two-digit numbers: 10, 12, 14, 16, and 18. These numbers add up to 1, 3, 5, 7, and 9, respectively. Do you recognize what you need to do in order to convert 10 to 1? 12 to 3? Etc.? Once you recognize the pattern, you'll want to write the following method.

    Write a helper method called `twoDigitSum()` that inputs an integer, adds up the digits in the input, and returns this sum. If the number is a single-digit, then just return the number trivially. If you did it properly, you should get outputs like:

      ```java
      twoDigitSum(5)
      > 5

      twoDigitSum(0)
      > 0

      twoDigitSum(12)
      > 3

      twoDigitSum(16)
      > 7
      ```

  - After you've implemented and tested `twoDigitSum()` we can finally finish off **Step 2**. Back inside the `validate()` method, place all the sums in another array of size 15 (because we don't want to overwrite the original `payload`.) To do this, you can just instantiate a local array variable inside the method. Fill this local array with the numbers you obtained. Obviously, you'll need to call your `twoDigitSum()` helper method inside `validate()`.

  - **Step 3:** Finally, you'll need to add up all the values in order to obtain: 6 + 9 + 5 + 9 + 4 + 5 + 0 + 4 + 4 + 8 + 4 + 1 + 9 + 4 + 6 == 78. Then add in the checksum to obtain 78 + 2 == 80, and calculate 80 % 10. Because this result is zero, this credit card number validates!

- To test, go back and run the `static void main(String[] args)` method of the `Main` class. You may not want to use your own credit card numbers to test, which is understandable, but <a href="https://www.dcode.fr/luhn-algorithm">this link</a> lets you generate valid credit card numbers! 

#### Grading

```
This assignment will be graded out of 2 points, provided that:
- You were in attendance and on-time.
- Completed all required methods.
```


#### Submitting Your Assignment
Follow these instructions to submit your work. You may submit as often as you'd like before the deadline. I will grade the most recent copy.

- Navigate to our course page on Canvas and click on the assignment to which you are submitting. Click on "Submit Assignment."

- Upload all files ending in  `.java` from your project folder.

- Click "Submit Assignment" again to upload it.

#### Credits

Written by David Chiu. 2023.

#### Lab Attendance Policies

Attendance is required for lab. Unexcused absence = no credit even if you turned in the lab. Unexcused tardiness = half credit.
