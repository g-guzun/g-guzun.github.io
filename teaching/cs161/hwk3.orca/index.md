## CS 161 - Intro to Computer Science

### Homework: Orca Card

This week you'll build a class that simulates an ORCA Card, which is used to pay for
bus, train, and ferry trips in Pierce and King counties. When using the real card,
you add funds to it and can then swipe the card to charge rides on the various
services. In addition to keeping track of the balance and paying for rides, "our"
ORCA card will also keep track of things like the number of trips that have been
taken and the amount of tax that has been collected. This assignment will give
you some additional practice with instance variables, methods, constructors, conditionals,
and output.

<img width="300px" src="figures/orca_cards.png"/>

#### Student Outcomes

- Exposure to integer divide and type conversion.
- Putting defensive programming into practice.
- More work on if/else-if/else statements.

#### Instructions

For full credit, your class should contain all of the methods described below. They should have exactly the same name as shown, take the correct arguments, and return the correct information. (I will run a program that creates instances of your class and tests them, and if your names or other details differ, my testing code won't compile.) The assignment is less specific about the instance variables (fields) you'll need — you'll have to figure out what you need to store in order to implement the methods below.

- Start by creating a new BlueJ project, called `OrcaCard`. Inside, create a new class called `OrcaCard`. Your class needs to be able to keep track of how much money is currently stored on the card.

- You need to implement two constructors:

  - A default constructor should set the sales tax rate to 6.5% (input as a `double`: 0.065). Set all other counters (keep reading) to zero.

  - A second constructor should take a single argument as input (the sales tax rate). Your code should ensure that a valid rate was entered (i.e., can't be negative). If a rate is detected as being invalid, you should default the rate to 6.5%.

  - Know this: The thinking-ahead, anticipating possible errors, and writing code to prevent them, is called **Defensive Programming**. This is an extremely important programming practice, as it could prevent bugs and security vulnerabilities in your code.

- A method called `topUp(..)` that takes a single input argument (the amount to add to the current balance) and adjusts the balance but doesn't return anything. You are reminded to program defensively...

- We'll simulate the process of "swiping" the card via the `buyTrip(..)` method. It should take the cost of the trip for input, but we're required to pay tax on the cost of the trip as well. Thus, in the body of your method you'll need to calculate how much we owe in tax, and decrease the balance by the cost of the trip **plus** tax. The `buyTrip(..)` method should return void. You should also keep a separate running total of the amount of tax collected, so that we can report it to the IRS when necessary.

  For full credit, you should use conditional statement(s) in `buyTrip(..)` that checks whether you can afford the trip (plus tax). If not, print an error message but don't adjust the balance on the card or the tax collected. If there are sufficient funds for the trip, do the bookkeeping described in the paragraph above and print a success message that includes the remaining balance on the card.

- Report it to the IRS you say? We'll need a `getTax()` method. It doesn't take any input arguments, but should return the total amount of tax collected during "swipes" of the card.

- It might be good to keep a record of the costliest trip you've ever taken. Write a method called `getCostliestTrip()` that returns that information. The costliest trip **does not** need to include the tax.

- We'll also add a `getAverageTripCost()` method. It doesn't need any arguments, but it should return the average cost of the trips paid for by this card. Ignore the tax we pay on the trips when computing the average. The average trip cost **does not** include the tax.

- Let's also alert the user to their level of balance remaining on the card. Write a method `balanceLevel()` that doesn't require arguments, and `return` a `String` containing the appropriate message (shown below) based on the current balance. Only one message should be returned. Note that a negative balance cannot happen if you programmed `buyTrip()` properly. If you see a negative balance, go back and fix that method!

  | balance                                      | message to return                       |
  | -------------------------------------------- | --------------------------------------- |
  | $0                                           | Your card is empty! Top up immediately! |
  | at or below the average trip cost            | Your balance is low!                    |
  | at or below twice the average trip cost      | Your balance is just enough.            |
  | at or below five times the average trip cost | Your balance is sufficient!             |
  | anything higher                              | Your balance is high!                   |

- Finally, write a `printSummary()` method that prints (not `return`!) information about the ORCA card object. The output should contain: the card's current balance, the number of trips taken, the balance-level message from the method you just wrote previously. It should also print your costliest trip on a separate line.

  For instance, the output to the terminal might look like this:
  ```
  $20 left after 1 trip(s)
  Your balance is high!
  Your costliest trip so far: $4.5
  ```

#### Sample Output
You can test out your class in BlueJ's code pad. Your output should match mine exactly for full credit. Outputs on the terminal are shown directly below.

  Create an Orca Card with a balance of $20.50, and print its summary.
  ```java
  OrcaCard myCard = new OrcaCard();
  myCard.topUp(20.5);
  myCard.printSummary();
  ```

  ```
  $20.5 left after 0 trip(s)
  Your balance is high!
  Your costliest trip so far: $0.0
  ```

  Let's purchase a $10 trip. But remember, your balance needs to reflect the cost of the trip and the tax.
  ```java
  myCard.buyTrip(10.00);
  ```

  ```
  Success: Ticket purchased.  $9.85 remaining.
  ```

  Given a tax rate of 6.5%, the card should have collected $0.65 of taxes for the $10 trip.
  ```java
  System.out.println(myCard.getTax());
  ```

  ```
  0.65
  ```

  Now buy a $5 trip.
  ```java
  myCard.buyTrip(5);
  ```

  ```
  Success: Ticket purchased.  $4.5249999999999995 remaining
  ```

  We've bought 2 trips for $15 total (not including tax), so the average trip should be $7.50.
  ```java
  System.out.println(myCard.getAverageTripCost());
  ```

  ```
  7.5
  ```

  The amount of taxes collected should now be:
  ```java
  System.out.println(myCard.getTax());
  ```

  ```
  0.9750000000000001
  ```

  ```java
  myCard.printSummary();
  ```

  ```
  $4.5249999999999995 left after 2 trip(s)
  Your balance is low!
  Your costliest trip so far: $10.0
  ```

  
  ```java
  myCard.buyTrip(4.50);
  ```

  ```
  Fail: You cannot afford this trip.
  ```

  ```java
  myCard.topUp(1.00);
  myCard.buyTrip(4.50);
  ```

  ```
  Success: Ticket purchased.  $0.732499999999999 remaining
  ```

  ```java
  myCard.printSummary();
  ```

  ```
  $0.732499999999999 left after 3 trip(s)
  Your balance is low!
  Your costliest trip so far: $10.0
  ```

#### Extending the Homework

Looking for additional challenges? Add code to the `buyTrip()` method so that it also prints out a simulated ticket, showing the cost, the amount paid in tax, and the remaining balance on the card. You could add a `cheatIRS()` method that moves the amount you've collected as tax over to the balance of the card. Look into ways to tidy up the dollar amounts so that they always have two digits after the decimal point. In my output, I printed trip(s) so that it sounded ok whether there had been one trip or more. It would look even better if you added some code that looked at the number of trips and either used trip or trips as appropriate.

#### Program Defensively

You can't control how another user or program chooses to use your methods. For each method, think critically about all the things that could go wrong and cause an unintended result (e.g., a runtime error, infinite loop/recursion, etc.). Chances are, I'll be trying all kinds of inputs (negative values, zeroes, nulls, empty-strings, etc.) when I grade your program. The mark of a good programmer is one that can anticipate such scenarios ahead of time and ensure that their program handles all sorts of errors gracefully.

#### Commenting

Each and every method should have a "javadoc-style" comment above it (the ones that use `/* ... */`). For full credit, you should use the @param and @return tags as appropriate in these method comments. Each instance variable (field) should have a brief comment as well. Don't forget the main comment at the top of the class either - I'm looking for more than just a sentence or two.

#### Grading

```
This assignment will be graded out of a total of 75pts.

[5pts] Proper fields have been defined. No more -- no less than what is needed
       by the OrcaCard class.

[5pts] Default constructor generates a default card with a 6.5% sales tax.

[5pts] The overloaded constructor that verifies the input value for the sales tax.

[5pts] The topUp() method must verify that the given amount is non-negative.

[10pts] The buyTrip() method adjusts your balance after purchasing a trip of
        the specified amount. Don't forget to add the tax. It must also verify
        that the trip of the given amount can be purchased, and if not, it should
        output an error message.

[5pts] The getTax() method is properly implemented.

[5pts] The getAverageTripCost() method is properly implemented.

[10pts] The getCostliestTrip() method is properly implemented.

[10pts] The balanceLevel() method returns a single, appropriate message based on
       your card's balance.

[5pts] The printSummary() method is properly implemented.

[5pts] You re-use code whenever possible.

[5pts] You provide Javadocs style comments for any new methods implemented, and
       sufficient inline comments to explain the logic of your methods.
```


#### Submitting Your Assignment
Follow these instructions to submit your work. You may submit as often as you'd like before the deadline. I will grade the most recent copy.

- Navigate to our course page on Canvas and click on the assignment to which you are submitting. Click on "Submit Assignment."

- Upload all the files ending in `.java` from your project folder.

- Click "Submit Assignment" again to upload it.

#### Credits

Adapted for use from a previous assignment by Brad Richards. Shape classes provided by BlueJ.
