## CS 240 - Software Engineering

### In-Class Exercise: Vision and Personas

By this time, you might have a rough idea of what your term project will be, and it's useful to think about who might be using your product, and in what ways. In this exercise you will be working with your team to write the vision statement, personas, and scenarios for your software application. **This lab is meant to jumpstart the requirements needed for Project 1.**

#### Student Outcomes

- To practice the agile design process: vision statement, personas

#### Part 1 - Project Vision Statement

<!-- Before you can start thinking the types of users who will be interacting with your application, you and your group should first decide on _what_ app you'll be building. If you haven't already decided, then go here to [Project 1](../proj1.planning/) and use this time to work on the **Proposed Software Vision** section. -->

With your teammates, agree on a software application that you believe would be doable in 4-6 weeks of sustained team work. You’ll have just 1 individual homework assignment due in the meantime, and it's designed to hone the skills you’ll need to produce a workable product by finals week. As you define your project, keep in mind that other students' schedules and workloads vary. I want you to be cautiously ambitious – design what a minimal product release might look like by the end of the year, and build in some "reach features" for if you have extra time, or your team’s "velocity" is faster than anticipated. As always, communicate your ideas with me before running away with it, so that I can input suggestions.

Start by having one of your group members create a new Github project called `cs240-term-project` and clone it down to your machines.

Your group should work together to come up with a **project vision statement**. This statement should just be a short 1-2 paragraph summary of what your product does. You can use Moore's template, given below, and you can skip the `UNLIKE` and `OUR PRODUCT` statements.`

```
FOR (target customer)
WHO (statement of the need or opportunity)
THE (PRODUCT NAME) is a (product category)
THAT (key benefit, compelling reason to buy)
UNLIKE (primary competitive alternative)   <----- optional
OUR PRODUCT  (statement of primary differentiation) <----- optional
```

Here's the example I showed you in class for an educational tool:

```
Product vision for iLearn

FOR teachers and educators WHO need a way to help students use web-based learning resources and applications, THE iLearn system is an open learning environment THAT allows the set of resources used by classes and students to be easily configured for these students and classes by teachers themselves. UNLIKE Virtual Learning Environments, such as Moodle, the focus of iLearn is the learning process rather than the administration and management of materials, assessments and coursework. OUR product enables teachers to create subject and age-specific environments for their students using any web-based resources, such as videos, simulations and written materials that are appropriate.

Schools and universities are the target customers for the iLearn system as it will significantly improve the learning experience of students at relatively low cost. It will collect and process learner analytics that will reduce the costs of progress tracking and reporting.
```

<!-- (In the real world, you’d be justifying what makes your product unique on the market, but we’ll skip that part.) Here are a couple resources that helps you write your vision statement:

https://280group.com/what-is-product-management/skills/product-vision/
https://www.productboard.com/blog/write-product-vision/ -->

Write the vision statement together, and put it in a file named `README.md`. Remember to push it up to Github when you’re done. If you refresh your Github project page, it should now display the vision statement directly within the page.

The vision statement must be written before moving on to defining your personas and scenarios. You are therefore expected to continue working on finishing this lab on your own time. **Work on your term project starts now!**

#### Part 2 - Writing Personas

- You may or may not get to this point in the in-class lab, but after you've agreed on a Vision Statement, we need to start defining potential users.

- Think about all the various **types of users** who might use your software, and choose one to write up. A paragraph or two ought to suffice). Personas could be imagined, or they might be representative of potential users that you surveyed/polled. Whichever the case, personas should be based on an understanding of the potential product users, their jobs, their background and their aspirations.

- Here are all the elements you should include for each persona:

  - Details of their education and experience
  - Details of the individual's job
  - Personal information about the user (personalization)
  - Details of their interest in the product (relevance)

- Here is an example of a persona we saw in lecture for the iLearn system:

  ```
  Elena, a school IT technician

  Elena, age 28, is a senior IT technician in a large secondary school (high school) in Glasgow with
  over 2000 students. Originally from Poland, she has a diploma in electronics from Potsdam University.
  She moved to Scotland in 2011 after being unemployed for a year after graduation. She has a Scottish
  partner, no children, and hopes to develop her career in Scotland. She was originally appointed as a
  junior technician but was promoted, in 2014,  to a senior post responsible for all the school computers.

  Although not involved directly in teaching, Elena is often called on to help in computer science
  classes. She is a competent Python programmer and is a ‘power user’ of digital technologies. She has a
  long-term career goal of becoming a technical expert in digital learning technologies and being
  involved in their development. She wants to become an expert in the iLearn system and sees it as an
  experimental platform for supporting new uses for digital learning.
  ```

- I don't have a preference for the format of your document, so feel free to use plaintext `.txt`, or a `.doc`, or a `.pdf` for your persona.

- **Note on continued work:** After lab is finished, you and your team should continue to define the remaining personas and scenarios. Each persona should be involved in several scenarios. Your work outside on this outside of class is crucial to the success of your project.
