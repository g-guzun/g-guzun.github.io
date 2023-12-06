## CS 475 - Operating Systems

### Hwk: Multi-Threaded Matrix Multiplication

Matrix-matrix multiplication (mmm) is a cumbersome, important process. It's commonly used in computer graphics, scientific computing, engineering applications, deep learning and AI, and so on. It's no wonder that mmm is found in many benchmarking suites for evaluating system performance and new architectures.

In this assignment, you will be implementing the parallel implementation of mmm.  Given two matrices $$a[n,n]$$ and $$b[n,n]$$, their product $$c[n,n]$$ is defined:

$$
c[i,j] = \sum_{k=0}^{n-1}a[i,k]\cdot b[k,j]
$$

$$
    \forall~i : 0 \le i \le n-1
$$

$$
    \forall~j : 0 \le j \le n-1
$$

For simplicity, you may assume that you'll only be multiplying square matrices in this assignment.


#### ZyBooks References

- 2D arrays
- Memory allocation of 2D arrays

#### Student Outcomes

- To write a multi-threaded program using the `pthread` library.
- To work with the work-sharing paradigm in parallel computing.
- To be exposed to timing runs and producing results for performance evaluation.

#### Starter Code

Starter code for this assignment is provided on the github repo. You are not required to submit your code to me on Github, but it's strongly recommended that you do.

- **This step is imperative:** Login to github, and go here: [https://github.com/davidtchiu/cs475-hwk5-mmm](https://github.com/davidtchiu/cs475-hwk5-mmm). Choose to _*fork*_ this repository over to your github account to obtain your own copy. Copy the Github URL to _your_ newly forked project. Then follow the rest of the instructions below. From VS Code, open a terminal, and _*clone*_ your forked Github repo down to your local working directory using:

   ```
   git clone <your-github-url-for-this-project>
   ```

#### Working Solution

I have included a working solution of my program along with the starter code. The binary executable file is called `mmmSol`. You can run it from the terminal by first navigating in to the Hwk directory and typing the command `./mmmSol`. 

#### Program Requirements

Before you get started: In this assignment each thread is writing to its own isolated location in memory. That is, threads are not contending to read/write from the *same* locations, and therefore **race conditions are not possible**. You should verify that this is the case. This helps simplify our parallelization work, because we don't need to synchronize their access across threads.

1. To run your program, you must support the following commands:

   ```
   $ ./mmm S <size>
   ```

   This will cause your program to run MMM in sequential mode on matrices of `size` by `size` dimension. There is no need to fire off a thread when running in sequential mode. Simply call the MMM function to compute the multiplication.

   or

   ```
   $ ./mmm P <threads> <size>
   ```

   This will cause your program to run MMM in parallel mode on matrices of `size` by `size` dimension. Specifically, the specified number of worker threads must be spawned by the main() thread, and the work of matrix multiplication should shared among those threads. The number of threads should be a positive integer, and it should not exceed `size`.

   In either mode, `size` should also be a positive integer. If running in parallel mode, it should be be less than the number of threads.

2. If the run syntax is incorrect or unexpected, print out an error (with a hint on proper syntax) and terminate.

   - **Proper run syntax:**
     This syntax will run a sequential version of the code on 25 by 25 matrices.

     ```
     $ ./mmm S 25
     ```

     This syntax will run a parallel program on 4 threads and 1000 by 1000 matrices.

     ```
     $ ./mmm P 4 1000
     ```

   - **Invalid run syntax:**
     The version below is incorrect because the size of the matrices does not follow `S`.
     ```
     $ ./mmm S
     ```
     The version below is incorrect the parallel version expects both the number of threads and the size of matrices, in that order.
     ```
     $ ./mmm P 1000
     ```

3. Your `main(int argc, char *argv[])`. Command-line arguments can be access through `argc` and `argv`. Specifically, `argc` refers to the number of tokens given on the command line, including the command to run the executable itself. `argv` is a string array containing the tokens given (much like the `String[] args` in Java).

4. Dynamically allocating 2D arrays: Because the number of threads and the `size` of the matrices are given at runtime, you *must*  allocate memory on the heap. Remember to free-up memory and clean up any dangling pointers when you're done using them. I would should store pointers to the input and output matrices in global scope. A pointer to a 2D array of `doubles` would look like this: `double **matrix;` Then inside `mmm_init()`, you'll need to first allocate `size` number of pointers to doubles (that's the first dimension in the matrix), then iterate through that array and allocate `size` number of doubles (that's the second dimension of the matrix).

      To accomplish this takes two steps (one in each "dimension" of the array.) Here's an example to create an N by M array of `ints`.

      ```c
      // declare this somewhere in global scope (for thread sharing)
      int **array;
      ```

      - The `**` syntax may at first seem confusing. However, recall from the last tutorial that an array is just a pointer. So, an array of pointers can be interpreted to be a pointer to pointers. Therefore, `array` has been declared as `**array`. (If you ever needed a 3 dimensional array, then you would use `***array`, and so on.)

      Elsewhere in your code,
   
      ```c
      // malloc a size N array of pointers to ints
      array = (int**) malloc(sizeof(int*) * N);

      // iterate through each row and malloc a size N array of ints
      for (int i = 0; i < N; i++) {
         array[i] = (int*) malloc(sizeof(int) * M;)
      }
      // can now have access to array[i][j]
      ```

   - Don't forget, you will need to free the 2D array later on. Do so by individually freeing every row, then free the original 2D pointer.

         ```c
         // free each row
         for (int i = 0; i < N; i++) {
            free(array[i]);
            array[i] = NULL;  // remove dangling pointer
         }
         // free original array
         free(array);
         array = NULL;  //remove dangling pointer
         ```

5. Once you successfully allocate the input matrices, you should initialize them with random double values between 0 and 99. Look into the [rand()](https://www.tutorialspoint.com/c_standard_library/c_function_rand.htm) function.

6. **Work-Sharing Approach:** If the parallel mode (`P`) is selected, your `main()` function must split the work evenly among threads. There are many ways to do this, and I'll leave this decision up to you. You're welcome to experiment with different approaches!

   - Maybe you can assign each thread to compute a set of rows in the result? A set of columns?  Would it make a difference in speed?
   - Maybe you could assign a thread to compute a block of elements instead of rows or columns?

   This decision will likely impact the performance of your parallel algorithm. Let's see how well you can do! You must also run the code sequentially, so that you can compare the speeds! (See below on how to clock the speeds).

   - Which ever work-sharing approach you use, remember to provide each thread (as an input argument to the thread function) its range of work. As I showed in class, this is usually through a `struct`. If you forget how to do this, refer to the examples I gave in class: [Parallel Sum](https://github.com/davidtchiu/cs475-parSum) and [Parallel Sort](https://github.com/davidtchiu/cs475-parInsertionSort).

7. Validation: An important final step is to verify that the parallel version of your code is correct. To do this, you should compare the matrices generated by the sequential algorithm and the parallel algorithm whenever the parallel mode `P` is run. Write a function to check that the greatest difference between any two corresponding elements of the output matrices generated by the sequential code and the parallel code is zero. This function does not need to be parallelized, and is only called after you run and clocked both sequential and parallel versions of code in `P` mode.

8. You must output the time taken, in seconds, for the calculation to take place. To do this, you should use the `rtclock()` function that is provided to you. When running in parallel mode, you should also show the **speedup** over the sequential version, defined $$T_{sequential} / T_{parallel}$$. If you did this right, you should experience significant speedup, since matrix multiplication has a significant fraction of code that is highly parallelizable.

   - Smoothing the results: Always run your program $$4$$ times: throwing away the time for the first run, and report the average time of the subsequent $$3$$ runs. This is to warm-up the cache (first run) and to smooth-out the results.

   - Only clock the relevant portions of code. For instance, do not consider the time it takes to allocate and free-up memory for the matrices, since these are performed for both sequential and parallel versions. Further, do not account for the time to verify the correctness of the parallel version. However, you must take into account the time it takes to create, join, and free-up threads in the parallel version, since they are considered necessary overheads for using threads.

#### Example Output

It should be noted that your mileage may vary, but yours should track my performance.

Sequential Mode Tests:
```
$ ./mmm
Usage: ./mmm <mode> [num threads] <size>


$ ./mmm S
Usage: ./mmm <mode> [num threads] <size>


$ ./mmm S 100
========
mode: sequential
thread count: 1
size: 100
========
Sequential Time (avg of 3 runs): 0.008636 sec


$ ./mmmSol S 200
========
mode: sequential
thread count: 1
size: 200
========
Sequential Time (avg of 3 runs): 0.067976 sec


$ ./mmmSol S 500
========
mode: sequential
thread count: 1
size: 500
========
Sequential Time (avg of 3 runs): 1.047883 sec
```

Parallel Mode Tests:
```
$ ./mmm P 100
Usage: parallel mode requires [num threads]


$ ./mmmSol P 2 100
========
mode: parallel
thread count: 2
size: 100
========
Sequential Time (avg of 3 runs): 0.008550 sec
Parallel Time (avg of 3 runs): 0.005048 sec
Speedup: 1.693560
Verifying... largest error between parallel and sequential matrix: 0.000000


$ ./mmmSol P 4 100
========
mode: parallel
thread count: 4
size: 100
========
Sequential Time (avg of 3 runs): 0.008634 sec
Parallel Time (avg of 3 runs): 0.002534 sec
Speedup: 3.407119
Verifying... largest error between parallel and sequential matrix: 0.000000


$ ./mmm P 2 200
========
mode: parallel
thread count: 2
size: 200
========
Sequential Time (avg of 3 runs): 0.067534 sec
Parallel Time (avg of 3 runs): 0.035498 sec
Speedup: 1.902490
Verifying... largest error between parallel and sequential matrix: 0.000000


$ ./mmm P 4 200
========
mode: parallel
thread count: 4
size: 200
========
Sequential Time (avg of 3 runs): 0.068096 sec
Parallel Time (avg of 3 runs): 0.017955 sec
Speedup: 3.792578
Verifying... largest error between parallel and sequential matrix: 0.000000


$ ./mmm P 2 500
========
mode: parallel
thread count: 2
size: 500
========
Sequential Time (avg of 3 runs): 1.048724 sec
Parallel Time (avg of 3 runs): 0.545044 sec
Speedup: 1.924108
Verifying... largest error between parallel and sequential matrix: 0.000000


$ ./mmm P 4 500
========
mode: parallel
thread count: 4
size: 500
========
Sequential Time (avg of 3 runs): 1.054960 sec
Parallel Time (avg of 3 runs): 0.272851 sec
Speedup: 3.866431
Verifying... largest error between parallel and sequential matrix: 0.000000


$ ./mmmSol P 2 1000
========
mode: parallel
thread count: 2
size: 1000
========
Sequential Time (avg of 3 runs): 8.370532 sec
Parallel Time (avg of 3 runs): 4.330151 sec
Speedup: 1.933081
Verifying... largest error between parallel and sequential matrix: 0.000000


$ ./mmmSol P 4 1000
========
mode: parallel
thread count: 4
size: 1000
========
Sequential Time (avg of 3 runs): 8.409772 sec
Parallel Time (avg of 3 runs): 2.184148 sec
Speedup: 3.850367
Verifying... largest error between parallel and sequential matrix: 0.000000
```


#### Grading

```
This assignment will be graded out of 60 points:

[5pt] User input is properly handled, and invalid commands generates an error.

[5pt] Sequential version of mmm is properly implemented.

[30pt] Parallel version of mmm is properly implemented.

[5pt] You must verify that parallel version is correct by comparing the result
      matrix with one generated using the sequential algorithm.

[5pt] Your work-sharing model for the parallel version is producing good
      performance.

[5pt] You are properly timing your results over multiple runs, and timing only
      relevant portions of code.

[5pt] Your program is free of memory leaks and dangling pointers.
```

#### Submitting Your Assignment

1. Commit and push your code to your Github repo. Make sure your repo is public (or private and accessible by me).

2. On canvas, simply submit the URL to your Github repo. No other form of submission is accepted.

#### Credits

Written by David Chiu. 2022.
