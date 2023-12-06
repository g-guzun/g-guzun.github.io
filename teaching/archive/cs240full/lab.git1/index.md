## CS 240 - Software Engineering

### In-Class Exercise: Git Basics

In this exercise, you will be trying out basic git operations, including staging, committing, and undoing.

#### Student Outcomes

- Starting a git project from scratch
- Staging and committing changes
- Undoing changes

#### Preliminary: Configuring Git (First Time Only)

You only need to do this the first time using git, so if you've already done it before, you can ignore this section. Open a Terminal and configure your name, email, and editor for Git. Here's what I did to configure mine:

```
git config --global user.name "Full Name"
git config --global user.email your@email.edu
git config --global core.editor "code --wait"
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'
```

#### Part 1 - Initializing and Committing

As I noted in lectures, if you were to `clone` an existing git project, it would download the project directories from the remote repo (e.g., github), and automatically run `git init` to track this project. In this lab I want to show you how to set up a git repo for an existing project directory on your local machine.

- From your file system, create a new directory called `zoo`. This directory will store an inventory of animals in different sections of our Zoo.

- Now open up that directory from VS Code, and open up the terminal to that project. (Ask for help if you don't remember how to open the integrated terminal). From the terminal, go ahead and initialize git in the zoo directory. The command-line syntax to initialize git is given below. **It's important** to make sure your current working directory is in `zoo/` before issuing this command.

  ```
  git init
  ```

- Create two empty files: `arctic.txt` and `jungle.txt`. (You can do this in VS Code, or with the `touch` command directly in the terminal). Let's now make our first commit to include all three files. Remember that committing is a 2-step process. You must first stage the files you want to include in your commit with:

  ```
  git add <file1> <file2> ...
  ```

  Or if you want to stage all file changes, like in this case, use:

  ```
  git add .
  ```

  After staging, we can now commit with the message `"created a new zoo"`

- In `arctic.txt`, add the following content:

```
2 narwhals
3 polar bears
1 snowy owls
4 walruses
```

Now open up jungle.txt and add:

```
10010 piranhas
1 tiger
3 wild boars
11 warthogs
1 panthers
112 tree frogs
1 python
```

Save both files.

- Remember that you can choose what you'd like to commit by staging only certain files using the `git add <filename>` command.

  - Make a commit with only the changes in arctic.txt. Use the message `"Added arctic animals"`

  - Now make another commit with only the changes in jungle.txt. Use the message `"Added jungle animals"`

- Create a new file, `aquarium.txt` and add the following content:

  ```
  1 pacific octopus
  10 starfish
  6 manta rays
  ```

- Now go back to the `arctic.txt` add "3 arctic foxes" to the top of the file.

- Now commit all changes with the message `"Added aquarium, and updated arctic's inventory"`. If you check `git status` you should see a message like mine below, which tells you there is nothing staged, and no pending changes to your repository:
  ```
  $ git status
  On branch master
  nothing to commit, working tree clean
  ```

#### Part 2 - Undoing Changes at the File Level

- Your manager noticed a clerical mistake and said that all quantities of "1" is actually supposed to be "10" in all the files.

- Open up each of the files and do a _search-and-replace (read on, I'll explain how to do it)_ for the string "1" and replace it with "10" and save each file. To do a search-and-replace in VS Code, make sure you have the file open, and select `Edit` followed by `Replace`. **Do not choose `Replace in Files`!!** That opens up a dialog asking for a search string (you'll enter `1` here) and a replacement string (you'll enter `10` here). Then hover your mouse over the far-right button to "replace all instances."

- Go ahead and do this now for **all three files** and save them. Your files should now have the contents below:

  ```
  1000100 piranhas
  10 tiger
  3 wild boars
  1010 warthogs
  10 panthers
  10102 tree frogs
  10 pythons
  ```

  ```
  3 arctic foxes
  2 narwhals
  3 polar bears
  10 snowy owls
  4 walruses
  ```

  ```
  10 pacific octopus
  100 starfish
  6 manta rays
  ```

- Right after you saved these files, you realize that the quantities for some of the other animals are now wrong! You don't remember what those values used to be, and you don't want to make a mistake changing them back!

- Using the `git restore <file>` command, restore these files to the state before you made these global replacements. (You'll issue this command three times).

- After you've restored them back to their past state, go through each file one-by-one, and make the quantity changes by hand. After you're done, your files should look like the following:

  ```
  10010 piranhas
  10 tigers
  3 wild boars
  11 warthogs
  10 panthers
  112 tree frogs
  10 pythons
  ```

  ```
  3 arctic foxes
  2 narwhals
  3 polar bears
  10 snowy owls
  4 walruses
  ```

  ```
  10 pacific octopus
  10 starfish
  6 manta rays
  ```

- Save all three files and commit with the message `"Replaced all quantities: 1-to-10."`

#### Part 3 - Undoing Changes at the Commit Level

- Due to a loss of funding, plans for the aquarium are being scrapped. Your manager asks you to delete the `aquarium.txt` file, but to distribute its contents into two new files: `wishlist.txt` and `seacritters.txt`.

- Place the octopus line and the manta ray line in the `wishlist.txt` file, and commit with the message `"octopus and ray now in wishlist"`

- If you made changes to `aquarium.txt` make sure you save the file now.

- Put the starfish line in the `seacritters.txt` file, and commit with the message `"aquarium now reduced to small sea-critters section"`

- With its contents redistributed, you can now delete `aquarium.txt` using the proper git operation:

  ```
  git rm <file>
  ```

Note that you could also simply drag the file into your trash bin and git will know what to do. Go ahead and commit with the message `"removed aquarium file."`

- Pretend that weeks go by, and you learn the good news that the aquarium has been reinstated!! To get the aquarium file back, you simply have to time travel to an earlier commit. List all your commits using:

  ```
  git log --oneline
  ```

If you used descriptive commit messages, like we've been doing, it should easy to trace yourselves back to the right commit. Here's what mine looks like

    ```
    $ git log --oneline
    214fe41 (HEAD -> master) removed aquarium file
    5c797ca aquarium now reduced to small sea-critters section
    7267e2f Replaced all quantities: 1-to-10.
    7e67b59 Added aquarium, and updated arctic's inventory
    49b55af Added jungle animals
    18d1b39 Added arctic animals
    ```

- But let's say you're not sure if you're looking at the right commit, and doing a hard reset to a commit is super dangerous. You can check out the files at different commit points by using:

  ```
  git checkout <commit-id>
  ```

After you checkout, the file contents should update automatically in VS Code to its state in the given commit point! Once you find the commit point that has the aquarium, jungle, and arctic files, copy that commit id. (For my example, the right commit id is `7267e2f`).

- Before we do a hard reset to this earlier commit, **we must return to our current commit point!** To do this, run

  ```
  git checkout master
  ```

- Now, do a reset to the earlier commit point.

  ```
  git reset <commit-id>
  ```

- This should return your project to the state before the aquarium was removed, and before the seacritters and wishlist files were created. Make sure this is indeed the case.

- Before we finish up, run the following command just to get ourselves ready for the next lab. (Hopefully it says you're already on that branch).

  ```
  git checkout master
  ```

- Then commit anything that hasn't already been committed (it would be unusual for you to have uncommitted changes at this point).
