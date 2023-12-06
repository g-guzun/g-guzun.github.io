## CS 240 - Software Engineering

### In-Class Exercise: Express Web Server

As your team continues to develop personas and scenarios by which they interact with your software, we can begin refining some user stories for development. This lab is meant to help you jumpstart the requirements needed for Project 1.

#### Student Outcomes

- To learn how to develop on a remote machine.
- To learn how to develop and start an Express web server.

#### Part 1 - Getting Connected

- Open VS Code and make sure you have installed the ``Remote Development'' extension pack. Once installed, click on the "Remote Explorer" tab on the left-most panel.

- If you haven't already done so, click on the `+` to add a new SSH target to the server that I assigned you. In the dialog box that opens, type:

  ```
  ssh -l yourUsername yourServerIP
  ```

  Both of these have been assigned to you via email.

- This should create a new target. Right click on your server's IP, and choose `Connect to Host in Current Window`. It will ask you to provide your password. After you've connected successfully, click `Open Folder` on the left, and choose your _home directory_, which is at `/home/yourUsername`. VS Code should now list all the files and directories in your home directory on the server!

- Click on the icon to create a new folder, and name it `expressLab`.

- Now go to the integrated Terminal and navigate to your new `expressLab` directory:

  ```
  $ cd expressLab/
  ```

- Let's go ahead and initialize `npm` and install the `express` package:

  ```
  $ npm init
  ```

  You will be asked a series of questions... just press enter to get past them for now. After you regain control of the terminal, type the following to install express and nodemon:

  ```
  $ npm install express
  ```

  The former will give you the express package that we'll use to help us write a web server.
  The command below is used to run the express web server. The -g flag will install it globally on your machine, so it really just needs done once (not once per project). It will ask for your password, since you're making a system change.

  ```
  $ sudo npm install -g nodemon
  ```

- That should do it! Let's move on to the next step.

#### Part 2: Setting up a Simple Web Server

- Create a new file in the `expressLab` directory called `index.js`.

- At the top of this file, import the express library and instantiate an instance of the express server.

  ```js
  const express = require("express");
  const app = express();
  ```

- Next, we need to get the web server to listen on a particular port for HTTP requests. In a production server, HTTP runs on port 80. However, you and your teammates are all developing on the same server, and you would all be in conflict for port 80, which can only be bound once. So, let's try something different, like 8080 or 8081, etc. Make sure you talk amongst yourselves so that none of you is picking the same port.

  ```js
  const port = 8080;
  app.listen(port, function () {
    console.log(`Web server running on port ${port}!`);
  });
  ```

  Go ahead and save `index.js`.

- Without doing anything else, point your browser to `http://yourServerIP:port` where `port` is the port you assigned your server. You _should_ get a 404, because we never ran the code we just wrote to start the web server. (Aside: It's true that, because port 80 is widely recognized as the HTTP port, if you had selected port 80 in the previous step, you do not need to supply the port in the URL).

- Let's go back to the terminal and type the following the run your script:

  ```
  $ nodemon index.js
  ```

  On success, you should see something like the following on your Terminal:

  ```
  [nodemon] 2.0.7
  [nodemon] to restart at any time, enter `rs`
  [nodemon] watching path(s): *.*
  [nodemon] watching extensions: js,mjs,json
  [nodemon] starting `node index.js`
  Web server running on port 8080!
  ```

  It does not give you back the control to the terminal because it's busy running the web server. If you ever need to regain control over the terminal (and it's okay to stop your web server), then hit `control + c`.

- Return to your browser and refresh the page. This time, you should get a different error message:

  ```
  Cannot GET /
  ```

- This is actually good news! It means the express web server is running, but it doesn't know how to respond to any requests! In fact, play with your URL a bit to see a different message displayed. For instance, go to `http://yourServerIP:port/faculty/cats` and you should see the message:

  ```
  Cannot GET /faculty/cats
  ```

- The path (or route) that appears after the port in your URL is pointing at a location that the Web server doesn't yet know how to handle. Let's return to your `index.js` file and add a route.

#### Part 3: Routing

- Go back in `index.js`, and let's write a simple route for `/dogs`.

  ```js
  app.get("/dogs", function (req, resp) {
    resp.send("<p>Wuff!! -- Wuff!!</p>");
  });
  ```

  Save the file, and go to `http://yourServerIP:port/dogs`. You should see `Wuff!! -- Wuff!!` in the browser! Check out the source code... it's straight HTML being served by Express! This code only runs if the `/dogs` path (route) was given in the URL!

- Neat! Through this example, we can understand how to serve up different HTML content given a complete URL. For instance, instead of just printing "Wuff Wuff," we could have printed out all the code you wrote for Scoreboard assignment if we wanted to make it public to world.

- Anyway, the point is that you see how to serve up HTML content dynamically, and how you might leverage this when coding your own term project.

#### Part 4: Let's write a Web API!

- As we've seen in class, there are lots of web services out there to be used. Ever wonder how they're built? Let's find out. Even for our fifth homework, Simone, I had created a Web API for you to use. Now it's your turn to create a Simone Web API!

- Back in `index.js`, you can leave the `/dogs` route, but create a new route called `/simone`. Check out the `req` object for the `cmd` query string. Query strings are stored in the `req.query` object. If the `cmd` is given as `start`, then you just have to return the _start sequence_ for the calling app to play.

  To do this, now create a JavaScript object literal with two properties (keys): The `type` property should be assigned the string `start`, and the `sequence` property should be assigned an array of strings, such as: `["Y", "G", "B", "Y", "B", "R", ...]` The sequence should be 12 characters long, and it should be randomized. Here's an example of what the object literal would look like.

  ```js
  {
    type: "start",
    sequence: ["B", "B", "G", "G", "Y", "R", "B", "R", "R", "R", "B", "Y"]
  }
  ```

  If you use `app.send()` on this object literal, Express will automatically convert it into a JSON object before giving it to the client.

- Return to your browser, and go to `http://yourServerIP:port/simone?cmd=start`. If your code is working, your browser should display something like:

  ```json
  {
    "type": "start",
    "sequence": ["B", "B", "G", "G", "Y", "R", "B", "R", "R", "R", "B", "Y"]
  }
  ```

- But that's only the start sequence. The Simone Web API also returns an answer key when asked. Look again in the `req.query` object for the `cmd` query string. This time, if `cmd` is `getSolution`, then it must also have a variable called `rounds` which is assigned to the number of rounds they wanted to play. Your code should return a JSON object where `type` is assigned `solution` and `key` is a random sequence of the given number of rounds. For instance, if I went to `http://yourServerIP:port/simone?cmd=getSolution&rounds=4` then I might expect the following in return.

  ```json
  {
    "type": "solution",
    "key": ["R", "G", "R", "R"]
  }
  ```

- Once this is working, then you've completed your first Web API! You can even point your Simone homework to _this_ URL, if you really wanted to.
