## CS 455 - Principles of Database Systems

### Project 2: PHP Web Development

#### Overview

In this project you will be getting Apache to support the PHP programming environment, an interpreted language designed for generating web content. You will also become familiarized with PHP's library support to communicate with various databases, like SQLite3. You'll write a small database-driven web app. Finally, you'll learn how to write code that secures against SQL-injection attacks, which are responsible for a vast number of leaks of private data.

#### Importance of Teamwork

You are required to work in teams for all projects. In the past, the most successful teams meet and physically work together at an agreed-upon location and time. Teams that delegate tasks independently (then merging tasks later) have found far less success in the recent past.

I will assume that each member of the team has contributed equally to the project. If that assumption isn't true, please contact me privately. Each student will be graded on their teamwork and contribution.

#### Student Learning Objectives

- At the end of this project, students will be:
- Familiar with the installation and language of PHP
- Understand the integration of PHP with HTML to produce dynamic web pages
- Understand PHP's database-connectivity support for SQLite3
- Understand the risks posed by SQL-injection and how to secure against it

#### Required Files

The following file(s) have been provided for this assignment.

- [airport-schema.sql](airport-schema.sql)
- [airport-populate.sql](airport-populate.sql)

#### Part 1: Installing Required Software

This project assumes the successful completion of Project 1. It requires that you have a basic understanding of how to navigate the Linux command-line interface. When in doubt, refer to that [cheat-sheet](https://files.fosswire.com/2007/08/fwunixref.pdf) I you pointed to in the last project.

1. Login to your server. We need to install a few things before we can move on.

2. Using the `apt-get` command, you need to install the following software packages on your server:

   - SQLite3. Test this by typing `sqlite3` in the command line.
   - PHP language support (version 7 is stable at the time of writing). The package names _should_ be `php` and `libapache2-mod-php`.
   - PHP 7 PDO libraries for sqlite3 support. The package name should be `php-pdo`.
   - Go ahead and restart apache after you've installed the PHP and PDO packages.

3. It would probably be wise to install PHP and Apache on your own computers, if you plan to develop on your local machines separately, and pushing up your code once it's ready to be tested in the "live" environment. I'd imagine the installation would be much more intuitive on your Windows/Mac.

4. Even if everything went smoothly, you'll still want to test that everything is working. Create a new webpage, but this time, the file will have a `.php` extension, instead of a `.html` extension. Type in the following code, then save the file:

```php
<?php
    phpinfo();
?>
```

Navigate to the page from your web browser, and you should see a page containing a ton of information. If you see this, congrats, PHP is installed. If your browser asks you to download the `.php` file, try restarting Apache. If even that doesn't work, then I surmise PHP wasn't installed properly.

5. On the server, navigate to `/etc/apache2/mods-enabled` and edit the `php7.x.conf` (where `x` is the current sub-version of PHP)file and scroll to the bottom. You should see the relevant block there. In my version of the file, I had to `# comment out` a block of code to enable PHP in the user directories. Restart apache after you're done.

6. What `phpinfo()` spews out is the configuration and state of your PHP and web-server environment. Scroll down to the "PDO" section, and see if the SQLite3 library (driver) is listed as being installed. If you see it, congrats, your PHP has sqlite3 support. If you don't, you need to try reinstalling the PDO library for SQLite3.

7. Peruse through the PHP info a little more. There are two sections of data that are pretty interesting. First, under the Apache Environment section, you can read all about how Apache was configured (what you had to do in the previous project). For instance, you can see where the document root is, and what the current URL is (`SCRIPT_NAME`).

8. Superglobal Variables: The second section with interesting data is toward the bottom, called PHP Variables. These variables contain the server information we just saw in the Apache Environment section, and more! As you'll learn, these variables are called superglobals, and they are accessible by any PHP page! So, for instance, any PHP page you create knows what the current page is called (`$_SERVER['SCRIPT_NAME']`), and even knows how the user got here (`$_SERVER['HTTP_REFERER']`).

#### Part 2: Learn Some PHP

1. PHP is one of the most popular languages in use today, and it's also pretty easy to learn! You can find many good tutorials online. I've also prepared some notes for you that you might find useful.

   - [David's old PHP Notes](CS455-php.pdf)

2. When you're ready to test out PHP, create another file, called `test.php`, and type the following code in. Notice that there is an intentional error (the hello-world string was not terminated).

   ```php
   <!DOCTYPE html>
   <html>
   <body>

   <?php
       //there should be an error
       echo "<p>hello world!</p>;
   ?>

   </body>
   </html>
   ```

   Save it, then navigate to the page on your browser. You _should_ see a blank page. View the HTML source from your browser, and you should also see nothing. Not very useful for debugging purposes, is it?

3. Why doesn't PHP display errors by default? Well think about this from a production standpoint. If a page has errors in it, would you want PHP to announce to the world what the problem was? The might reveal some sensitive information, for instance, leading to security vulnerabilities. So, hiding errors by default is actually a good thing, but it's not very useful for educational settings! We need to turn error-reporting on.

4. Fortunately, like Apache, PHP also comes with a configuration file. It's called php.ini. You'll need to find it on your server first (maybe `phpinfo()` would tell you?). You'll need superuser privilege to edit it. Read through the entire file, and try to understand as much as you can. In this file, semi-colons denote line-comments. Find the line that sets the value for `display_errors`, and turn it On. You need to restart Apache for the changes to take effect. Refresh the `testing.php` page, and now you should see the errors.

5. Fix the error in `test.php`, and you should see the "Hello World!" message if you refresh the page. From your browser, choose to view the source. Here's something interesting: It appears that the browser only knows about the HTML code that was generated after the PHP code had already processed! This important observation implies two very important concepts:

   - Your PHP code was executed before the web server (apache) serves it back to the browser.
   - Your browser is built to interpret HTML, and is completely oblivious to the fact that PHP was even present. It does not know, or even care, that the HTML document it's displaying was generated by PHP, or that was a static HTML page to begin with.
   - This web-programming model, in which the code is processed by the web server, is called server-side programming. Today, PHP is the dominant server-side language (others include Python (flask), C\#, and Ruby-on-Rails). As an aside, client-side languages are ignored by the server and processed by the browser. JavaScript is the most widely known client-side language, but interestingly, recent developments in JavaScript has meant that it can be used as a server-side language too (see: node.js)!

#### Part 3: Bringing in the Database

Because we only have enough time in class to cover one database system, this tutorial will be written for SQLite3. However, the strength of PHP's PDO driver library makes these instructions pretty easy to adapt to other relational database systems, like MySQL, PostgreSQL, etc.

- From the command line, create a new folder called myDB, in your web directory and navigate inside it.

- Start up `sqlite3`. Now let's populate it with the airplane data set we've been working with in class. Copy and paste the contents of the `airport-schema.sql` and `airport-populate.sql` (these are on found on the course page) into the SQLite prompt. Save the database as a file named airport.db by typing `.backup airport.db` or `.save airport.db`.

- Once the airport database is created, you now need to give the web server read, write, and execute permissions to the both `myDB/` directory to the new `airport.db` file. You also want both items to be owned by apache. To do this, you need to figure out what username does Apache execute on your machine? Use the `ps aux` command to list all the processes that are running. The usernames of the owners will be displayed as part of the output. Then use the commands `chown` and `chmod` to assign proper permissions to these two items. Do this before moving on.

- Create a new file, outside the database directory, called `showPassengers.php`. Paste the following content into this file:

  ```php
  <!DOCTYPE html>
  <html>
  <body>
  <h2>List of all passengers</h2>
  <p>
      <?php

          //path to the SQLite database file
          $db_file = './myDB/airport.db';

          try {
              //open connection to the airport database file
              $db = new PDO('sqlite:' . $db_file);      // <------ Line 13

              //set errormode to use exceptions
              $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

              //return all passengers, and store the result set
              $query_str = "select * from passengers;";  // <----- Line 19
              $result_set = $db->query($query_str);

              //loop through each tuple in result set and print out the data
              //ssn will be shown in blue (see below)
              foreach($result_set as $tuple) {          // <------ Line 24
                  echo "<font color='blue'>$tuple[ssn]</font> $tuple[f_name] $tuple[m_name] $tuple[l_name]<br/>\n";
              }

              //disconnect from db
              $db = null;
          }
          catch(PDOException $e) {
              die('Exception : '.$e->getMessage());
          }
      ?>

  </p>
  </body>
  </html>
  ```

  - On Line 13, a PHP-PDO object is instantiated. The argument into this constructor a string containing this format protocol:path, where protocol refers to the database-type in use, and path is the path to the airport.db file. After this constructor is executed, the connection to the airport.db database is made. If there is an error (say, the file isn't readable by Apache, or file doesn't exist), then an exception will be thrown and control will jump to the `catch()` clause. The try-catch syntax and behavior is just like Java.

  - On Line 19-20, we run an SQL query that selects every passenger from the database. It stores the results in an array of arrays called `$result_set`. Each item in `$result_set` is a tuple (which is like a HashMap).

  - On Lines 24-26: the `foreach($result_set as $tuple)` loop stores every tuple in the result set in a variable called `$tuple`. It works just like the foreach-loop in Java. Each attribute value of the tuple can then be accessed using the syntax `$tuple[attribute_name]`.

  - Save this file, and call it `showPassengers.php`, then point your browser to it.

  - If everything goes smoothly, you should see an HTML page displaying all passengers' information. Again, you should check the HTML source to see what exactly was printed out.

##### Part 4: Passing Data via HTTP

Suppose that, instead of listing all passengers, we want to select passenger data on a specific person, and we have their SSN. How do we get the SSN to the PHP page? There are two ways to do this: GET request and a POST request. I'll talk about GET requests first.

###### HTTP GET Request

One way to pass data to a web page is through the URL itself. To indicate that you want to pass in some variables to the "show passengers" page, you use the following URL syntax:

```
http://addr/showPassengers.php?var0=value0&var1=value1&...
```

- The list of variables come after the `?` in the URL, which is called the _query string_, not to be confused with SQL queries.

- Each variable has the format `name=value`, and multiple variables are separated by an ampersand `&`.

- Let's try sending a variable to the `showPassengers.php` page! Send a variable called `passenger_ssn` and set its value to `555-55-5555` (which belongs to Frank Lovejoy). This does... nothing... because our show passengers page isn't looking for any incoming data, so let's change that now.

- To access your GET request variables, you can use the PHP superglobal variable `$_GET[var_name]`, where `var_name` is the name of the variable you assigned in the URL. Print out `$_GET[passenger_ssn]` somewhere, and refresh the page. You should see `555-55-5555` now printed on the web page.

- Now, modify the SQL query so that it selects the person sharing the given. Specifically, you'd want to change Line 19 in the above file to:

  ```php
  $query_str = "select * from passengers where ssn='$_GET[passenger_ssn]';";
  ```

- Refresh the page, and you should see the information for only Frank Lovejoy. Try inputting different query strings in the URL to see the info being printed for other users.

###### HTTP POST Request

I mentioned that there were two ways to send variables to the web server. Posts requests are the second method. To do this, you'll need to develop an HTML form. Each input-box in the form gets a variable name, and value is whatever the users input in those boxes. I'll leave this as an exercise for you to figure out.

#### Part 5: Securing against SQL Injection

The PHP page we just wrote is highly vulnerable to SQL injection, one of the major cybersecurity threats today. In this section, I'll show you just how easy it is to hack your "show passengers" page.

![](figures/exploits_of_a_mom.png)

- To common users of your "show passengers" page, they don't know much of the magic that goes on in the background, since its obscured. But they can make educated guesses by looking at your URL. First, it's pretty obvious that the page is written in PHP, just based on its file extension. Second, they see the query string, which they can enter arbitrary values for --- and this is the key issue.

- At first, they might try entering some SSNs that don't belong to them. They stumble upon Homer's private information just by entering 111-11-1111, a simple enough SSN to start with. If they're motivated, you could imagine that they could write a program that enumerates every 10-digit SSN and makes a request to your server to retrieve their private information.

- Yeah, that seems bad, but it gets worse. Most hackers are smart enough to realize that you construct an SQL query out of the GET variable. And knowing that they can enter arbitrary strings as the value of the GET variable, it brews trouble. Don't do this yet, but suppose I enter this URL query string:

  ```sql
  http://addr/showPassengers.php?passenger_ssn=' OR 1=1; --
  ```

- Err, what? It doesn't seem to make any sense. Well, not until you combine it with what happens inside your PHP code. Let's go back to read your show passengers code, and substitute (on paper) the GET variable placeholder with the string I gave above. What does the SQL statement read now? You should get what I got below:

  ```sql
  select * from passengers where ssn='' OR 1=1; --';
  ```

- Well, that should send chills down your spine. Essentially, the where clause will always evaluate true now. And the -- you added to the end comments out what remained in the old query format so that it becomes a legal SQL statement. Test it out. It should cause the dump of the entire passenger table! Holy crap, could you imagine if people's passwords and other private information (address, phone numbers, emails, credit cards, citizenship status, etc.) were stored in plaintext??!?

- What if I injected an update or delete statement afterwards? Updating people's information would be fun (like your GPA), and deleting records is a good way to take out the business, if the organization doesn't do regular backups.

##### Removing the Threat

Securing against injection attacks is quite simple. PHP and its PDO library have lots of built-in functions to sanitize the input. The problem with cybersecurity threats like this one is just that a lot of developers are either unaware or are too lazy to deal it. Well, now that you're aware of the problem, my advice to you is to not be lazy!

- There are lots of ways to protect against injection. The elegant way is to use [prepared SQL statements](http://php.net/manual/en/pdo.prepared-statements.php).

- What allows the injection to work before was that I was able to comment out the last piece of the SQL statement that the PHP programmer wrote. If you couldn't comment out the remaining part, the resulting SQL statement would've been invalid. Observe below:

  ```sql
  select * from passengers where ssn='' OR 1=1;';

  _____________________________________________^ (error here)
  ```

  Because there is an unterminated string, SQLite3 will report the error, and the page and your PHP code would immediately jump to the catch clause.

- Prepared statements make it so that such tampering with the intended SQL statement cannot be made. You "prepare" an SQL template to be run, making certain placeholders for data to be input. Data input from the users are then "bound" to these placeholders. The single-quote that I injected will be escaped (`\'`) from the binding, which causes the where cause to return false.

#### Assignment

You will provide three new functionalities over the airport database. All of your scripts must be free from the SQL-injection vulnerability by using prepared statements. I will intentionally try to hack into your database using injection attacks. If I succeed in doing so, you will receive a failing grade on this project.

##### Creating New Passengers

1. Write an HTML page containing a form to input information for a new passenger. Then, in a separate file, write a PHP script that takes the contents of this form via POST request, and does the following:

   - Checks if any of the FirstName, LastName, and SSN fields are empty.
   - If any of them are empty, decline the user action by immediately redirecting her back to input form (Look into PHP's `header()` function to do this.)
   - A good form-handler would also inform the user on which fields require info if the user didn't provide sufficient data. Consider sending some GET variables back to the input form to indicate which fields.
   - You can and should do even more error checking. For instance, you can check if the SSN was input as an 11-digit number, or that the first and last names should be non-null and alphabetical.
   - If all three required data fields are given, then insert them into a database, return the user to the passenger list and display a "success!" message on the list page.

2. Modify the "show passengers" page I gave you to once again display the passenger data in a table. Next to each tuple, provide a link called "update." Clicking on it will take you the passenger HTML form you created in the previous step, but with all fields pre-populated with existing data from the database. The submit button should now read "Update Info." The user can now make updates to any field, and on pressing on the submit button, it will make the changes in the passenger table, and take you back to the now-updated passenger list.

#### Submission

Create a page that links to: (1) the new-passenger form, (2) the passenger listing. List the group membership on this page. Go to [canvas](https://canvas.pugetsound.edu) and submit the URL to this page under Project 2.

#### Grading

```
This assignment will be graded out of 40 points:
[5pt] An form that allows users to input data on a new or exiting passenger.
[5pt] A secure PHP page, createPassenger.php, that inserts new passengers
      (with data input from the aforementioned form) into the passengers table.
[5pt] On success, createPassenger.php redirects users back to the passenger
      list with a "success" message.
[5pt] On failure, createPassenger.php redirects users back to the user-input
      form page, indicating all error(s).
[5pt] The update link now redirects users back to the createPassenger.php page,
      with exiting data already filled in the boxes. The submit button now
      reads "Update Info"
[5pt] Clicking on "Update Info" will take users to a secure PHP page,
      updatePassenger.php, which updates the specific passenger with the new
      data from the previous form.
[5pt] On update success, updatePassenger.php redirects users back to passenger list.
[5pt] On update failure, updatePassenger.php redirects users back to the form,
      indicating all error(s).
[-15pt] I can successfully inject SQL statements.
```
