## CS 240 - Software Engineering

### In-Class Exercise: Embedded JavaScript (EJS)

Last lab, we got installed Express and wrote a web server to respond with a JSON object (basically, we wrote the Simone Web API). As discussed in lecture, besides JSON objects, web servers can also respond with the HTML+CSS+JS combo. This is, of course, what _most_ web servers are asked to do, so let's see how we'd go about serving up entire web pages.

#### Student Outcomes

- To learn how to develop on a remote machine.
- To learn how to develop and start an Express web server.
- To learn how to use the EJS view engine.

#### Part 1 - Getting Connected

- If you need a refresher on how to get connected to your remote server, please refer to the [previous lab](../lab.express).

- Once again, we'll begin by connecting to your remote server. Once connected, you should find the `expressLab` directory that we created for the previous lab. From the terminal, navigate inside that directory and install the `ejs` NPM package.

#### Part 2: Setting up a Simple Web Server

- Open up the main server file, `index.js`. You should already see the code we wrote for the previous lab, and that's okay. Our web server can continue to serve up the Simone JSON object given the `simone` route, and we'll just do everything in this lab under a new route.

- Inside, you'll see the express server being instantiated:

  ```js
  const express = require("express");
  const server = express();
  ```

  Below these lines, we need to set EJS to be our _view engine_:

  ```js
  // Use EJS for rendering HTML content
  server.set("view engine", "ejs");
  ```

- Heads up: I've read that you may have to re-install the Express package too, but I didn't need to. If you get "express not found" errors on your terminal in the next section, you'll know what to do.

#### Part 3: Add an EJS template

- Create a `views` directory inside the project. This is where you will be storing all your EJS templates.

- Inside the `views` directory, create a new template named `lab.ejs`, and paste the following code inside:

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title><%= titleOfPage %></title>
    </head>
    <body>
      <h1><%= titleOfPage %></h1>
      <p>Testing testing 123</p>
    </body>
  </html>
  ```

  Save this EJS file for now. We'll come back to it later.

- Back in your `index.js` file, add a _route_ for `ejsLab`, like the routes you've added before. This time, instead of sending back a response using `resp.send()`, we want the Express server to use our new template. Use the `resp.render(...)` method to do this:

  ```js
  resp.render("lab.ejs", { titleOfPage: "My EJS Lab" });
  ```

  Here, we're telling Express to use the `lab.ejs` template we just wrote up as the blueprint for the page to serve up. The second argument is a JS object literal containing variable values to "fill in" the EJS template. We're setting the variable `titleOfPage` to `"My EJS Lab"`, which will be interpolated automatically by Express.

- Start up the web server from the Terminal:

  ```
  $ nodemon index.js
  ```

- Now, point your browser to the newly routed endpoint: `http://yourIPAddress:yourPort/ejsLab`.

- You _should_ see a web page that reads **My EJS Lab** and Testing testing 123 below it. Let me know if you don't!

#### Part 4: Adding CSS

- The page looks super generic because there are no styles associated with it.

- To add CSS you need to do a couple of things:

  - First, create a new directory called `public` inside your project folder.
  - In there, create a `lab.css` file with a couple simple style selectors. Something like this would do:
    ```css
    body {
      font-family: arial;
      background-color: blue;
    }
    h1,
    p {
      color: #ffffff;
    }
    ```
  - Return to your `.ejs` file and link the new CSS file in your `<head>...</head>` elements:
    ```html
    <!-- yes, /lab.css not lab.css below -->
    <link rel="stylesheet" href="/lab.css" />
    ```
  - Finally, back inside the `index.js` file, we need to tell the Express server that static "assets" (like your new CSS file) are found in the `public` directory. Near the top of your file, and just under the "view engine" statement, add:

    ```js
    server.use(express.static("public/"));
    ```

- Refresh the page to see the new design.

#### Part 5: Time-Allowing Optionals

- I strongly encourage you to do this.

- If you have time, see if you can add a route to access your previous homework assignments. For instance, `scoreboard/` would take you to the working copy of your Scoreboard project.

- This is the process you'd take to get your projects and code online so that anyone can play with it from all over the web (instead of just on your browser and your machine)! Rather exciting!
