## CS 261 - Computer Science II

### Lab 6: Finishing MyArrayList

In this lab, you will finish the `MyArrayList` implementation we started in class, and add a few more methods that aren't really part of the `List` interface. You'll also learn how to deal with generic typing (i.e., "diamond notation"). 


#### Objectives
- To understand the internal implementation of the `ArrayList` class.
- To practice declaring generic types.

#### Required Files
The following file(s) have been provided for this lab.
- [Lab_MyArrayList.zip](Lab_MyArrayList.zip)


#### Part I: Completing the MyArrayList Implementation
Download the project file and extract it into somewhere convenient. Open the project up in your preferred IDE, and you shall find a MyList interface and a class, `MyArrayList` that we've started implementing in class.

- Open up the `MyList` interface first. Surprise! There's a bunch of new abstract methods you need to implement (you're welcome!) They are: `lastIndexOf`, `removeRange`, `subList`, and `retainAll`. Yes, these abstract methods are also found in Java's standard `List` interface, so there's a point to implementing these! (In fact, there's even quite a bit more methods to write if we were to really implement the `List` standard interface.)

- Implement `int lastIndexOf(double item)` - searches for the specified item in the list and returns the last position in which it was found. If not found, return -1. When you're ready to test it, try out the following code example:

  ```java
  MyList list = new MyArrayList();
  list.add(3);
  list.add(5);
  list.add(7);
  list.add(9);
  list.add(11);
  list.add(13);
  list.add(3);

  System.out.println(list.toString());
  > [3.0, 5.0, 7.0, 9.0, 11.0, 13.0, 3.0]

  System.out.println(list.lastIndexOf(11));
  > 4

  System.out.println(list.lastIndexOf(3));
  > 6

  System.out.println(list.lastIndexOf(0));
  > -1
  ```

- Write `MyList subList(int fromIndex, int toIndex)` - Returns a view of the portion of this list between the specified `fromIndex` (inclusive), and `toIndex` (exclusive). Don't be confused by the fact that you should return a `MyList`. After all, `MyArrayList` is a `MyList`, so just instantiate and return another `MyArrayList` with the elements in the specified range. The contents of the current `MyArrayList` should remain unchanged after this call.

  ```java
  MyList list_A = new MyArrayList();
  list_A.add(10);
  list_A.add(20);
  list_A.add(30);
  list_A.add(40);
  list_A.add(50);
  list_A.add(60);
  System.out.println(list_A);
  > [10.0, 20.0, 30.0, 40.0, 50.0, 60.0]

  // gimme the last half of the list
  MyList list_C = list_A.subList(list_A.size()/2, list_A.size());
  System.out.println(list_C);
  > [40.0, 50.0, 60.0]

  // gimme the first half of the list
  MyList list_D = list_A.subList(0, list_A.size()/2);
  System.out.println(list_D);
  > [10.0, 20.0, 30.0]

  // original list remains unchanged
  System.out.println(list_A);
  > [10.0, 20.0, 30.0, 40.0, 50.0, 60.0]
  ```

- Write `void removeRange(int fromIndex, int toIndex)` - Removes from this list all of the elements whose index is between `fromIndex` (inclusive), and `toIndex` (exclusive). You should reuse the remove method. 

  ```java
  MyList list = new MyArrayList();
  list.add(3);
  list.add(5);
  list.add(7);
  list.add(9);
  list.add(11);
  list.add(13);
  list.add(3);

  System.out.println(list);
  > [3.0, 5.0, 7.0, 9.0, 11.0, 13.0, 3.0]

  list.removeRange(3,1);
  > Exception: java.lang.IllegalArgumentException (Range out of bounds: 3,1)

  list.removeRange(1,3);
  System.out.println(list);
  > [3.0, 9.0, 11.0, 13.0, 3.0]

  list.removeRange(1, list.size());
  System.out.println(list);
  > [3.0]
  ```

- Write `boolean equals(Object other)` - This method returns true if the current list is equivalent to the input list (yes, you have to down-cast `other` to a `MyArrayList` object first). For two lists to be equal, they must contain the same items in the same order. 

  ```java
  // Here's a list
  MyList list_A = new MyArrayList();
  list_A.add(1);
  list_A.add(2);
  list_A.add(2);
  list_A.add(1);

  // Here's another list
  MyList list_B = new MyArrayList();
  list_B.add(1);
  list_B.add(2);
  list_B.add(3);

  System.out.println(list_A.equals(list_B));
  > false

  list_A.removeRange(2,list_A.size());
  list_A.add(3);
  System.out.println(list_A.equals(list_B));
  > true
  ```

- Write `boolean retainAll(MyList list)` - Retains only the elements in this list that are contained in the specified list. This method returns `true` if changes were made to the current list and `false` otherwise. You should reuse the `remove()` method. 

  ```java
  // Here's a list
  MyList list_A = new MyArrayList();
  list_A.add(1);
  list_A.add(2);
  list_A.add(2);
  list_A.add(1);
  list_A.add(3);
  list_A.add(1);
  System.out.println(list_A);
  > [1.0, 2.0, 2.0, 1.0, 3.0, 1.0]

  // Here's a list of things to retain        
  MyList list_B = new MyArrayList();
  list_B.add(2);
  list_B.add(3);
  System.out.println(list_B);
  > [2.0, 3.0]

  list_A.retainAll(list_B);
  System.out.println(list_A);
  > [2.0, 2.0, 3.0]
  ```

- As always, test your code using various edge cases to ensure that everything works as expected!

#### Part II: Generic Typing
Now our `MyArrayList` now stores unlimited `doubles`, but they are supposed to be able to store any type of object. In this section we refactor our `MyArrayList` to accept generic types.

- First Copy and paste the following code directly into your `MyList` interface file, replacing what used to be there. All references to `double` have been replaced with `E`.

  ```java
   /**
    * An abbreviated List<E> interface
    *
    * @author David
    * @version 10/6/19
    */
    public interface MyList<E> {
        /**
        * Adds an item to the tail of the list
        * 
        * @param item the item to add
        * @return always return true
        */
        boolean add(E item);

        /**
        * Adds item to specified location in the list
        * 
        * @param index the position in which to add the item
        * @param item a new item to add
        * @return always return true
        * @throws ArrayIndexOutOfBoundsException if the given index is illegal
        */
        boolean add(int index, E item);

        /**
        * Gets the item at the specified index
        * 
        * @param index the item's position
        * @return the item
        * @throws ArrayIndexOutOfBoundsException if the given index is illegal
        */
        E get(int index);

        /**
        * Sets the position at the specified index to a new item
        * 
        * @param index the item's position
        * @param new_item the new item
        * @return a reference to the displaced item
        * @throws ArrayIndexOutOfBoundsException if the given index is illegal
        */
        E set(int index, E new_item);

        /**
        * Removes an item at the given position
        * 
        * @param index the index to the item to remove
        * @return a reference to the item that was removed
        * @throws ArrayIndexOutOfBoundsException if the given index is illegal
        */
        E remove(int index);

        /**
        * Removes an item from the list.
        * 
        * @param item a reference to the item to remove
        * @return true if successful, and false otherwise
        */
        boolean remove(E item);

        /**
        * @return current size of the list
        */
        int size();

        /**
        * Searches the list for the specified item
        * @param item the item to look for
        * @return the index of the first occurrence if found, -1 otherwise
        */
        int indexOf(E item);

        /**
        * @return string representation of the array list
        */
        @Override
        String toString();

        /**
        * Returns the index of the last occurrence of the specified element
        * in this list, or -1 if this list does not contain the element.
        * @param item the item to look for
        */
        int lastIndexOf(E item);

        /**
        * Returns a view of the portion of this list between the specified
        * fromIndex, inclusive, and toIndex, exclusive.
        * @param fromIndex first position of the sublist (inclusive)
        * @param toIndex last position of the sublist (exclusive)
        */
        MyList<E> subList(int fromIndex, int toIndex);

        /**
        * Removes from this list all of the elements whose index is between
        * fromIndex, inclusive, and toIndex, exclusive.
        * @param fromIndex first position of elements to remove (inclusive)
        * @param toIndex last position of element to remove (exclusive)
        * @throws IllegalArgumentException if either index is out of range
        */
        void removeRange(int fromIndex, int toIndex);

        /**
        * Retains only the elements in this list that are contained in 
        * the specified list.
        * @param list elements to retain in this list
        * @return true if any element is removed, and false otherwise
        */
        boolean retainAll(MyList<E> list);
    }
  ```

- Back in your `MyArrayList` class, you need to update the class header so that it accepts a generic type. We will name this type `E`. If you need a reminder on this syntax, click on the button below.

  ```java
  public class MyArrayList<E> implements MyList<E> {
    // ...
  }
  ```

- Refactoring the Instance Variables: Anywhere you make a reference to the old type of the stored data (it was an array of doubles), you must now replace its declaration with `E`. You see, once the user fills in `E` with a concrete type (like `String`, `Double`, `Integer`, `BasicDie`, etc.), Java plugs that into where ever `E` appears. If you need a reminder, click on the button.

  ```java
  public class MyArrayList<E> implements MyList<E> {
    private E[] the_data;  // an array of generic objects

    /** other code omitted */
  }
  ```

- Refactoring the Constructor: The constructor gives initial values to instance variables. In our case the generic array needs to be instantiated as an array of `Objects`. But as we know, the array of `Object`s is hardly an array of type `E`, and therefore we must type cast. Notice that there is no diamond notation in the signature of the constructor.

  ```java
  public MyArrayList(int init_cap) {
    this.capacity = init_cap;
    this.the_data = (E[]) new Object[init_cap]; //initiates the array of Objects
                                           //the cast to E[] is required
  }
  ```

- Refactoring the Remaining Code: Go through the remaining methods and replace any reference to the old data type to the generic type, `E`. This includes all return types, local variables, and input parameters. Important: One thing you need to pay attention to is anywhere you're testing for equivalence using `==` or `!=`. You had to use these operators when comparing `doubles`, but now you're comparing objects, and `==` and `!=` are no longer useful. Use the `equals()` method instead.

- Important! Testing: After you're done making all the changes, let's make sure things are working as we'd expect. Here's an example showing my list holding Doubles and Strings.

  ```java
  MyArrayList<Double> list_of_nums = new MyArrayList<>();
  list_of_nums.add(3.14);
  list_of_nums.add(2.718);
  System.out.println(list_of_nums.toString());
  > [3.14, 2.718]

  MyArrayList<String> list_of_names = new MyArrayList<>();
  list_of_names.add("Julie");
  list_of_names.add("Jill");
  list_of_names.add("Janice");
  System.out.println(list_of_names.indexOf("Jill"));
  > 1
  ```

#### Part III: Optional `List<E>` Methods
If you have time still, or just want some more practice, these methods below are also part of the standard `List<E>`.

- Write the method, `void addAll(int index, MyList<E> other)` that adds all elements in the input list to the specified position.

  - Now you should be able to write the method, `void addAll(MyList<E> other)` quite easily. This simply adds all elements in the input list to the end of the current list. 


- Write the method `void removeAll(MyList<E> list)` that removes all elements in the input list from the current list.

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

Written by David Chiu. 2023.

#### Lab Attendance Policies

Attendance is required for lab. Unexcused absence = no credit even if you turned in the lab. Unexcused tardiness = half credit.
