## CS 161 - Intro to Computer Science

### Homework: Tweet Processor

In social networks, `#hashtags` are used to organize users' posts, and they are also used to organize people and trends. For example, you can see (to the right) that our own university uses `#LoggerUp` and `#HackHackChopChop` to organize tweets that are points-of-pride or are related to our athletics department. Just as crucial to social networks are mentions. Users or organizations are identified on the social media site by a handle, which is a non-empty string preceded by an `@` symbol. For instance, `@univpugetsound` is the handle for our university. When posts include `@user`, it is known as a mention, which serves to notify, reply to, or to recognize the `@user` in the post.

It is useful to those who study the impact of social networks to extract and count mentions and hashtags from given tweets. In this assignment, you will be writing such a tweet processor.

![](figures/tweet.png)

#### Student Outcomes

- Incorporating APIs into existing projects projects.
- Working with Arrays and ArrayLists.
- Use of the Scanner object for obtaining user input.
- Experience and familiarity with fundamental String methods.
- Experience with String processing.

<!-- #### Preliminary: The String API

Before you get started, you need to familiarize yourself with two very useful classes. We taught you that, to communicate to users how to use a class, you document your class using Javadoc comments. The Javadoc, which can be converted into a web page, communicates the Application Programming Interface (API) of a class.
We'll start with familiarizing ourselves with the String class, because it's something we've been using since the beginning. Recall that `Strings` are objects representing a sequence of characters. You can look at its [full documentation](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/String.html) here, but I've outlined some of the important methods below:

| Method                                      | Description                                                                           |
| ------------------------------------------- | ------------------------------------------------------------------------------------- |
| `boolean equals(String other)`              | Compares this String to another String                                                |
| `boolean equalsIgnoreCase(String other)`    | Compares this String to another String, ignoring case                                 |
| `int indexOf(String str)`                   | Returns the index of the first occurrence of the specified substring                  |
| `int length()`                              | Returns the length of this string                                                     |
| `String replace(String target, String rep)` | Returns a string which has replaced each substring that matches the targeted sequence |
|                                             | with the specified replacement sequence                                               |
| `String substring(int begin, int end)`      | Returns a new string that is a substring of this string                               |
| `String toUpperCase()`                      | Returns a String after converting all characters to upper case                        |
| `String toLowerCase()`                      | Returns a String after converting all characters to lower case                        |
| `String trim()`                             | Returns a String with leading and trailing whitespace omitted                         |

To see these methods in action, let's open up BlueJ's codepad. Type the following into the codepad, line-by-line.

```java
String line = "Call me Ishmael.";
line
> "Call me Ishmael."   (String)

line.length()
> 16   (int)

line.equals("call me ishmael.")
> false   (boolean)
```

One thing worth reminding you is that `String`s do not change state (that is, they are immutable once they're defined). To see this, type in the following:

```java
line.replace("Ishmael", "David")
> "Call me David."   (String)

line
> "Call me Ishmael."   (String)

line.substring(5,7)
> "me"   (String)

line
> "Call me Ishmael."   (String)
```

Notice that, after the `line.replace("Ishmael", "David")` was called, it returned the expected result (`"Call me David"`). However, when we check the contents of line, it still stores `"Call me Ishmael"`. Similarly, the `line.substring(5,7)` call returns the expected substring, but line is still untouched. -->

#### Preliminary: String's split() Method

An important `String` method called `split()` deserves additional attention. It is used to chop up a given String (using some separator, called a _delimiter_, into individual pieces, storing those individual pieces in an array (not ArrayList!) and returning that array.

<!-- Here is its signature and description: -->

<!-- | Method                             | Description                                                                                                  |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `String[] split(String delimiter)` | Splits this string around matches of the given delimiter, and returns an array containing those split-pieces | -->

To see how `split()` works, let's once again open up BlueJ's codepad. Type the following into the codepad, line-by-line.

```java
String post = "Call me Ishmael";
String[] terms = post.split(" ");
for (int i = 0; i < terms.length; i++) {
    System.out.println(terms[i]);
}
> call
> me
> Ishmael
```

The String variable `post` is split up by space (`" "` was input as the delimiter). The split method stores all the split-up chunks into a string array, and returns this array. The `String[] terms` variable holds this array, and we are able to traverse through its contents as usual.

You don't need to turn this in, but before you move on, see if you can do the following exercise:

- Say you have a string called roster, which stores a list of names of Professors as one long string like this: `David Chiu, Adam Smith, Brad Richards, America Chambers`. Each Professor's name is separated by a comma in the String. Write a method `makeUserName` that accepts roster as input, and prints each person's username on a separate line. A username is constructed using the first letter of first name appended with the last name. The entire username must be lower case. If done correctly, this method should print:

```
dchiu
asmith
brichards
achambers
```

#### Program Requirements

Do not attempt this assignment without thorough understanding of the String methods in its API. Create a new project in BlueJ named `TweetProcessor`. This class allows users to input tweets, and it will generate some useful statistics given those tweets. It also maintains an ArrayList of the most recently seen hashtags. We'll refer to this list as the history.

- Write a default constructor that initializes the fields.

- Write a method `reset()` that will clear all the stats accumulated. The history of hashtags must also be cleared.

- Write an `isHashtag()` method that takes a single term (not a entire tweet) as argument, and returns whether it is a hashtag. A term is a hashtag if the first letter is a `#` sign, and excluding the `#` sign, the term is at least one letter long. This method does not modify any fields.

- Write an `isMention()` method that takes a single term (not an entire tweet), as argument, and return whether it is a mention. A term is a mention if the first letter is an `@` sign, and excluding the `@` sign, the term is at least one letter long. This method does not modify any fields.

- Write a `processTweet()` method that takes a String tweet as input. A tweet can contain regular words, #hashtags, and @mentions. Here is what this method needs to do:

  - Step through every term in the tweet and update the counts required for `toString()` (see code example).

  - When you come across a `#hashtag`, you need to update the history as follows. First, the history should not contain any duplicates (i.e., every time you come across one, you need to see whether it already exists in your ArrayList, and add it in only if it's new!). You should ignore case, so if `#computing` is in the history, then `#COMPUTING` should not be added.

- Write a method called `toString()` that will return a string containing the number of tweets, number of hashtags, number of mentions, and the number of terms processed (hashtags and mentions also count as terms). Additionally, you should report the number of characters (which includes spaces) and the average number of characters per tweet. Lastly, it reports the history of observed `#hashtag`s. You must print in this format: each #hashtag must be separated by a space and printed on the same line. This method should print `(no hashtags found)` if none has been observed. For instance, when you print what this method returns, you might get something that looks like the following:

  ```
  Tweets: 5
  Terms: 35
  Characters per tweet: 49.2
  Hashtags: 6
  Mentions: 4
  History (3): #hack #chop #loggerup
  ```

- Now write a class called `TweetStats` and create the `public static void main(String[] args)` method. Inside this method, you should first instantiate a `TweetProcessor` object. Then use a `Scanner` to accept tweets from the user on the Terminal. For each tweet that your program obtains from the user, you'll _process_ (i.e., by calling `processTweet()`) it using the `TweetProcessor`. Continuously prompt the user for another tweet (just like we saw with ChatBot during lecture.)

  There are two special commands you must listen for though.

  - The first is `.status`. If this command is given, then call and print the results of the TweetProcess's `toString()` method to get a report of the stats that the TweetProcessor has collected so far. Your program should continue to prompt for input afterwards.
  - The second is `.quit`. If this command is given, then your loop/program should terminate. Call and print the results of the TweetProcess's `toString()` method to get a report of final stats.

  is input (make sure not to process `.quit` as if it were a tweet!) Then call `toString()` on the TweetProcessor object and print out its return value.

  For instance, let's say the following tweets are input to my program:

  ```
  ====================================
  Welcome to my TweetStats Program!
  ====================================
  Enter a tweet (.status or .quit): Hi @univpugetsound loggers!

  Enter a tweet (.status or .quit): #hack #hack #chop #chop

  Enter a tweet (.status or .quit): .status
  > Tweets: 2
  > Terms: 7
  > Characters per tweet: 25.0
  > Hashtags: 4
  > Mentions: 1
  > History (2): #hack #chop

  Enter a tweet (.status or .quit): The Lady Logs vie for the D3 championship! #LoggerUp @univpugetsound

  Enter a tweet (.status or .quit): What a send-off! Good luck, Loggers! RT @PSLoggers: Logger Sports Network: Good luck, @PSwbasketball! #LoggerUP

  Enter a tweet (.status or .quit): .status
  > Tweets: 4
  > Terms: 32
  > Characters per tweet: 57.25
  > Hashtags: 6
  > Mentions: 4
  > History (3): #hack #chop #loggerup

  Enter a tweet (.status or .quit): I like sandwiches

  Enter a tweet (.status or .quit): .quit
  > Tweets: 5
  > Terms: 35
  > Characters per tweet: 49.2
  > Hashtags: 6
  > Mentions: 4
  > History (3): #hack #chop #loggerup
  ```

<!-- - Now write a class called `TweetStats` and create the `main()` method. I've input some tweets in there and print out the stats.

  ```java
   public static void main(String[] args) {
        System.out.println("====================================");
        System.out.println("Welcome to my TweetProcessor Program!");
        System.out.println("====================================");

        TweetProcessor tp = new TweetProcessor();
        tp.processTweet("Hi @univpugetsound loggers!");
        tp.processTweet("#hack #hack #chop #chop");
        tp.processTweet("The Lady Logs vie for the D3 championship! #LoggerUp @univpugetsound");
        tp.processTweet("What a send-off! Good luck, Loggers! RT @PSLoggers: Logger Sports Network: Good luck, @PSwbasketball! #LoggerUP");
        tp.processTweet("I like sandwiches");
        System.out.println(tp.toString());
    }
  ``` -->

<!-- - You should get the following output if you implemented everything properly.

  ```
  ====================================
  Welcome to the TweetStats Program!
  ====================================
  Tweets: 5
  Terms: 35
  Characters per tweet: 49.2
  Hashtags: 6
  Mentions: 4
  History (3): #hack #chop #loggerup
  ``` -->

#### Program Defensively

You can't control how another user or program chooses to use your methods. For each method, think critically about all the things that could go wrong and cause an unintended result (e.g., a runtime error, infinite loop/recursion, etc.). Chances are, I'll be trying all kinds of inputs (negative values, zeroes, nulls, empty-strings, etc.) when I grade your program. The mark of a good programmer is one that can anticipate such scenarios ahead of time and ensure that their program handles all sorts of errors gracefully.

#### Commenting

Each and every method should have a "javadoc-style" comment above it (the ones that use `/* ... */`). For full credit, you should use the @param and @return tags as appropriate in these method comments. Each instance variable (field) should have a brief comment as well. Don't forget the main comment at the top of the class either - I'm looking for more than just a sentence or two.

#### Grading

```
This assignment will be graded out of a total of 90.

    [2pts]  Appropriate constructor(s) have been implemented.

    [3pts]  The reset method has been properly implemented.

    [10pts] isHashtag() and isMention() have been implemented using
            proper calls to String methods.

    [10pts] toString() is properly implemented.

    [30pts] processTweet successfully implemented to tokenize
            tweet using split() and update the stats accordingly.

    [10pts] processTweet manages an ArrayList of hashtags. A new
            hashtag is only added when it doesn't already exist
            (ignore case).

    [15pts] The main() method in TweetStat continuously accepts
            user input in the form of a tweet, and it processes
            each one as soon as it's input. The only exception is
            when .quit is entered, which terminates the loop/program
            and prints out the stats of all the tweets that were
            input.

    [5pts] You re-use code whenever possible.

    [5pts] You provide Javadocs style comments for any new methods
           implemented. You include sufficient inline
           comments to explain the logic of your methods.
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
