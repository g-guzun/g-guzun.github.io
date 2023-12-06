## CS 455 - Principles of Database Systems

### Hwk: FD Set Closure and Armstrong's Axioms
In this assignment you will implement algorithms that we've been learning in the DB theory lectures. Specifically, you will implement methods to find the FD set closure, attribute set closure, and BCNF decomposition.


#### Student Outcomes

- To gain insight into the fundamentals and algorithms of relational design theory


#### Starter Code

Starter code for this assignment is provided on the github repo. You are not required to submit your code to me via Github.

- The starter code is provided here [https://github.com/davidtchiu/cs455-hwk-fdclosure](https://github.com/davidtchiu/cs455-hwk-fdclosure). Choose to **fork** this repository over to your github account to obtain your own copy. Copy the Github URL to _your_ newly forked project.

-  Clone **your** forked Github repo down to your local working directory using:

  ```
  git clone <your-github-url-for-this-project>
  ```

#### Preliminary
You will need to be familiar with [Java's Set interface](https://docs.oracle.com/javase/7/docs/api/java/util/Set.html). Know how to take a set union, intersection, difference, and how to iterate through Sets. **You must write this program in Java.** I've provided skeleton code for you to implement. 

Also, it's imperative for this assignment that you're careful about avoiding side-effects: All of the static methods you need to write must **not** alter the contents of the input structures. I have provided a **copy constructor**  in both `FD` and `FDSet` for this purpose. For instance:

```java
public static method(FD originalFDset) {
  FDSet badcopy = originalFDset;  // No!!! badcopy simply points to the input.
                                  // Any changes to badcopy will cause side effects.
                                  
  FDSet truecopy = new FD(originalFDset);   // Yes! Creates a deep copy of originalFDset
}
```
  
Note that Java's HashSet and TreeSet classes also provide copy constructors! Use them where applicable.
  


#### Program Requirements

For this assignment, you're welcome to add as many other helper methods as you need (and you will need to write several helper methods!). Don't worry about the efficiency of these algorithms -- just focus on correctness.

1. Open up the `FD` class, which models a functional dependency. This class has already been completed for you, but it's worth reading through it to understand its interface, and how I chose to model it. Of particular note:

    - An `FD` has an attribute set on the left and on the right. The left-hand side attribute set determines the right-hand side.

    - An attribute set is just a set of Strings (that is `Set<String>`). I used the slightly slower `TreeSet` in my implementation just to order the attribute names when they're printed. (Easier on the eyes when grading.)

    - There are two ways of constructing an `FD` object. The first way accepts the left and right attribute sets as Lists. Another way accepts them as Sets.

    - For instance, $$AD \rightarrow B$$ can be constructed using:

        ```java
        Set<String> left = new TreeSet<>();
        left.add("A");
        left.add("D");

        Set<String> right = new TreeSet<>();
        right.add("B")
        
        FD fd = new FD(left, right);
        ```
        or simply,
        ```java
        FD fd = new FD(Arrays.asList("A", "D"), Arrays.asList("B"));
        ```

    - Do not make any changes to this class.

2. Next, open up the `FDSet` class, which contains a set of FDs. Again this class has been completed for you. It's really just a wrapper class I wrote to make my grading-life easier. Read it over, but do not make any changes to this class.

3. Now open the `FDUtil` class, and implement the following static methods:

    - `powerSet(Set<E> inputSet)` -- This method returns the power set of the given set, so it returns a set of sets. Recall that the power set of $$S$$ is all subsets of $$S$$, including the empty set. You'll want to write this method recursively. Here's a hint. The base case is reached when the `inputSet` is empty, and you'll want to return a new set containing an empty set. Otherwise, remove an element from the `inputSet`, and call `powerSet` recursively to obtain the power set of the remaining elements. Then iterate through the returned power set. Create a copy of each set and union the removed element with each copy. Add each copy to the set of sets, and return it.

      For instance, say `[A,B]` was input. Your algorithm would remove `A`, and call `powerSet` on `[B]`, which would in turn remove `B` and call `powerSet` on an empty set `[]`, reaching the base case. This causes `[[]]` (a set containing the empty set) to be returned. Your algorithm iterates through `[[]]` and unions `B` with the lone element `[]` to produce `[[], [B}]`. That's returned and the algorithm unions `A` with both elements to finally produce `[[], [A], [B], [A,B]]`.

      ```java
      Set<String> s = new TreeSet<>();
      s.add("A");
      s.add("B");
      s.add("C");
      System.out.println(FDUtil.powerSet(s));
      ```
      ```
      [[], [A], [B], [C], [A, B], [A, C], [B, C], [A, B, C]]
      ```

    - `trivial(FDSet fdset)` -- This method accepts a set of FDs and returns a new set of trivial FD stemming from the input set. Recall the trivial rule specifies that any subset of the left-side attributes can be (trivially) determined by the left-side attributes. Essentially, for each FD $$\alpha\rightarrow \beta$$ in the input set, find all subsets $$\gamma \subseteq \alpha$$. Then generate a new FD $$\alpha \rightarrow \gamma$$. Here's an example output for $$F = \{A \rightarrow B, AB \rightarrow C\}$$:

      ```java
      FD f1 = new FD(Arrays.asList("A"), Arrays.asList("B"));       // A --> B
      FD f2 = new FD(Arrays.asList("A", "B"), Arrays.asList("C"));  // AB --> C
      FDSet fdset = new FDSet(f1, f2);
      System.out.println(FDUtil.trivial(fdset));
      ```
      ```
      [
        A --> A       // This comes from f1, since A is a subset of A
        AB --> A      // This comes from f2, since A is a subset of AB
        AB --> B      // This comes from f2, since B is a subset of AB
        AB --> AB     // This comes from f2, since AB is a subset of AB
      ]
      ```

    - `augment(FDSet fdset, Set<String> attrs)` -- This method returns a new set of FDs generated by combining both sides of each FD  with the given set of attributes `attrs`. Here's an example output for $$F = \{A \rightarrow B, AB \rightarrow C\}$$ augmented with attribute set $$\{C\}$$:

      ```java
      FD f1 = new FD(Arrays.asList("A"), Arrays.asList("B"));       // A --> B
      FD f2 = new FD(Arrays.asList("A", "B"), Arrays.asList("C"));  // AB --> C
      FDSet fdset = new FDSet(f1, f2);

      // We want to augment with C
      Set<String> attrs = new HashSet<>(Arrays.asList("C"));
      System.out.println(FDUtil.augment(fdset, attrs));
      ```
      ```
      [
        AC --> BC
        ABC --> C
      ]
      ```

    - `transitive(FDSet fdset)` -- This method returns a new set of FDs after *repeatedly* applying the transitive rule until no more new FDs are detected. Here's an example output for $$F = \{A \rightarrow AB, AB \rightarrow C, C \rightarrow D\}$$:

      ```java
      FD f1 = new FD(Arrays.asList("A"), Arrays.asList("A", "B")); // A --> AB
      FD f2 = new FD(Arrays.asList("A", "B"), Arrays.asList("C")); // AB --> C
      FD f3 = new FD(Arrays.asList("C"), Arrays.asList("D")); // C --> D
      FDSet fdset = new FDSet(f1, f2, f3);
      System.out.println(FDUtil.transitive(fdset));
      ```
      ```
      [
        A --> C     // This comes from A --> AB and AB --> C
        A --> D     // This comes from A --> C and C --> D
        AB --> D    // This comes from AB --> C and C --> D
      ]
      ```
      Take particular note of the fact that $$A \rightarrow D$$ (via $$A\rightarrow C$$ and $$C \rightarrow D$$) is also generated, even though it took an iteration to first generate $$A \rightarrow C$$. Therefore, this method is exhaustive.

      Here's another example:
      ```java
      FD f1 = new FD(Arrays.asList("A"), Arrays.asList("C", "B")); // A --> CB
      FD f2 = new FD(Arrays.asList("C"), Arrays.asList("D", "E")); // C --> DE
      FDSet fdset = new FDSet(f1, f2);
      System.out.println(FDUtil.transitive(fdset));
      ```
      ```
      [
        A --> DE     // This comes from A --> CB and C --> DE
      ]
      ```
    - Finally, `fdSetClosure(FDSet fdset)` -- This method accepts a set of FDs and returns its closure, i.e., the full set of FDs generated through the repeated applications of Armstrong's Axioms. You can find the full algorithm in the notes or in the book, but I'll summarize it here:
  
      ```
      Input: F, a set of functional dependencies

      F+ = Copy of F
      Repeat:
        // augmentation
        Get the set of attributes that appear in F
        Union all subsets of these attributes to both sides of all FDs in F+
        Add these augmented FDs to F+

        // trivial
        Find all trivial FDs in F+ and add them to F+

        // transitivity
        Find all transitive FDs in F+ and add them to F+
      Until no change to F+
      return F+
      ``` 
    
      The example below shows the FD set closure for $$F = \{A \rightarrow B, AB \rightarrow C\}$$:


      ```java
      FD f1 = new FD(Arrays.asList("A"), Arrays.asList("B"));       // A --> B
      FD f2 = new FD(Arrays.asList("A", "B"), Arrays.asList("C"));  // AB --> C
      FDSet fdset = new FDSet(f1, f2);
      System.out.println(FDUtil.fdSetClosure(fdset));
      ```
      ```
      [
        A --> A
        A --> B
        A --> C
        A --> AB
        A --> AC
        A --> BC
        A --> ABC
        AB --> A
        AB --> B
        AB --> C
        AB --> AB
        AB --> AC
        AB --> BC
        AB --> ABC
        AC --> A
        AC --> B
        AC --> C
        AC --> AB
        AC --> AC
        AC --> BC
        AC --> ABC
        ABC --> A
        ABC --> B
        ABC --> C
        ABC --> AB
        ABC --> AC
        ABC --> BC
        ABC --> ABC
      ]
      ```

4. Once you have FD Set Closure working, you should be able to test the equality between two FD sets. Recall that two FD sets are equal iff their closures are equal. There's nothing you need to do here, except  to try out more test cases in order to verify that the equals method works as intended.

    ```java
    // One FD Set = A --> AB, AB --> C
    FD f1 = new FD(Arrays.asList("A"), Arrays.asList("A", "B")); // A --> AB
    FD f2 = new FD(Arrays.asList("A", "B"), Arrays.asList("C")); // AB --> C
    FDSet fdset = new FDSet(f1, f2);

    // Another FD set: AB --> B, A --> BC, AB --> C
    FD g1 = new FD(Arrays.asList("A", "B"), Arrays.asList("B")); // AB --> B
    FD g2 = new FD(Arrays.asList("A"), Arrays.asList("C", "B")); // A --> BC
    FD g3 = new FD(Arrays.asList("A", "B"), Arrays.asList("C")); // AB --> C
    FDSet fdset2 = new FDSet(g1, g2, g3);

    // Test FD equality: fdset and gdset are equal iff their closures are equal
    System.out.println("Equals? " + (fdset.equals(fdset2)));
    ```
    
  The above test case should return `true`.

#### Grading

```
This assignment will be graded out of 65 points.

[10pts] Trivial rule

[10pts] Augmentation rule

[15pts] Transitivity rule. Must be exhaustive (i.e., repeatedly apply
transitivity until there is no change.)

[20pts] Implementation of the FD Set closure algorithm

[10pts] Immutability: None of the methods should modify the content of 
any input structure. (No side effects -- use copy constructors!)

[Misc] Your program must be written in Java. Non-Java programs will be returned
       without a grade.
```

#### Submitting Your Assignment

After you have completed the homework, use the following to submit your work on Canvas. There are two options to submit your work.

1. If you pushed all your code to a Github repository. Make sure your repo is public, and simply submit the URL to your repo on Canvas.
2. Alternatively, you can zip up all your files (minus the `.class` files) and submit the `.zip` file on Canvas.
3. You may submit as often as you'd like before the deadline. I will grade the most recent copy.

#### Credits

Written by David Chiu. 2022.
