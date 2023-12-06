## CS 261 - Computer Science II

### Lab 7: Melody Player

In this assignment, students keep track of the notes of a song and write methods to perform many standard music player tasks. Repeated sections of songs are stored only once so students have to reason about how to play the entire song with all repeated sections.

This program focuses on using the `Stack` and `Queue` collections. You are given `StdAudio.java`, `Pitch.java`, `Accidental.java`, `Note.java` and `MelodyPlayer.java`.



#### Objectives
- To practice using queue and stack APIs.
- Exposure to Enums.

#### Required Files
The following file(s) have been provided for this lab.
- [Lab_Melody.zip](Lab_Melody.zip)

Extract the zip file, and check out the contents. Besides the files ending in `.java`, you should also see the song files ending in `.txt`. You should have:
- Epona's Song - from the Legend of Zelda
- Happy Birthday
- Hot Crossed Buns
- Levels - by Avicii
- Mystery - (reverse it to see what it is)
- Pop Goes the Weasel
- Tetris
- Twinkle Twinkle Little Star
- Zombie Nation - the Mariners' hype song

#### Background Information about Music
Music consists of notes which have lengths and pitches. The pitch of a note is described with a letter ranging from A to G. As 7 notes would not be enough to play very interesting music, there are multiple octaves; after we reach note G we start over at A. Each set of 7 notes is considered an octave. Notes may also be accidentals. This means that they are not in the same key as the music is written in. We normally notate this by calling them sharp, flat or natural. Music also has silences which are called rests.

For this assignment we will be representing notes using scientific pitch notation. This style of notation represents each note as a letter and a number specifying the octave it belongs to. For example, "middle C" is represented as "C4." You do not need to understand any more than this about scientific pitch notation but you can read more about it here if you are interested: [http://en.wikipedia.org/wiki/Scientific_pitch_notation](http://en.wikipedia.org/wiki/Scientific_pitch_notation).


#### What You Will Do
You will write a class that to represent a song. A song is comprised of a series of notes. It may have repeated sections. As we don't like to have any redundancy, we will only store one copy of a repeated chunk of notes.

Music is usually printed like the example on the right. The notes are a series of dots. Their position in relation to the lines determines their pitch and their tops and color, among other things, determine their length. Since it would be difficult for us to read input in this style, we will instead read input from a text file.

An example input file is shown below.

```
0.2 C 4 NATURAL false
0.4 F 4 NATURAL true
0.2 F 4 NATURAL false
0.4 G 4 NATURAL false
0.2 G 4 NATURAL true
0.2 A 4 NATURAL false
0.4 R false
0.2 C 5 NATURAL false
0.2 A 4 NATURAL false
...
```

Important: Each line in it represents a single note. The first number describes the length of the note in seconds. The letter that follows describes the pitch of the note, using the standard set of letters (A – G) or R if the note is a rest. For notes other than rests, the third item on the line is the octave that the note is in and the following is the note's accidental value. The final piece of information for all notes is true if the note is the start or stop of a repeated section and false otherwise.

You will implement several methods in the `Melody` class which will allow you to use `MelodyPlayer`'s main method to play your song on your computer. Your melody will be able to play as well as append another melody to itself, reverse and have its tempo changed.

The most challenging part of this assignment is getting melodies to play with repeats correctly. The file shown above, which contains 4 repeated notes, is equivalent to the repetitive file displayed to the right. When you play the above file you should play it the same as you would play the file below.

```
0.2 C 4 NATURAL false
0.4 F 4 NATURAL false
0.2 F 4 NATURAL false
0.4 G 4 NATURAL false
0.2 G 4 NATURAL false
0.4 F 4 NATURAL false
0.2 F 4 NATURAL false
0.4 G 4 NATURAL false
0.2 G 4 NATURAL false
0.2 A 4 NATURAL false
0.4 R false
0.2 C 5 NATURAL false
0.2 A 4 NATURAL false
...
```

#### Part I: Familiarizing with the Codebase
Spend a good amount of time to take a look at the given Note class. Make note of all the fields and methods it contains (a good idea is to make your own "API handout" for the Note class, as you will be using it quite a bit in this lab).

A couple things you will notice is that the `Note` class refers to `Accidental` and `Pitch`. Open those up to take a look inside. They are not classes. They're something called `Enums` (pronounced "ee-nums"). They're a useful way of declaring some constants that you'll use throughout your program. You won't have to deal with them directly in this assignment, but for future reference, to refer to them, you can use `Pitch.E` or `Accidental.NATURAL` for example.

Now look in the `MelodyPlayer` class. You don't need to make changes to this class, but you should have some understanding of what it's doing. Note that it contains the main method.

Now look in the `Melodic` interface, which you will implement.

#### Part II: Implementation Details
You will write one class: `Melody`, which implements the `Melodic` interface. You must use Java's `Stack` and `Queue` imported from `java.util`. Furthermore, you must *only* use them as stacks and queues; i.e., you may **NOT** use any index-based methods (like get and set and 2-argument `add`), `iterators`, or `for-each` loops (for-loops are okay). It must be possible to call the methods multiple times in any order and get the correct results each time. Your `Melody` class will use a queue to store the notes in the song. But unless otherwise specified, you may not create any other temporary data structures (such as arrays, lists, stacks, queues) inside methods to help you solve any method you're asked to implement.

#### Part III: Strategy
We suggest the following development strategy for solving this program:

- It is important to read through each javadoc comment of the abstract `Melodic` methods that you need to implement. There are many details that you need to ensure of, and it also gives hints on how to go about implementing them.

- The `Melody` class is where all your code should go. It implements the `Melodic` interface. The fields, constructor, and `toString()` method are given.

- Test out the system first. you should be able to see the following when you run the main method:

  ```
  You are totally rocking MelodyPlayer!!! Type the word in the left column to do the action on the right
  load     : load a new input file
  save     : output to a file
  print    : prints the contents of the last loaded song
  play     : play the last loaded song
  reverse  : reverse the last loaded song
  duration : print out the length of the last loaded song in seconds
  tempo    : change the speed by a percentage
  append   : appends notes from a second melody to the loaded one
  quit     : exit the program

  > What would you like to do? load
  > File name? epona.txt

  > What would you like to do? print
  0.3 D 5 NATURAL true
  0.3 B 4 NATURAL false
  1.2 A 4 NATURAL true
  0.3 D 5 NATURAL false
  0.3 B 4 NATURAL false
  0.6 A 4 NATURAL false
  0.6 B 4 NATURAL false
  1.2 A 4 NATURAL false
  ```

- Write an initial version of `play()` that assumes there are no repeating sections. (We'll put in the code for repeated sections later). Test it out, and make sure the songs are now playing on your machine.

- Implement the `changeTempo()` method. You can check the results of the `changeTempo()` method by reading in one of the sample files, calling `changeTempo()` and then calling the `toString()` method and checking your output matches what you expected. If successful, you should be able to see the following:

  ```
  You are totally rocking MelodyPlayer!!! Type the word in the left column to do the action on the right
  load     : load a new input file
  save     : output to a file
  print    : prints the contents of the last loaded song
  play     : play the last loaded song
  reverse  : reverse the last loaded song
  duration : print out the length of the last loaded song in seconds
  tempo    : change the speed by a percentage
  append   : appends notes from a second melody to the loaded one
  quit     : exit the program

  > What would you like to do? load
  > File name? epona.txt

  > What would you like to do? print
  0.3 D 5 NATURAL true
  0.3 B 4 NATURAL false
  1.2 A 4 NATURAL true
  0.3 D 5 NATURAL false
  0.3 B 4 NATURAL false
  0.6 A 4 NATURAL false
  0.6 B 4 NATURAL false
  1.2 A 4 NATURAL false

  > What would you like to do? tempo
  > Percentage? 0.5

  > What would you like to do? print
  0.15 D 5 NATURAL true
  0.15 B 4 NATURAL false
  0.6 A 4 NATURAL true
  0.15 D 5 NATURAL false
  0.15 B 4 NATURAL false
  0.3 A 4 NATURAL false
  0.3 B 4 NATURAL false
  0.6 A 4 NATURAL false

  You are totally rocking MelodyPlayer!!! Type the word in the left column to do the action on the right
  load     : load a new input file
  save     : output to a file
  print    : prints the contents of the last loaded song
  play     : play the last loaded song
  reverse  : reverse the last loaded song
  duration : print out the length of the last loaded song in seconds
  tempo    : change the speed by a percentage
  append   : appends notes from a second melody to the loaded one
  quit     : exit the program

  > What would you like to do? tempo
  > Percentage? 4

  > What would you like to do? print
  0.6 D 5 NATURAL true
  0.6 B 4 NATURAL false
  2.4 A 4 NATURAL true
  0.6 D 5 NATURAL false
  0.6 B 4 NATURAL false
  1.2 A 4 NATURAL false
  1.2 B 4 NATURAL false
  2.4 A 4 NATURAL false
  ```

- Write the `append()` method. Then use a stack to implement the `reverse()` method!

  ```
  You are totally rocking MelodyPlayer!!! Type the word in the left column to do the action on the right
  load     : load a new input file
  save     : output to a file
  print    : prints the contents of the last loaded song
  play     : play the last loaded song
  reverse  : reverse the last loaded song
  duration : print out the length of the last loaded song in seconds
  tempo    : change the speed by a percentage
  append   : appends notes from a second melody to the loaded one
  quit     : exit the program
  > What would you like to do? load
  > File name? epona.txt

  > What would you like to do? print
  0.3 D 5 NATURAL true
  0.3 B 4 NATURAL false
  1.2 A 4 NATURAL true
  0.3 D 5 NATURAL false
  0.3 B 4 NATURAL false
  0.6 A 4 NATURAL false
  0.6 B 4 NATURAL false
  1.2 A 4 NATURAL false

  > What would you like to do? reverse
  > What would you like to do? print
  1.2 A 4 NATURAL false
  0.6 B 4 NATURAL false
  0.6 A 4 NATURAL false
  0.3 B 4 NATURAL false
  0.3 D 5 NATURAL false
  1.2 A 4 NATURAL true
  0.3 B 4 NATURAL false
  0.3 D 5 NATURAL true

  > What would you like to do? append
  > File name of second song? birthday.txt
  > What would you like to do? print
  1.2 A 4 NATURAL false
  0.6 B 4 NATURAL false
  0.6 A 4 NATURAL false
  0.3 B 4 NATURAL false
  0.3 D 5 NATURAL false
  1.2 A 4 NATURAL true
  0.3 B 4 NATURAL false
  0.3 D 5 NATURAL true
  0.25 D 4 NATURAL true
  0.25 D 4 NATURAL false
  0.5 E 4 NATURAL false
  0.5 D 4 NATURAL false
  0.5 G 4 NATURAL false
  1.0 F 4 SHARP false
  0.25 D 4 NATURAL false
  0.25 D 4 NATURAL false
  0.5 E 4 NATURAL false
  0.5 D 4 NATURAL false
  0.5 A 4 NATURAL false
  1.0 G 4 NATURAL false
  0.25 D 4 NATURAL false
  0.25 D 4 NATURAL false
  0.5 D 5 NATURAL false
  0.5 B 4 NATURAL false
  0.5 G 4 NATURAL false
  0.5 F 4 SHARP false
  1.0 E 4 NATURAL false
  0.25 C 5 NATURAL false
  0.25 C 5 NATURAL false
  0.5 B 4 NATURAL false
  0.5 G 4 NATURAL false
  0.5 A 4 NATURAL false
  1.5 G 4 NATURAL true
  ```

- Add the `play()` code that looks for repeated sections and plays them twice, as described previously. To do this, I would create a local Queue of notes within the method. Then queue up the Note segments that are to be repeated.

- Finally, add the `getDuration()` code. Remember that the repeated segments of the music needs to be accounted for. Here's an example:

  ```
  You are totally rocking MelodyPlayer!!! Type the word in the left column to do the action on the right
  load     : load a new input file
  save     : output to a file
  print    : prints the contents of the last loaded song
  play     : play the last loaded song
  reverse  : reverse the last loaded song
  duration : print out the length of the last loaded song in seconds
  tempo    : change the speed by a percentage
  append   : appends notes from a second melody to the loaded one
  quit     : exit the program
  > What would you like to do? load
  > File name? birthday.txt

  > What would you like to do? duration
  26.0 seconds long
  > What would you like to do? tempo
  > Percentage? 2

  > What would you like to do? duration
  52.0 seconds long

  > What would you like to do? append
  > File name of second song? birthday.txt

  > What would you like to do? duration
  78.0 seconds long
  ```

#### Part IV: Create your own song
Create a new file using a plain text editor (like Atom, or Notepad, or Sublime --- just not Word). Put it in the same folder as all your other songs. For full credit, the file should be in the format described above and contain at least 10 notes. It should also be your own work (you may not just turn in one of our sample songs) but you do not have to compose a song yourself. You are welcome to make it be a song written by somebody else, such as a lullaby or nursery rhyme or song by your favorite band.


#### Grading

```
This assignment will be graded out of 2 points, provided that:

- You were in attendance and on-time.
- Your classes are fully implemented.
```

#### Submitting Your Assignment
Follow these instructions to submit your work. You may submit as often as you'd like before the deadline. I will grade the most recent copy.

- Navigate to our course page on Canvas and click on the assignment to which you are submitting. Click on "Submit Assignment."

- Upload all the files ending in `.java` from your project folder.

- Click "Submit Assignment" again to upload it.

#### Credits

Based on a previous lab by Professor Henry Walker, Grinnell College.

#### Lab Attendance Policies

Attendance is required for lab. Unexcused absence = no credit even if you turned in the lab. Unexcused tardiness = half credit.
