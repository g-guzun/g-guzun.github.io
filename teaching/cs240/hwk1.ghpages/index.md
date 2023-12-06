## CS 240 - Software Engineering

### Homework: Personal Homepage on github.io

In this assignment, you'll create a personal homepage on Github's free web hosting service, [github.io](https://github.com/). The purpose of this assignment is to give you some practice with the basics of using HTML, CSS, and Git for source control. It also prepares you for the process of submitting future assignments in this course, as we will be working exclusively with git and github for the remainder of this course.

#### Student Outcomes

- Use of HTML and CSS
- Exposure to various git operations and github

#### Preliminary: Configuring Git (First Time Only)

You only need to do this the first time using git, so if you've already done it before, you can ignore this section. Open a Terminal and configure your name, email, and editor for Git. Here's what I did to configure mine:

```
git config --global user.name "David Chiu"
git config --global user.email dchiu@pugetsound.edu
git config --global core.editor "code --wait"
```

#### Program Requirements

For full credit, your submission should observe the following requirements.

- By this time, you should already have an account on Github. If you still don't have an account, you must [create one now](https://github.com/).

- Sign in to github, and create a new repository called `yourUserName.github.io` where `yourUserName` is your github username. When creating your repository, **do not choose to add a README or .gitignore file**. This is where the code for your personal web page will live once you "push" to it.

- If you're reading online tutorials on how to create a Github page, ignore all references to their markdown (`.md`) support. (Markdown is a simplified syntax for generating webpages -- they converted into HTML by a 3rd-party application). You are required to do this assignment using HTML and CSS that _you_ write.

- You'll be creating a live webpage here: [https://yourGithubUserName.github.io](https://yourGithubUserName.github.io).

- On your local machine, create a new project in VS Code and have git manage it. Rename your local branch from `master` to `main` for compatibility with Github.

  - **Key tip:** Once you open your terminal, you **must** ensure that the current working directory is _inside_ your project directory. If not, then navigate to it first using `cd path/to/your/hwk1/project/`

- Working in VS Code, you are to create the following documents. As you're editing your homepage, make commits often, as you will be graded on the _frequency_ and _quality_ of your commit messages. The commit messages don't need to be long, but you should be able to trace your steps by viewing them.

  - `index.html` file is your landing (home) page. You are required to upload and show an image of yourself and write a little more about who you are. You don't have to write a novel -- just a few paragraph synopsis will do.

  - `default.css` file should contain some CSS elements to style your homepage. You can style it however you like. In other words, I won't be grading on "good" design. Though, it should be emphasized that this page will be "live" and the goal of this assignment is to introduce to the online world who you are as a software developer, so you might want to make sure it looks presentable. Inside this file, there should be:

    - At least 2 element selectors and 1 class selector
    - You must style your paragraphs to use Helvetica point 10 font.
    - You must style your image to have a solid border, and set it to the left of your self-summary.

  - After you've styled your homepage to your liking, commit and push to github. It can take 1-2 minutes for the upload to take effect, but check your website in your browser to see.

    - As mentioned earlier, it should be located at [https://yourGithubUserName.github.io](https://yourGithubUserName.github.io).
    - Note that changes could take a few minutes to sync up on github's side. If you're still getting a 404 code after a while (~10 mins?), you might want to check the following:
      - Did you name your github repository correctly?
      - Did you commit everything before you git-pushed up?

  - Let's work on your resume under a separate branch. Create a new git branch locally called `resume` and switch to it. This step is important, as you will be graded on the existence of the branch.

  - `resume.html` serves as your resume. You must link to it from your home page. To put yourself in the right mindset, suppose that you're in the early stages of applying for an internship, job, grad school, etc. Place your name and contact info (you don't have to put your physical address on there) in the heading. Following that, these sections must be included in this order:

    - **Education:** List your collegiate history here; your major and minor (if you've declared -- write "undeclared" if you haven't). You do not need to share your GPA.
    - **Experience**: List any relevant work history and/or leadership/volunteering experiences here. A title and a short one-paragraph synopsis per item will be sufficient per item.
    - **Coursework**: List your CS and CS-adjacent (such as Math) courses here. Use an unordered list containing course number and course title.
    - **Technical Projects**: List any significant technical projects here. A title and short one-paragraph synopsis per project will be sufficient. Since it's so early in your studies, you can just list some CS 1 or CS 2 projects here.
    - **Affiliations**: List any academic clubs you might be a part of, including athletics and Greek life.

  - Make sure that your resume matches styling to your homepage, or alternatively, you can create a totally separate styling for your resume.

  - After you're done with the content, merge the `resume` branch to the `main` branch and commit and push, but don't remove the `resume` branch. You should also push the `resume` branch up to github, but it's the content under `main` that will be displayed in your web page.

#### Optional Extensions

Have some free time? There are no limitations to the content you want to display. Feel free to make more pages about yourself, and add as much styling as you wish! As long as your site meets the requirements, you will receive full credit!

#### Grading

```
CS 240 Homework (Github Pages)


----------------------------------------------------------
[20/20pts] Content

> You wrote all HTML and CSS yourself (without using some
  code generation tool). Your CSS abides by above the
  requirements.

> You included an image of yourself, with proper styling.

> Your resume is linked from your home page, and includes
  the sections listed in the requirements.

----------------------------------------------------------
[10/10pts] Commit History

> You are making and pushing commits at regular intervals
and with substantive, detailed commit messages.

> A 'resume' branch was created while you worked on
resume.html. It has also been merged, but not deleted.

----------------------------------------------------------
[0pts] Misc. Deductions
> Late?

----------------------------------------------------------
Suggestions (No Deductions)


Total: 30 pt
```
