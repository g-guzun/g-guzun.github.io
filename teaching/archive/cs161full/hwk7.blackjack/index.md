## CS 161 - Intro to Computer Science

### Homework: Black Jack

Business at David's Casino is flourishing, but customers have been complaining that they're getting a bit bored of rock-paper-scissors, coin flipping, and dice games. To scale up his business, David wants to host Black Jack, a popular game at most casinos, but he doesn't have the ability to staff more people. He wonders if you can write a program to play Black Jack with his customers. David offers you 5% of all Black Jack winnings if you can properly implement the game, so you agree...

<img width="200px" src="figures/BlackJack.jpg" />

#### Student Outcomes

- Use of constants, enums
- Writing the main method
- Scanning for user input

#### Required Files

The following file(s) have been provided for this assignment.

- [Hwk8_BlackJack.zip](Hwk8_BlackJack.zip)

#### The Suit Enumeration Class, Card Class, and Deck Class.

You will be copying over your Suit, Card, and Deck classes from lab. If you did not finish this class during lab period, go ahead and finishing them now.

#### "Hands" Explained

Black Jack requires users to hold a set of cards, generally known as a "Hand." Let's go over its rules. At arbitrary points of the game, a hand contains at least two Cards. The suits are ignored, but the face values of these cards are added together. The objective is to get the sum of the hand as close to **21** as possible, without exceeding it (known as a bust). Initially, a hand starts with two Cards. Users can decide to hit, in which a the top card from the deck is drawn and added to their Hand.

A quick word on face values. The face value of each card can usually be added to the value of the hand, with a few exceptions:

- Jack (11), Queen (12), and King (13) all carry a value of **10** when added to the hand.
- Another (much more complicated) exception is the Ace (1) card, which carries a value of either **1** or **11** when totaled, depending on circumstances. Here's the rule for adding an Ace card:
  - The value of an Ace is _11_ if adding it does not cause the hand to bust.
  - The value of an Ace is _1_, otherwise.
    Keep in mind there could be several Aces in a single hand.

#### Writing the Hand Class

- This class should keep an `ArrayList` of `Card` objects. This represents all the `Card`s the hand holds.

- This class should keep a reference to a `Deck` object, which represents all the Cards that have yet to be drawn.

- Write a 1-argument constructor that takes as input a `Deck` object. Upon being called, it should remove the top two cards from the Deck, and add them to the hand.

- Write a 2-argument constructor that takes as inputs 2 Card objects and add them to your array list. This method should set the Deck to null. (This constructor is provided only to help you test).

- A method, `int getValue()` which accepts no input arguments. It loops through all the `Card`s in the hand, and sums up their values, using the rules of the game described above. This total is then returned to the caller. Recall that the Ace is handled specially.

- A method, `Card getCardAt(int index)` which accepts an index to the current Hand, and returns the Card at the given index. If the index is out of range, this method should return null.

- A method, `boolean isBust()` which accepts no input arguments, and determines whether or not the value of the hand exceeds 21.

- A method, `boolean isBlackJack()` which accepts no input arguments, and determines whether or not the current Hand holds a Black Jack. This can only occur when the the Hand holds exactly two cards, and the value of the Hand is **21**. Note that any other combination of Cards that adds up to **21** is not considered a Black Jack (e.g., three 7s).

- A method, `void hit()` which accepts no input arguments. It draws the top card from the associated `Deck` object and adds it to the current hand. If the hand is already bust, this method performs no action.

- A method, `boolean pushes(Hand other)` which accepts another Hand object as input. It returns true if the current Hand's value ties with the given Hand's value.

- A method, `boolean defeats(Hand other)` which accepts another Hand object as its only argument. It compares the current hand with the given hand, and:

  - It returns `true` if the other hand is bust, and the current hand is not. It also returns `true` if neither hand is bust, and the current hand's value is higher than the other.
  - It returns `false` otherwise.

- The `String toString()` method, which returns a String representing the Hand. The String should show each Card in the hand on the same line, followed by the value of the Hand and whether it is bust, and whether it is a Black Jack on the same line. See code examples below for help.

- The first example below shows the effect of counting Aces.

  ```java
  Card c1 = new Card(Suit.CLUB, 1);
  Card c2 = new Card(Suit.DIAMOND, 1);
  Hand myHand = new Hand(c1, c2);
  System.out.println(myHand);

  > <club,A> <diamond,A> (12)

  myHand.hit(); //got a queen (10)!
  System.out.println(myHand);

  > <club,A> <diamond,A> <diamond,Q> (12)

  myHand.hit(); //got another Ace (1)!
  System.out.println(myHand);

  > <club,A> <diamond,A> <diamond,Q> <heart,A> (13)

  myHand.hit(); //got a jack (10)!
  System.out.println(myHand);

  > <club,A> <diamond,A> <diamond,Q> <heart,A> <diamond,J> (23 -- Bust!)
  ```

- The following example shows a Black Jack, and some subsequent hits.

  ```java
  Card c1 = new Card(Suit.CLUB, 1);
  Card c2 = new Card(Suit.SPADE, 12);
  Hand myHand = new Hand(c1, c2);
  myHand.isBlackJack()
  > true   (boolean)

  System.out.println(myHand);
  > <club,A> <spade,Q> (21 -- Black Jack!)

  myHand.hit();
  System.out.println(myHand);
  > <club,A> <spade,Q> <heart,5> (16)

  myHand.hit();
  System.out.println(myHand);
  > <club,A> <spade,Q> <heart,5> <spade,J> (26 -- Bust!)

  myHand.hit(); //hit should have no effect since hand is bust
  System.out.println(myHand);
  > <club,A> <spade,Q> <heart,5> <spade,J> (26 -- Bust!)
  ```

- The final example shows the effect of comparing two hands.

  ```java
  //start with the same hands (both Black Jacks, in fact)
  Hand myHand = new Hand(new Card(Suit.CLUB, 1), new Card(Suit.SPADE, 10));
  Hand yourHand = new Hand(new Card(Suit.DIAMOND, 1), new Card(Suit.CLUB, 13));
  myHand.defeats(yourHand)
  > false   (boolean)

  yourHand.defeats(myHand)
  > false   (boolean)

  yourHand.pushes(myHand)
  > true    (boolean)

  yourHand.hit();
  myHand.defeats(yourHand)
  > true   (boolean)

  System.out.println(yourHand);
  > <club,A> <spade,10> <heart,7> (18)

  System.out.println(myHand);
  > <club,A> <spade,10> (21 -- Black Jack!)

  myHand.hit();
  myHand.hit();
  myHand.defeats(yourHand)
  > false   (boolean)

  yourHand.defeats(myHand)
  > true   (boolean)

  System.out.println(myHand);
  > <club,A> <spade,10> <club,6> <spade,J> (27 -- Bust!)
  ```

#### Writing the Game Class

Good work! Now we need a way to play Black Jack with the computer. Do the following:

- Create a class `Game`. It will initiate the game itself when people run your program. It requires no fields. You may write as many (static) helper methods as you'd like, but you must provide a main method (below).

- Write the `public static void main(String[] args)` method.

  - It starts by printing a "startup/welcome message" to the sucker (I mean human player) who will be playing against your algorithm. Create a Deck here and shuffle it a few times! Then create two Hands: a Hand for the AI and a Hand for the human-player. Make sure both AI and human-player Hands remember the Deck you just created.
  - If the human has a Black Jack, then the game ends. That is, neither the human nor the AI gets to hit. (The AI can push if it also gets a Black Jack.) If the human doesn't get a Black Jack however, the game must go on.
  - Print the AI's second Card (but don't reveal the first Card to the human). Also print the human's hand to the screen.
  - Prompt the user to either hit or hold. Scan in the user's response. If they typed in "hit," then deal them another Card and print out their hand again. Continue to prompt them to hit or hold until the human either busts or types in "hold."
  - If the user enters anything but hit or hold, then you must output an error and re-prompt.
  - Afterwards, if the human is bust, then the AI doesn't need to hit. The human loses immediately. Otherwise, the AI hits until its Hand holds at least a value of 18, or bust. After AI's action is performed, you must compare two hands, and either determine a winner or a push (if there's a tie).
  - When the game ends, you must print off both Hands and the result of the Game.

- The first example below shows the AI busting.

```
*** Welcome to Black Jack! Prepare to lose. ***

AI: <???>, <diamond,10>
Player: <diamond,3> <heart,A> (14)

What will you do (enter either hold or hit)?
> hit

AI: <???>, <diamond,10>
Player: <diamond,3> <heart,A> <spade,5> (19)

What will you do (enter either hold or hit)?
> hold

***************************
***      Game Over      ***
***      You win!       ***
***************************
AI: <diamond,4> <diamond,10> <spade,2> <club,7> (23 -- Bust!)
Player: <diamond,3> <heart,A> <spade,5> (19)
```

- The second example shows that neither AI and human busts, but human wins.

```
*** Welcome to Black Jack! Prepare to lose. ***
AI: <???>, <diamond,A>
Player: <diamond,3> <diamond,4> (7)
What will you do (enter either hold or hit)?
hit

AI: <???>, <diamond,A>
Player: <diamond,3> <diamond,4> <spade,7> (14)
What will you do (enter either hold or hit)?
hit

AI: <???>, <diamond,A>
Player: <diamond,3> <diamond,4> <spade,7> <diamond,4> (18)
What will you do (enter either hold or hit)?
hit

AI: <???>, <diamond,A>
Player: <diamond,3> <diamond,4> <spade,7> <diamond,4> <diamond,2> (20)
What will you do (enter either hold or hit)?
hold
***************************
***      Game Over      ***
***      You win!       ***
***************************
AI: <diamond,8> <diamond,A> (19)
Player: <diamond,3> <diamond,4> <spade,7> <diamond,4> <diamond,2> (20)
```

- The third example shows the human busting.

```
*** Welcome to Black Jack! Prepare to lose. ***

AI: <???>, <club,3>
Player: <club,J> <heart,6> (16)
What will you do (enter either hold or hit)?
hit

AI: <???>, <club,3>
Player: <club,J> <heart,6> <diamond,6> (22 -- Bust!)

***************************
***      Game Over      ***
***      You lose!      ***
***************************
AI: <club,3> <club,3> (6)
Player: <club,J> <heart,6> <diamond,6> (22 -- Bust!)
```

- The final example shows a push (tie).

```
*** Welcome to Black Jack! Prepare to lose. ***

AI: <???>, <club,K>
Player: <diamond,10> <heart,8> (18)
What will you do (enter either hold or hit)?
hold
***************************
***      Game Over      ***
***      You pushed     ***
***************************
AI: <club,2> <club,K> <spade,5> <club,A> (18)
Player: <diamond,10> <heart,8> (18)
```

#### Extensions

If you're finished and are looking for a challenge, consider the following extensions.

**Medium:** Keep track of currency and bets. When the game starts, a user begins with some amount of money. At the beginning of each game before any cards are dealt, let the user place a bet. Do not allow this bet to exceed the user's balance (keep asking them to place a different bet until this condition is met). Then play a game. If the user wins, they receive the bet amount, and if they lose, they lose the bet. Don't just terminate the program after the game ends. Ask the user if they'd like to continue playing. If "yes" is entered, the start a new game, and terminate if "no" is entered or if the user's balance is zero.

**Harder:** Allow the user to split a hand by inputting the command split from the terminal. Splitting can only occur when a hand contains two cards, and they both carry the same face value. If this condition does not hold, then you must reject the action, and continue playing the hand. If a split can occur, the current hand is split into two, each with just one of the cards from the original hand. The dealer then deals a card to both hands so that they each have two cards once more. Then the user plays and finishes a game on first hand, before finishing a game on the second hand. Yes, it is possible for an already-split hand to split again, if the second card is once again a duplicate. Hint: Use an ArrayList of hands.

#### Program Defensively

You can't control how another user or program chooses to use your methods. For each method, think critically about all the things that could go wrong and cause an unintended result (e.g., a runtime error, infinite loop/recursion, etc.). Chances are, I'll be trying all kinds of inputs (negative values, zeroes, nulls, empty-strings, etc.) when I grade your program. The mark of a good programmer is one that can anticipate such scenarios ahead of time and ensure that their program handles all sorts of errors gracefully.

#### Commenting

Each and every method should have a "javadoc-style" comment above it (the ones that use `/* ... */`). For full credit, you should use the @param and @return tags as appropriate in these method comments. Each instance variable (field) should have a brief comment as well. Don't forget the main comment at the top of the class either - I'm looking for more than just a sentence or two.

#### Grading

```
This assignment will be graded out of a total of 100pts.

Hand class
    [5pts] Both constructors are implemented.
    [20pts] getValue() properly returns the value of the hand.
    [5pts] getCardAt() is properly implemented, and checks for edge cases.
    [5pts] isBust() and isBlackJack() are implemented.
    [5pts] hit() is implemented.
    [5pts] pushes() and defeats() are implemented.
    [5pts] toString() returns the string representation of the current Hand.

Game class
    [35pts] The main method allows for user-interaction, and plays a full game of Black Jack.

Misc
    [5pts] You re-use code whenever possible.
    [5pts] You provide Javadocs style comments for any new methods implemented.
    [5pts] You include sufficient inline comments to explain the logic of your methods.
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
