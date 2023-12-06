## CS 240 - Software Engineering

### In-Class Exercise: AJAX Lab (~45min)

Dogs are pretty cool, and we can't get enough of their cute pictures. The good folks at [https://dog.ceo/](https://dog.ceo/) offer a free web service API to let us retrieve random pictures of dogs to make us happy. Let's write a small app to let users retrieve random dog pictures.

#### Student Outcomes

- Learn the newer JS syntax for dealing with Promises: async/await
- Learn AJAX through the Axios library

#### Solution/Demo

You can always see my solution by loading the demo, right clicking anywhere on the page and displaying the source. Then click on the link to my `.js` file(s).

- [Link to Demo](demo/)

#### Instructions

- Open a terminal and navigate to your directory for this course. Then clone a copy of the starter files:

```
git clone https://github.com/davidtchiu/cs240-lab-ajax
```

-You do not need to make changes to the `index.html` or the CSS file for this lab, but study the files you just pasted to get a sense of what's in there. There's a drop down menu that's empty.. you'll need to fill this in with all the different breeds of dogs later.

##### Dog Breeds

- Here's the [documentation](https://dog.ceo/dog-api/documentation/) for the dog.ceo Web API. Make sure you go through all the endpoints so you know what you have at your disposal. The documentation does a good job telling you what data to expect from their server in response. Looks like everything will be coming in as JSON.

- First thing you need to do is to retrieve the full list of dog breeds from their API. You can ignore the sub-breeds (for instance, "hound" -> "bassett"). You may recall that the way to make an HTTP GET request is done through the axios library:

  ```js
  let response = await axios.get(endpointURL);
  ```

  Recall that, to use the `await` keyword, it must be wrapped inside an `async` function. If successful, the JSON "payload" can be accessed through returned Promise object's `.data` property.

<!-- - After receiving the list of breeds in a JSON formatted string, you need to _parse_ it into a JavaScript object. The function to do that is:

  ```js
  let obj = JSON.parse(someJsonString);
  ``` -->

- I would test it out and display the object in the console to see what you're working with. Then fill the drop-down menu with all those breeds. You'll have to `document.querySelector(..)` the drop-down menu, and append a bunch of `<option>` nodes under it. Use the `document.createElement(..)` function to create an `<option>` per breed. For example, an option node should have this effect:

  ```html
  <option value="akita">akita</option>
  ```

  Verify that your drop-down is now populating on page load.

##### Dog Pics

- Write the code so that when the user presses the "Fetch" (get it?) button, it now retrieves an a dog image of the selected breed from the Web API. You'll need to figure out which endpoint to target. Once you receive the image payload back, which is just a URL to a random image, you just need to create an `<img>` node, setting `src` to the received URL. Display the image anywhere on your webpage!

  - Recall that the syntax to attach a "click" event listener to an element is:

  ```js
  buttonNode.addEventListener("click", function () {
    // stuff you want to do when button is clicked
  });
  ```

  - One problem you'll likely run into is that your event listener is likely not going to work. The reason is because you need to have the listener code `await` for the image URL to come back to you from the dog.ceo server.

  - You should recall that the `await` keyword can only be used inside an `async` function. Therefore, you just need to prepend the `async` keyword to the unnamed function. (It also works with arrow notation).
