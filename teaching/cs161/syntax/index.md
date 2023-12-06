## CS 161 - Intro to Computer Science

### Java Syntax Cheat Sheet

#### Lecture 1

Java syntax was not emphasized in this lecture. It focuses more on CS as a discipline, and what computers and algorithms can actually do.

#### Lecture 2a

##### Comments

Comments let us markup and annotate the code to describe what it's doing to ourselves, or to future programmers. Comments are ignored by the compiler.

- Line comment

  ```java
  // This is a line comment
  ```

- Block (multi-line) comment

  ```java
  /*
  This is a multi-line comment. It's
  usually used to describe larger segments
  of code below it.
  */
  ```

- Javadocs comments

  ```java
  /**
   * Javadocs comments are also multi-line. They are
   * used to describe classes, constructors,
   * and methods.
   *
   * They use @tags like @param, @author, @return, etc.
   */
  ```

  Example

  ```java
  /**
   * This method returns the larger of the two inputs.
   * @param x First number
   * @param y Second number
   * @return The larger of x and y
   */
  public double max(double x, double y) {
    if (x > y) {
      return x;
    }
    return y;
  }
  ```

##### Class Definition

Classes define cookie cutters for making objects of its type. For instance, the `Circle` **class** that we've been working with can be used to create any number of `Circle`s that we can then use and manipulate however we like.

```java
/**
 * This class represents a ...
 * @author David, Michelle
 */
public class ClassName {
  // field(s) go first

  // constructor(s) go next

  // method(s) go last
}
```

Class names are conventionally capitalized, like `String` and `Circle` and `Square`, etc.

##### Fields (Instance Variables)

Each field, or instance variable, stores a "property" for an instance of the class. For example, a Ticket Machine has to remember its "ticket price" among other properties.

```java
private dataType fieldName;
```

where `dataType` is any primitive (`int`, `double`, `boolean`, ...) or class name (`String`, `Circle`, ...)

- Example: Maybe you're writing a "student" class that needs to remember a first and last name.

  ```java
  private String firstName;
  private String lastName;
  ```

##### Constructors

A constructor is code that is run when an instance of the class is created. Generally, the code inside the constructor assigns initial values for all the fields defined in the class.

```java
public ClassName(param1, param2, ...) {
  // assign values to fields
  this.field1 = expression1;
  this.field2 = expression2;
}
```

where `ClassName` is the name of the class that the constructor is written for. The input parameters `param1`, `param2`, and so on, can be used to accept inputs, and are entirely optional. When a constructor does not accept any input parameters, it is called the **default constructor**.

- Fields can be accessed using the `this.fieldName` syntax.

- Example default constructor:

  ```java
  public Circle() {
    this.xCoord = 100;
    this.yCoord = 200;
    this.diameter = 30;
    this.color = "blue";
    this.isVisible = false;
    this.area = 3.14159 * (diameter/2.0) * (diameter/2.0);
  }
  ```

- Example constructor with input parameters:
  ```java
  public Circle(int x, int y) {
    this.xCoord = x;
    this.yCoord = y;
    this.diameter = 30;
    this.color = "blue";
    this.isVisible = false;
    this.area = 3.14159 * (diameter/2.0) * (diameter/2.0);
  }
  ```

##### Methods

Methods are actions that an object can _do_.

```java
public returnType methodName(param1, param2, ...) {
  // things this method will do
}
```

where `returnType` is the data type of the values this method `return`s. If this method does not need to `return` a value, the `returnType` must be labeled `void`.

- Example

  ```java
  public double getArea() {
    return this.width * this.length;
  }
  ```

- Example (no return)

  ```java
  public void printMyName() {
    System.out.println("David Chiu");
  }
  ```

#### Lecture 2b

##### Boolean Statements and Comparison Operators

Boolean statements are expressions that can only evaluate to a `true` or a `false`. Comparison operators below are often used to evaluate into boolean value.

- Common comparison operators include:

  - `expression1 == expression2` evaluates to `true` when `expression1` is equal to `expression2` and `false` otherwise.
  - `expression1 != expression2` evaluates to `true` when `expression1` is not equal to `expression2` and `false` otherwise.
  - `expression1 > expression2` evaluates to `true` when `expression1` is strictly greater than to `expression2` and `false` otherwise.
  - `expression1 < expression2` evaluates to `true` when `expression1` is strictly less than to `expression2` and `false` otherwise.
  - `expression1 >= expression2` evaluates to `true` when `expression1` is greater than equal to `expression2` and `false` otherwise.
  - `expression1 <= expression2` evaluates to `true` when `expression1` is less than equal to `expression2` and `false` otherwise.

- Example:
  ```java
  // sets isLarge to true if the radius is strictly greater than 100
  boolean isLarge = this.diameter/2.0 > 100;
  ```

##### Conditionals

Conditional statements allow us to make decisions in our code.

- If-Then statements:

  ```java
  if (bool) {
    // things to do if the boolean condition was true
  }
  // things done no matter what
  ```

- If-then-else statements:

  ```java
  if (bool) {
    // things to do if the boolean statement was true
  }
  else {
    // things to do if the boolean statement was false
  }
  // things done no matter what
  ```

- Else-if statements:
  ```java
  if (bool1) {
    // things to do if the boolean statement was true
  }
  else if (bool2) {
    // things to do only if the above boolean was false
    // and if boolean statement 2 was true
  }
  else if (bool3) {
    // things to do only if both the above boolean statements were false
    // and if boolean statement 3 was true
  }
  else {
    // things to do if all of the above condition were false
  }
  // things done no matter what
  ```
