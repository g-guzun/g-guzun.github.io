## CS 475 - Operating Systems

### Bonus Hwk: Extra-Credit Report
Here's an opportunity to earn some bonus points, applied directly to your homework scores.

This course teaches broadly the various technologies that show up in common operating systems, but to its influence, we've also put a lot of things in the context of UNIX-based operating systems (e.g., Linux). In this bonus assignment you are asked to report on an OS of your own choosing.

#### Student Outcomes
- To become familiar with the structures of a new operating system.

#### Requirements
Prepare a technical report on an OS of choice. The OS does not have to be current, that is, an exploration of historical operating systems are welcome. Among other things, your report must include clear descriptions (e.g., using illustrations when necessary) of the following sections:

  - Describe its process/thread management support. What are the various process/thread states that your OS supports? Does your OS support threads? Something different (i.e., Windows 10 supports something called fibers?). How does your OS's treatment of processes/threads differ from what you learned in class, if at all?
  
  - Describe your OS's CPU scheduling policy. Is it multilevel? If so what are the policies at each level? How does a thread move between levels? You might comment on topics such as fairness, prevention of starvation, treatment of IO-bound vs. CPU-bound processes/threads, etc. Include a discussion of the pros and cons of its scheduling policy.

  - Describe its memory management in detail. What were some major design decisions (e.g., segmentation vs. paging vs. hybrid, etc.) they made, and why? How does the OS enforce memory protection among multiple processes? How is virtual memory implemented, and what are the policies involved?

  - Completion of the above three sections are *necessary* conditions for receiving any bonus points.

  - There is no page limit. However, note that the amount of points you stand to fetch corresponds to the detail and clarity in which you describe each section.

  - Your paper should be well-formed, free from grammar and spelling errors. You should not address each of the above points in a list but rather in well constructed paragraphs. Your paper should have an introduction, conclusion and bibliography. You should cite where you discovered the information that you include.

  - For Pete's sake, please don't use ChatGPT to write this report for you. If you use ChatGPT to provide information regarding an OS, please be reminded that its information is sometimes unreliable and flawed. Plus, you do have to cite your sources.

  - Your report should be submitted as a PDF document that you push to a Github repo.

  <!-- - Describe a filesystem that the OS supports by default. Describe certain structures, such as files' metadata (what and where they're stored), and any policies relating to how related blocks for a file are placed on disk. -->

<!-- If your OS does not support a filesystem, describe any one of your choosing (e.g., FAT32, NTFS, ext3, ext4, HFS, ...). Again, you are welcome to research one that is no longer used but has historical value (like FAT16 or Macintosh Filesystem). For the truly curious, you may also describe a distributed filesystem, such as lustre, NFS, HDFS, ... -->


#### Submitting Your Report
1. Commit and push your PDF document (only PDF) to your Github repo. Make sure your repo is public (or private and accessible by me).

2. On canvas, simply submit the URL to your Github repo. No other form of submission is accepted.


#### Grading
This assignment will be graded out of **+20 points**.  Any points fetched will be applied directly to your overall homework score. 

```
[5pt] Process/Thread support section.
[5pt] CPU Scheduling section.
[5pt] Memory management section.
[5pt] Grammar and spelling.
```