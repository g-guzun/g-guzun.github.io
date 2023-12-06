## CS 455 - Principles of Database Systems

### Project 1: To the Cloud

#### Prerequisites: Slack

- You and your team are strongly encouraged to use Slack for communications. Go [here](https://univpugetsound.slack.com) to sign up under the Puget Sound team.
- When signing up, for your email, you must use your `pugetsound.edu` address. It's set up so that it only accepts users with our school's domain to keep out strangers.
- If asked, the Team Name is: `univpugetsound`
- Once logged into the team page, join the `#cs455_db` channel. This is where general course discussion takes place.
- Create a new channel for your team, and you may invite me to it (if you like professors to spy on you).
- It is also recommended that you download their app (iOS and/or Android) to get notifications on your phone.

#### Overview

So, why are you learning Linux server administration in a database course? Well, it turns out that building web pages that draw their content from a database is one of the most common use-cases in all of web-development operations today. (You didn't think sites like Amazon create a web page for every possible search term, did you?) In web-development lingo, what you're about to set up is commonly referred to as the three-tier architecture. The three-tier architecture consists of the Data Tier (consists of the database), the Logic Tier (consists of the code responsible for processing and communication with the database), and the Presentation Tier (which is the HTML/CSS that presents the information to a browser). In practice, the vast majority of today's three-tier architectures are hosted on the Apache Web Server, usually running on a Linux machine.

In this project (and remaining projects), you will receive first-hand experience in creating your own dynamic web application on the cloud from scratch. We'll first focus on spinning up a virtual machine (called an instance) on AWS, and getting comfortable on its command-line interface (or shell). By the end of this project, you'll be bringing the Apache Web Server up and running and serving up your very own website.

#### Importance of Teamwork

You are required to work in teams for all projects. In the past, the most successful teams meet and physically work together at an agreed-upon location and time. Teams that delegate tasks independently (then merging tasks later) have found far less success in the recent past.

I will assume that each member of the team has contributed equally to the project. If that assumption isn't true, please contact me privately. Each student will be graded on their teamwork and contribution.

#### Student Learning Objectives

- To become familiar with the command-line and common Linux commands
- To understand the basic administration of the Apache Web Server

#### Part 1: Accessing Your Cloud Instance

- To access your team's virtual machine, we need to get a command-line interface that you'll feel comfortable using on your personal machine.

  - In the [VS Code editor](https://code.visualstudio.com/download), which is recommended for this project, there is a built-in Terminal that you can use to access the command line. To get to it, start any project, then right-click anywhere on the project's file menu, and select `Open in Integrated Terminal`.
  - Of course, if you prefer not to use the VS Code integrated terminal, then the following tools will work too:

    - If you use Mac: Your Terminal (found in Applications/Utilities) would work fine, but I prefer `iTerm 2`.
    - If you use Windows, I recommend downloading `git-bash` (part of the Git application), or you can download `PuTTY`.

- Let's get connected to your the Linux server. From your command-line, type:

  ```bash
  ssh dbteam@ipaddr
  ```

  This command causes the SSH (secure shell) client to connect to the machine located at the specified IP address.
  The login name is `dbteam` (the part before the @ symbol), i.e., once you login, that is your userID on the instance.
  Finally, `ipaddr` is your instance's public IP address, which has already been provided to you.

- Next, type in the temporary password that was provided to your team.

- You'll be prompted with a host verification message. Type `yes`. You'll just need to do this once. If all goes well, you should now be logged into the server, and get something that looks like the following.

  ```
  Welcome to Ubuntu 18.04.2 LTS (GNU/Linux 4.15.0-51-generic x86_64)

    System information as of Mon Jul  8 13:29:33 CDT 2019

    System load:  0.21              Processes:           174
    Usage of /:   55.8% of 7.58GB   Users logged in:     0
    Memory usage: 22%               IP address for ens3: 172.17.65.12
    Swap usage:   0%

  * Read about Ubuntu updates for L1 Terminal Fault Vulnerabilities
    (L1TF).

    - https://ubu.one/L1TF

  * Check out 6 great IDEs now available on Ubuntu. There may even be
    something worthwhile there for those crazy EMACS fans ;)

    - https://bit.ly/6-cool-IDEs

    Get cloud support with Ubuntu Advantage Cloud Guest:
      http://www.ubuntu.com/business/services/cloud

  * Canonical Livepatch is available for installation.
    - Reduce system reboots and improve kernel security. Activate at:
      https://ubuntu.com/livepatch

  Welcome to
      _   _                             _
    / \ | |_ _ __ ___   ___  ___ _ __ | |__   ___ _ __ ___
    / _ \| __| '_ ` _ \ / _ \/ __| '_ \| '_ \ / _ \ '__/ _ \
  / ___ \ |_| | | | | | (_) \__ \ |_) | | | |  __/ | |  __/
  /_/   \_\__|_| |_| |_|\___/|___/ .__/|_| |_|\___|_|  \___|
                                |_|


  dbteam@js-17-119:~$
  ```

  If you see something like this, then you're in!! If it refuses your connection attempt (or times out), let me know.

- One of the first things you should do as a team is to change the password to your server to something more secure. When you've decided on one, use the `passwd` command to change it.

- **Warning!!** There's a mild risk associated with running a server on the cloud. Unlike your own computers, the machine you just logged into has ephemeral storage. What this means is that, every time the machine reboots, it'll revert back to its original, clean-slate state! This means a few things for you:

  - It is not recommended that you code directly on the server. Instead, code locally on your machine, then upload it to the server for execution (I'll show you how later).
  - Backup and use version control, such as installing git on your server.

#### Part 2: Learn Some Linux Commands

- If you typed your instance's public IP address into your browser, it won't bring anything up. We need to change that, and give yourselves a web presence. To start, we'll need to install the Apache web server on your instance. However, before we can start, you you need to become somewhat competent with common Linux commands.

  - Here's a great [cheat sheet](https://files.fosswire.com/2007/08/fwunixref.pdf) you can download. I strongly recommend printing it out and keeping it somewhere convenient.

- Currently, you're logged in as the user `dbteam` with a temporary password that I made up. The first thing you should do is to change your password.

- After this, learn know how to do the following. Life may be painful for future projects if you don't know how to do these things:

  - Navigate the file system: Understand relative and absolute paths, change directories, list files, remove files, remove directories (including their sub-directories if any), move files/directories, copy files/directories.
  - Locating files using `find`
  - Text editing: Read an existing text file, create a new text file, modify an existing file. If this is all new to you, I wouldn't start with the `vi` or `emacs` editors. Instead, look into using `nano`.
  - File permissions: Understand how to see permissions, change permissions on existing files or directories.
  - Install software packages with `apt-get`
  - Authentication: Occasionally, you need to be an "administrator" (or, superuser) of the server to run privileged commands. How?

- It's time to test out your knowledge and start installing and configuring some software packages. **Install** the Apache Web Server on your machine. Look up how to use `apt-get` and how to get it to download and install the latest version of apache.

- To check if your installation of apache was successful, point your web browser to the IP address of your server. If the installation of Apache was successful, you should get some generic web page saying something to the effect of It Worked!. On failure, your browser will probably time-out or tell you the page does not exist (but not a 404 error).

- You cannot proceed any further until you've ensured that **apache** is running properly. (To check after installation, point your browser to your public IP address to see if you get a default "successful installation" page). Check with me if you have any questions on this step.

#### Part 3: Configuring the Apache Web Server

The following commands are important (you need to have administrative/superuser privileges to run these):

- To start apache: `sudo apachectl start`
- To stop apache: `sudo apachectl stop`
- To restart apache: `sudo apachectl restart`

##### The Apache Configuration File

- The behavior of your Apache web server is defined in its configuration file. On some systems, it is called `httpd.conf`, and on others, it's `apache2.conf`. Find out which one is on your server, and then open it up for reading.

- Locate the apache configuration file, and open it up. You'll notice that any line starting with the `#` symbol is a comment. Read through all the comments for each configuration key and value. You don't have to understand most of them, but I will be asking questions about the important configuration keys later! Note: any change to this config file must be followed by an apache restart for it to take effect.

- To make sure you have a good understanding of the web server, answer the following questions. Most of these answers can be found in the configuration file. You should type out the answers together with your team in a file (You'll be writing a web page with the answers shortly.)

  1. What command can you type into your server's terminal to check if apache is currently running?
  2. Apache implements the HTTP protocol. The protocol is extremely simple, with just a few commands. What is the difference between the `GET`, `POST`, and `HEAD` commands?
  3. What is the difference between `ServerRoot` and `DocumentRoot`?
  4. What port does apache listen to for HTTP connections from browsers by default? Test it out by typing this into your browser: `http://ip_addr:port`, where `ip_addr` is the IP address of your server, and port is the port number given in the configuration file. Try changing the port number to something else. Test it again in your browser, then change it back. The fact that you don't usually need to specify the port when going to a URL should tell you that the default port to access web servers is the one given in the config file.
  5. What file on your server contains apache's traffic logs? What about apache's error logs? These files tend to get very long, with the most recent logged events being appended to the end of the file. On the terminal, how can you view the last few lines of any file?
  6. What is a Directory Index file? Why would it be desirable to have one in each directory?
  7. When the browser tries to access a page that does not exist, the HTTP protocol issues a 404 error code. Try it by navigating to [http://cs.pugetsound.edu/david_is_awesome.html](this non-existent URL). It's sort of a clunky way of telling users a page doesn't exist, right? It's ugly and unhelpful. Now try going to a [http://pugetsound.edu/david_is_awesome.html](different non-existent URL) on our school's website. Notice that, this time, the web server is able to redirect you to a better looking page, and it's also more helpful in providing you links to other existing resources. So, how do you get apache to redirect users to a specified page upon receiving a 404?
  8. How do you give every user on your Linux server their own web space? Enable it now!

#### Part 4: Serving up a Webpage

- It's time to create and serve your first web page! If you completed the previous problems, you should've already enabled public HTML directories for users on your server. Well, you're working under the `dbteam` user, so we'll create a webpage under that account.

- Navigate into the `/home/dbteam/public_html` directory and create a simple HTML page named `index.html`. The content of this page should contain your team-membership list, and responses to the questions listed below. The page itself doesn't have to be anything fancy, but it should have some structure (for instance, an enumerated list?) and design elements (e.g., background color and non-boring font?). The page should also contain at least one (appropriate) image.

  - If you're interested in learning more HTML, here's a free [online tutorial](https://www.internetingishard.com/html-and-css/) I have students use for another course.

- You are required to add some design and colors to your page using appropriate CSS elements (create a separate `.css` file and link to it from your webpage). You don't need to go overboard with design unless you really want to. Also, I'd prefer it if you don't make your page bright pink with green lettering, as some students have done in the past to irritate me. I just want you to demonstrate that you know how to include a CSS stylesheet to your HTML page.

- If it is all done correctly, I should be able to access it by pointing my web browser to `http://ip_addr/~dbteam`, where `ip_addr` is your server's assigned IP address.

#### Part 5: Transferring Files to/from the Server

The instructions asks you to embed an image. You might wonder how to get the image up on the server. More generally, you might wonder how to transfer any file to-and-from the server. I do not recommend you writing code directly on the server anyway, because multiple people working on it remotely could cause you to overwrite each other's changes. It is much safer to develop local copies of your webpage (also serves as backup), then uploading it to the server.

I'll leave this to you to decide, but I think the _preferred_ way would be to install `git` on the server and on your personal machines. Create a github repo work with your team to `push` code and other files to this repo from your computers. When you're ready to "go live," you could then `pull` the code down to your apache servers.Git does require some training if you aren't well-versed in it already. This is a good time to force yourself to learn it.

However, I also understand if you just want to avoid putting more on your plate at the moment. Here are some tools to transfer files to and from the server. Use the same credentials here as you did to ssh to your instance.

- On MacOS/Windows: I like CyberDuck.
- On Windows: WinSCP or FileZilla.
- On Linux/MacOS: Could also just use the `scp` command from your shell.

#### Submission

Go onto [canvas](https://canvas.pugetsound.edu) and submit the URL to your page.

#### Grading

```
This assignment will be graded out of 35 points:

[0pt] The names of your team members are listed.
[24pt] You have created an HTML file with the correct answers to the questions posed. 3pts per question (x 8).
[6pt] The HTML page embeds an image and has some basic structure and CSS design elements.
[5pt] The HTML page is being served up in the ubuntu user's web space.
```
