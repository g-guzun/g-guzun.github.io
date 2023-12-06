## CS 240 - Software Engineering

### In-Class Exercise: DOM and Event Handling (~65min)

In this exercise you will get some practice working with DOM elements. This exercise assumes that you are familiar with using objects and callbacks.

#### Student Outcomes

- Learn how to query for certain DOM elements
- Learn how to manage event listeners
- Access the `event` object in the event-handler callback

#### Solution/Demo

You can always see my solution by loading the demo, right clicking anywhere on the page and displaying the source. Then click on the link to my `.js` file(s).

- [Link to Demo](demo/)

#### Instructions

- Open a terminal and navigate to your directory for this course. Then clone a copy of the starter files:

```
git clone https://github.com/davidtchiu/cs240-lab-grocery
```

- Note that do not need to make changes to the `index.html` file for this lab, but study both files you just pasted to get a sense of what's in there. In the HTML file, there is an input field, but curiously, no "submit" button. There's also an un-ordered list `<ul>` that doesn't have any items in it, so it's not showing up on the page. Right-click on `index.html` on the left-hand panel, and choose `Open with Live Server`.

- Type in some grocery items and press enter. You should see them accumulating in a list under the input field.

<!-- - Try typing a grocery item in the input box and hitting enter. You should see no effect, but what _should_ happen is that the item you just input should show up in the ordered list. To do that, we need to listen for events to occur in the input field! -->

<!-- - Create a new file, `app.js`.

  - Write some code to attach an event handler to the `<input>` field, but recall that you have to capture (or _select_) it first.

  - After the input field has been selected, we can attach an event listener as follows:

    ```javascript
    node.addEventListener("eventType", function (evt) {
      // code goes here when eventName fires!
      // << your code goes here>>
    });
    ```

  where `node` is the variable name that references your input field. Find the appropriate `eventType` we should be listening to on the cheatsheet I handed out (also linked at the top of this page). Finally, write the code for the unnamed callback function directly in the space I provided in the comments above. Here's what you'll need to do:

  - Check the `evt` event object that is passed automatically by JavaScript to see what key was pressed. You're interested seeing if the user pressed the "Enter" key.

  - If it's not the enter key, do nothing, but if it is, you need to take the contents in the input field and transfer it to the end of the un-ordered list! The HTML you want JS to generate is

    ```html
    <li>
      <span>item name</span>
    </li>
    ```

    That means you'll need to create a new `li` node, and a new `span` node using

    ```js
    let node = document.createElement("elementName");
    ```

    Put the string in between the `span` tags by storing to its `.innerHTML` property. The `span` tag should then be appended to the `li` node, which in turn is appended to the unordered list.

  - If you coded this right, then the input item should show up in the list every time you press enter. Test this now, and do not move on until finished. -->

#### Part 1: Crossing out Items

- Adding things to the grocery list is a great reminder of what you'll need when you're there, but you should also have a way to <del>cross things out</del> that you've put in your shopping cart!

- Modify the existing event handler code so that it _also_ adds a checkbox to the left of the item name. In HTML, a checkbox can be formed using:

  ```html
  <input type="checkbox" name="varName" />
  ```

  so you'll need to use `document.createElement(..)` to create an `input` node. Store the string `"checkbox"` to its `type` attribute. _Insert_ this new `<input>` node _before_ the `<span>` node under the parent list-item node. If you did this correctly, you should see something like the following:
  <div style="background-color: #ffffff">
  <ul>
    <li><input type="checkbox" name="ex"/><span>Grapes</span></li>
  </ul>
  </div>

- Finally, we want it so that, when the checkbox next to the item is selected, the item is <span style="color: 'grey';"> greyed out</span> and <span style="text-decoration: line-through">crossed out</a>!

  - This sounds like a good opportunity to add a new `.class` of style in your CSS file. Call this CSS class `.itemChecked` and change the font color to gray and add a property to strikethrough the text.

  - Next, you need to write another event listener to listen to _all_ the checkboxes. But remember to select only the checkboxes and not the text input box, as they're both `<input>` elements!

    - To do this, recall that `document.querySelector(pattern)` accept a CSS selector pattern. Therefore, you need to figure out the CSS pattern to select all the `input`s that have a `type` attribute value of "checkbox."

  - Once selected, loop through each checkbox and add an event listener to it.

    - These event listeners should listen for the "change" event type. When it fires, you should tell the associated list item (which is the checkbox's sibling) add the `.itemChecked` style to its CSS class list -- this is stored as the node's `classList` property.

    - If this works, you should now be seeing something like:
      <div style="background-color: #ffffff">
      <ul>
        <li><input type="checkbox" checked="checked" name="ex"/><span style="text-decoration: line-through; color: gray">Grapes</span></li>
      </ul>
      </div>

      - Unchecking the box should return that item to its original format.

#### Part 2: Ordering and Managing Duplicates

- One rather annoying issue is that duplicates are allowed. It was suggested to you that, when the list gets longer, it's harder to know that a grocery item is already on the list, because it's not sorted in any way. Modify your "add to list" event listener so that it inserts the items to the list in alphabetical order. (So you don't need to `sort()` anything.)

- Still, people make mistakes. Write the necessary code to first test if the input item is already on the list. Don't add it to the list if that's the case. (Or even better, you can store and increment the quantity of that item.)
