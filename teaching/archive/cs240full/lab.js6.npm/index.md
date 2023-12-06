## CS 240 - Software Engineering

### In-Class Exercise: Node.js and npm Lab (~30min)

Node.js decouples JavaScript from the browser, so we can run it anywhere. One of the cool utilities that Node comes with is something called the Node Package Manager (`npm`). The `npm` allows us to download and install useful 3rd-party packages as part of our project. Let's do a quick lab on this stuff.

#### Student Outcomes

- Learn how to manage and use multiple packages through npm.
- More practice with Ajax and async execution.

#### Solution

There is no link to a demo, since there's no HTML page for this project. Instead, you should fork and clone a copy of my solution. Navigate to the project directory and first run `npm install` to download its dependency packages. Then run `node app.js` to run my script.

- [Link to Solution](https://github.com/davidtchiu/cs240-lab-js6.npm-soln)

#### Prerequisites

- This lab assumes that you have already installed [Node.js](https://nodejs.org/en/download/). If you haven't, please do so now.

#### Instructions

- There are no starter files for this lab. Open VS Code and start a new project named `cs240-node-lab`.

- Create a file `app.js`. This should be the only file you need. (Since we're decoupling our code from the browser, you won't need an html or css file for what we plan to do).

  - Print `hello world` out on the console and save the file.
  - Next, open the terminal, and navigate into the new project directory.
  - Run your code right on the terminal using the shell command `node app.js`. You should see the message printed on the terminal. If you don't get `hello world` printed on the terminal, let me know.

- If that worked, we can get started with the lab. First, we will initialize `npm` in your project directory. Again, make sure your Terminal's current working directory is in your new project directory. Then run:

  ```
  npm init
  ```

- You'll be prompted with a series of questions. For now, just go ahead skip (press `enter` repeatedly) past them. The important thing is that the `package.json` file gets created inside your project directory.

##### Jokes Web API and Axios

- Who doesn't love a good joke? Here's the [Web API documentation](https://icanhazdadjoke.com/api) to retrieve random jokes from a Web Service. Go read the API, and as always, keep track of the following things you'll need to know:

  - What is the endpoint URL to access the API?
  - What is the HTTP command (POST or GET or other?) you need to issue?
  - What data parameters do you need to provide, if any?
  - What HTTP Headers do you need to provide, if any?
    - (Hint: There should be a couple headers you need to specify to use this particular API)

- Once you understand how to get a Joke via HTTP, we now turn to the Axios library to make the request. _But wait_ -- in the previous lab, we gained access to Axios by including it in `<script>` tags of the `index.html` file, but we no longer have an `index.html`. So, how do we get access to axios in a standalone, browser-less project?

  - No worries, Axios is available over the `npm` registry.
  - From the terminal, install Axios now. The command to install an `npm` package is:
    ```
    npm install package-name
    ```
    or
    ```
    npm i package-name
    ```

- It should take a little bit of time, because Axios comes with some dependencies. Open up your `package.json` file to ensure that `axios` is now listed as a dependency for _your_ project.

- Before you can write any code that uses Axios, you need to first require it as part of your code (we did not have to do this in the previous lab). You can do this by stating the following at the top of your `app.js` file.

  ```js
  const axios = require("axios");
  ```

  Your `app.js` file should now have access to the `axios` methods (such as `axios.get(..)` and `axios.post(..)`).

- Let's verify that by writing an asynchronous function called `getJoke()` that asks the Web API for a joke and returns the joke as a string. Inside your `getJoke()` method, you can use `axios` to make a GET request with some customized headers.

  ```js
  // the web service requires a couple headers to be defined
  let myHeaders = {
    headers: {
      httpHeader: "value",
      anotherHeader: "anotherValue",
    },
  };

  // send an HTTP GET request to the given URL endpoint with my customized headers
  let response = await axios.get(endpointURL, myHeaders);

  // if successful, results are stored in response.data
  ```

  If successful, the API's "payload" is accessed using the `response.data` property. Go ahead and return the joke string. You may want to throw a `try-catch` block around the Axios code, so that you know when the request fails.

- Outside of your `getJoke()` function, capture the joke in a variable and print it out:

  ```js
  let joke = getJoke();
  console.log(joke);
  ```

- Run your script from the command line to test that it works. Every time you run it, you should get a new joke printed to the terminal window. (I'm going to bet that it keeps printing `undefined`.)

  - This behavior, if you recall, is due of the asynchronous (non-blocking) nature of `getJoke()`.
  - JavaScript dispatched `getJoke()` and moved onto the next line of code.
  - The next line of code prints `joke` to the console, but `getJoke()` is still working, and hasn't resolved/rejected yet, and therefore `joke` was still `undefined`.
  - Go ahead and fix this problem using one of two ways I taught you. Either

    1. Stick the two lines inside _another_ asynchronous function, and use `await` on `getJoke()`. Then call this new method.

       ```js
       async function printJoke() {
         let joke = await getJoke();
         console.log(joke);
       }

       // now call it!
       printJoke();
       ```

    2. Or, you can use the old promise-handling functions:
       ```js
       joke
         .then((result) => {
           // what to do if the joke successfully comes back?
         })
         .catch((error) => {
           // what to do if the request fails
         });
       ```

##### CowSay

- What's better than printing a random joke onto the screen? Printing a cow to tell the joke on the screen.

- Use the `npm` command to install another package, `cowsay2`.

- Read the documentation for [cowsay2 here](https://www.npmjs.com/package/cowsay2).

- Require the new package into your `app.js`. Now use `cowsay` to tell the jokes. Here are some samples of what things should look like, once you get it working:

  ```
  $ node app.js
  __________________________________________
  / What is the difference between ignorance \
  | and apathy? I don't know and I don't     |
  \ care.                                    /
  ------------------------------------------
         \   ^__^
          \  (oo)\_______
             (__)\        )\/\
                  ||----w |
                  ||     ||
  ```

  ```
  $ node app.js
   _________________________________________
  / What do you call your friend who stands \
  \ in a hole? Phil.                        /
  -----------------------------------------
         \   ^__^
          \  (oo)\_______
             (__)\        )\/\
                  ||----w |
                  ||     ||
  ```

  - It turns out there are a lot of different looks for these cows. Read further into the `cowsay2` documentation to generate different kinds of cows.
