## CS 161 - Intro to Computer Science

### Lab: Super Circle Drawer

At a recent cocktail party, David introduces you to his close friend Professor Pacman, world-renowned eater of ghosts and connoisseur of all things circular. He talked you up, and totally gushed about all the great programs you've written for him this semester. It turns out that Professor Pacman has been looking to hire someone to write a program to help manage their insane Circle collection. It piqued their interest when it was mentioned that you've dabbled with `CircleDrawers` in the past.

Professor Pacman has requested that you implement a new and improved version of `CircleDrawer` that can track an unlimited number of Circles instead of just two. The collection of Circles can be made visible or invisible, moved around the screen as a group, etc. With `ArrayLists` fresh in your head, you agree to the project...

<img width="25%" src="figures/profpacman.png"/>

#### Student Outcomes

- To manage objects with ArrayLists

#### Required Files

The following file(s) have been provided for this homework.

- [Lab8_SuperCircleDrawer.zip](Lab8_SuperCircleDrawer.zip)

#### Helpful APIs

The API handout that you'll want to have in front of you:

- [ArrayList](../api/ArrayListAPI.pdf)
- [Circle](../api/CircleAPI.pdf)
- [Random](../api/RandomAPI.pdf)

#### Instructions

I've created a new project to get you started. Please download and modify `SuperCircleDrawer` instead of creating a new project via BlueJ, otherwise you won't be able to submit the assignment when you're finished. Note: The new project contains the Circle class (with the `getDiameter()` getter method), and a version of the canvas with a larger drawing area. Your `SuperCircleDrawer` class should abide by the following:

- It should contain a collection of `Circles`. Define an instance variable for the `ArrayList` that will be used to hold all of the `Circle` objects.

- A constructor that inputs an integer argument `numCircles`, the number of `Circles` to add to the initial collection. Then instantiate the `ArrayList` and populate it with `numCircles` circles. Each circle you create and insert into the collection should have a random diameter (from 1 to 100) and a random x and y position. The coordinates should be within the dimensions of the canvas, which is 800 (Width) by 600 (Height). Note the new `moveTo(..)` method that has been provided to circles can be used here.

- An `addCircle(...)` method that takes a single Circle object for input, adds the given circle to the collection, and draws it on the canvas.

- A `drawCircles()` method that takes no arguments, and causes all of the circles in the ArrayList collection to be drawn on the canvas.

- An `eraseCircles()` method that takes no arguments, and erases all of the circles in the collection from the canvas. These circles should not be removed from the list.

- An overloaded `eraseCircles(..)` method that inputs a diameter argument. This method should erase all circles from the canvas that are smaller in size than the given diameter.

- A method called `removeSmallest()` that takes no input arguments. This method identifies the smallest circle in the collection and removes it (don't forget to erase it from the canvas first!). In the case of a tie, just remove any one of them.

- A method called `replace(..)` that takes two arguments circle arguments, `c1` and `c2`. This method should search for `c1` in the collection, and replace it with the circle `c2` in its place. You will want to look into the `indexOf()` and the `set(..)` methods for `ArrayLists`. Don't forget to erase `c1` off the canvas before replacing it! If `c1` doesn't exist, then no action shall be taken.

- A method called `replaceLargest(..)` that takes as argument a circle object. This method identifies the largest circle in the collection and replaces it with the given circle in its place. In the event of a tie, you are to only replace any one of them. You are reminded to re-use any relevant methods to minimize code duplication.

#### Optional Extensions

Got some extra time? Do the following extensions:

- `drawLargeCircles()` method will draw all Circles in the collection that have a diameter greater than 30, and hide all others.

- A method called `doubleDiameters()` that takes no arguments and causes all circles in the collection to double in size.

- A method called `drawExtremeCircles()` that takes no arguments and causes only the largest and smallest circles in the collection to be drawn. In the case of a tie in either case, it doesn't matter which one of the circles you draw, but you should only draw one. All other circles should be hidden.

#### Grading

```
 This assignment will be graded out of a total of 10pts.

    The default constructor initializes the ArrayList.
    addCircle() method will append a Circle object to the end of the collection.
    drawCircles() and eraseCircles() methods will make all Circles that are stored in the collection visible or invisible, respectively.
    removeSmallest() will delete the smallest circle from the collection (and erase it from the canvas).
    replace() will replace the largest circle with a given replacement in its place.
    replaceLargest() will replace the largest circle with a given replacement in its place.
    You re-use code whenever possible.
    You provide Javadocs style comments for any new methods implemented.
    You include sufficient inline comments to explain the logic of your methods.
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
