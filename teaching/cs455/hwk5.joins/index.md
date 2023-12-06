## CS 455 - Principles of Database Systems

### Hwk: Join Processing

This assignment give you some hands-on experience programming several classical implementations of the natural join $$R\bowtie S$$ operation, one of the key algorithms in relational database systems. You may choose between Java and Python.



#### Student Outcomes
- Gain insight into the performance of several join-processing algorithms.

#### Required Files

The following file(s) have been provided for this assignment.

- [data.zip](data.zip)

<!-- 
#### Overview
- Nested-Loop Join: The nested-loop join is the naive approach, and its mechanism follows what you've been taught the $$R \bowtie S$$ relational operator does. It loops through each tuple in $$R$$ and $$S$$ and produces a concatenated tuple if the values of their common attributes are equal. The pseudocode of the nested-loop join is given below.

	```java
	Input: Relation R, Relation S
	Output: Relation T

	// Let c denote the name of the common attribute
	// Let t.c denote the value of attribute c in some tuple t

	T = empty relation
	for each tuple r in R
		for each tuple s in S
				if (r.c == s.c)
					create new tuple (r,s) and add it to T
	return T
	```

- Hash Join: The hash join algorithm has two distinct phases. Phase I builds a hashmap over relation $$R$$. Each map entry is keyed on the value of the common attribute and stores the tuple in $$R$$. Important: It is for this reason that the common attribute $$R.c$$ must have unique values (e.g., be a key) in $$R$$. If $$R.c$$ were not unique, then different tuples would collide (and overwrite each other) in the hashmap. Phase II then iterates through each tuple in $$S$$ and searches for the value of its common attribute in the hash map. If it exists in the map, then there is equivalence on common attributes in both relations, and the concatenated tuple is retained in the result. Otherwise the tuple in $$S$$ is discarded.

	```java
	Precondition: The common attribute in R must be unique
	Input: Relation R, Relation S
	Output: Relation T

	// Let c denote the name of the common attribute
	// Let t.c denote the value of attribute c in some tuple t
	T = empty relation

	// Phase I: Hash every tuple of R by the value 
	// of the common attribute
	map = new hashmap
	for each tuple r in R {
		
		List L = map.get(r.c)
		if (L == null) {
			L = new List()
			map.put(r.c, new List())
		}
		add r to List L
	}

	// Phase II: Join up with S
	for each tuple s in S {
		if (s.c in map) {
			List L = map.get(s.c)
			for each tuple r in L:
				create new tuple (r,s) and add it to T
		}
	}
	return T
	```

- Sort-Merge Join: The sort-merge join assumes that the tuples in both relations are sorted on their common attributes. We use cursors i and j to track the row positions of relation R and S, respectively. We shift the cursors down until we exceed one of the relations. When a match on their common attributes is found, we enter the merge phase, in which we concatenate both tuples, while moving S's cursor down. You can think of the merge phase as a baby nested loop join on the tuples that match. When S's cursor refers to a tuple that is no longer a match, then R's cursor moves increments and S's cursor resets.

	```java
	Input: Relation R, Relation S
	Output: Relation T

	// Let c denote the name of the common attribute
	// Let t.c denote the value of attribute c in some tuple t

	if (R is not sorted on values of c) {
		sort R on R.c
	}
	if (S is not sorted on values of c) {
		sort S on S.c
	}

	T = empty relation
	i = 0
	j = 0
	while (i < R.size() && j < S.size()) {
		// Match found, enter merge phase
		if (R[i].c == S[j].c) {
			while (R[i].c == S[j].c && i < R.size()) {
				k = j
				while (R[i].c == S[k].c && k < S.size()) {
					create new tuple (R[i], S[k]) and add it to T
					k++
				}
				i++
			}
		}
		else if (R[i].c < S[j].c)
			i++
		else
			j++
	}
	return T
	``` -->

#### Database Schema (Data Dictionary)
Inside the `data/` directory, you'll find a file describing the database schema called `schema.txt`, which is illustrated below. 

![schema.png](schema.png)


This file is formatted as follows:

```txt
[relation name]
[comma-separated list of attributes]
[data file]
[blank line]
...
```

For instance, the `productlines` table:
```txt
Productlines
productLine,textDescription,htmlDescription,image
productlines.txt
```


#### Database Files
Also inside the `data/` directory in the given project starter file, you find a set of files. Each file contains data for a table in the following schema:


The format of these files is as follows, where `val_i` is the value of the ith attribute.

```txt
val_1|val_2|...|val_N
val_1|val_2|...|val_N
val_1|val_2|...|val_N
val_1|val_2|...|val_N
val_1|val_2|...|val_N
.
.
.
```

#### Program Requirements
You have the choice to write this program in either Python or Java. Just be sure to let me know how to run you program.

1. When the program starts, you should immediately read in the `schema.txt` file to understand what tables you have, and what their attributes are. For grading, I will be using completely different files (with different file names). Your program can assume that all relevant files are placed in the `data/` directory in your project directory. You should test rigorously with your own toy-files to ensure that your program can accept arbitrary data sets. 

	 Avoid hardcoding absolute file paths in your code (for instance avoid hardcoding things like `/Users/Johnny/Desktop/CS455/Hwk5/data`). Points will be deducted if I can't easily run your program with database files on my machine. 

	 **Do not attempt to open any other database files. These files are only to be opened when you run the join algorithm.**

2. Prompt the user to enter the names of the relations across which they'd like to perform the natural join. You should accept their inputs on a single line, separated by space. You may assume that at most two relations will be input. If a relation name they entered does not exist (case insensitive), your program should re-prompt. Otherwise, you should present the user with a menu, allowing the user to select which join algorithm to run. When the user is done making their choice, the join processing should then output the result; the time elapsed in milliseconds; and the number of rows produced by the natural join.

3. You just need to implement the **Nested Loop Join** and **Hash Join** algorithms.

4. If a common attribute does not exist between the tables, your join algorithms should produce the cartesian product. You may assume that there is **at most** one common attribute between two relations. Even though it holds in this particular data set, do not assume that the common attribute is always the first attribute in the relation. 

5. The ordering of attributes must be preserved in the joined result. For instance, when applying $$R(A,B,C)~\bowtie~S(X,C,Y,Z)$$, the resulting relation should have the following attribute ordering: $$(A,B,C,X,C,Y,Z)$$. This means you should preserve the original attribute ordering of $$R$$ and $$S$$. You do not have to remove the duplicate common attribute column.

6. **Out of core execution**: We assume that the data files are huge and cannot be fit completely in memory (even though that is not the case with the files I provided to you.) Ensure that you are *not* reading all rows into a list for processing joins. To preserve memory, you should only read in a line from file when you actually to. The algorithms on the slides should be followed. 

	 - Besides the HashMap for the HashJoin algorithm, you are not allowed to use any auxiliary data structures for storing tuples.

7. Your program should continuously prompt after each join operation is completed. It should only exit if `.quit` was input as a relation name.

8. Other items worth considering:

	 - Style and effective commenting is expected. Please include your name on top of every class file.

	 - If your code does not compile/run without error, you will receive a zero for this assignment.

	 - Rest assured that my input files will all be well-formed to the above specifications, and I will not use files that do not conform just to trip your program up. Spend your time making sure your algorithms are correct.



#### Sample Output
Here is $$Offices \bowtie Employees$$ using nested loop join:

```txt
Available relations:
* Orders
* Products
* Customers
* Productlines
* Employees
* Payments
* Orderdetails
* Offices

Tables to Join (or enter '.quit' to exit): Offices Employees
Choose a join algorithm:
1. Nested loop Join
2. Hash Join
Your selection: 1
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1002|Murphy|Diane|x5800|dmurphy@classicmodelcars.com|1|NULL|President
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1056|Patterson|Mary|x4611|mpatterso@classicmodelcars.com|1|1002|VP Sales
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1076|Firrelli|Jeff|x9273|jfirrelli@classicmodelcars.com|1|1002|VP Marketing
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1143|Bow|Anthony|x5428|abow@classicmodelcars.com|1|1056|Sales Manager (NA)
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1165|Jennings|Leslie|x3291|ljennings@classicmodelcars.com|1|1143|Sales Rep
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1166|Thompson|Leslie|x4065|lthompson@classicmodelcars.com|1|1143|Sales Rep
2|Boston|+1 215 837 0825|1550 Court Place|Suite 102|MA|USA|02107|NA|1188|Firrelli|Julie|x2173|jfirrelli@classicmodelcars.com|2|1143|Sales Rep
2|Boston|+1 215 837 0825|1550 Court Place|Suite 102|MA|USA|02107|NA|1216|Patterson|Steve|x4334|spatterson@classicmodelcars.com|2|1143|Sales Rep
3|NYC|+1 212 555 3000|523 East 53rd Street|apt. 5A|NY|USA|10022|NA|1286|Tseng|Foon Yue|x2248|ftseng@classicmodelcars.com|3|1143|Sales Rep
3|NYC|+1 212 555 3000|523 East 53rd Street|apt. 5A|NY|USA|10022|NA|1323|Vanauf|George|x4102|gvanauf@classicmodelcars.com|3|1143|Sales Rep
4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA|1102|Bondur|Gerard|x5408|gbondur@classicmodelcars.com|4|1056|Sale Manager (EMEA)
4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA|1337|Bondur|Loui|x6493|lbondur@classicmodelcars.com|4|1102|Sales Rep
4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA|1370|Hernandez|Gerard|x2028|ghernande@classicmodelcars.com|4|1102|Sales Rep
4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA|1401|Castillo|Pamela|x2759|pcastillo@classicmodelcars.com|4|1102|Sales Rep
4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA|1702|Gerard|Martin|x2312|mgerard@classicmodelcars.com|4|1102|Sales Rep
5|Tokyo|+81 33 224 5000|4-1 Kioicho|NULL|Chiyoda-Ku|Japan|102-8578|Japan|1621|Nishi|Mami|x101|mnishi@classicmodelcars.com|5|1056|Sales Rep
5|Tokyo|+81 33 224 5000|4-1 Kioicho|NULL|Chiyoda-Ku|Japan|102-8578|Japan|1625|Kato|Yoshimi|x102|ykato@classicmodelcars.com|5|1621|Sales Rep
6|Sydney|+61 2 9264 2451|5-11 Wentworth Avenue|Floor #2|NULL|Australia|NSW 2010|APAC|1088|Patterson|William|x4871|wpatterson@classicmodelcars.com|6|1056|Sales Manager (APAC)
6|Sydney|+61 2 9264 2451|5-11 Wentworth Avenue|Floor #2|NULL|Australia|NSW 2010|APAC|1611|Fixter|Andy|x101|afixter@classicmodelcars.com|6|1088|Sales Rep
6|Sydney|+61 2 9264 2451|5-11 Wentworth Avenue|Floor #2|NULL|Australia|NSW 2010|APAC|1612|Marsh|Peter|x102|pmarsh@classicmodelcars.com|6|1088|Sales Rep
6|Sydney|+61 2 9264 2451|5-11 Wentworth Avenue|Floor #2|NULL|Australia|NSW 2010|APAC|1619|King|Tom|x103|tking@classicmodelcars.com|6|1088|Sales Rep
7|London|+44 20 7877 2041|25 Old Broad Street|Level 7|NULL|UK|EC2N 1HN|EMEA|1501|Bott|Larry|x2311|lbott@classicmodelcars.com|7|1102|Sales Rep
7|London|+44 20 7877 2041|25 Old Broad Street|Level 7|NULL|UK|EC2N 1HN|EMEA|1504|Jones|Barry|x102|bjones@classicmodelcars.com|7|1102|Sales Rep
Rows = 23
Time = 75.76233 ms
```


Here is $$Employees \bowtie Offices$$ over nested loop join. Should get the "same" results as above, except the first half and second half of the attributes are flipped in order.
```txt
Available relations:
* Orders
* Products
* Customers
* Productlines
* Employees
* Payments
* Orderdetails
* Offices

Tables to Join (or enter '.quit' to exit): Employees Offices
Choose a join algorithm:
1. Nested loop Join
2. Hash Join
Your selection: 1
1002|Murphy|Diane|x5800|dmurphy@classicmodelcars.com|1|NULL|President|1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA
1056|Patterson|Mary|x4611|mpatterso@classicmodelcars.com|1|1002|VP Sales|1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA
1076|Firrelli|Jeff|x9273|jfirrelli@classicmodelcars.com|1|1002|VP Marketing|1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA
1088|Patterson|William|x4871|wpatterson@classicmodelcars.com|6|1056|Sales Manager (APAC)|6|Sydney|+61 2 9264 2451|5-11 Wentworth Avenue|Floor #2|NULL|Australia|NSW 2010|APAC
1102|Bondur|Gerard|x5408|gbondur@classicmodelcars.com|4|1056|Sale Manager (EMEA)|4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA
1143|Bow|Anthony|x5428|abow@classicmodelcars.com|1|1056|Sales Manager (NA)|1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA
1165|Jennings|Leslie|x3291|ljennings@classicmodelcars.com|1|1143|Sales Rep|1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA
1166|Thompson|Leslie|x4065|lthompson@classicmodelcars.com|1|1143|Sales Rep|1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA
1188|Firrelli|Julie|x2173|jfirrelli@classicmodelcars.com|2|1143|Sales Rep|2|Boston|+1 215 837 0825|1550 Court Place|Suite 102|MA|USA|02107|NA
1216|Patterson|Steve|x4334|spatterson@classicmodelcars.com|2|1143|Sales Rep|2|Boston|+1 215 837 0825|1550 Court Place|Suite 102|MA|USA|02107|NA
1286|Tseng|Foon Yue|x2248|ftseng@classicmodelcars.com|3|1143|Sales Rep|3|NYC|+1 212 555 3000|523 East 53rd Street|apt. 5A|NY|USA|10022|NA
1323|Vanauf|George|x4102|gvanauf@classicmodelcars.com|3|1143|Sales Rep|3|NYC|+1 212 555 3000|523 East 53rd Street|apt. 5A|NY|USA|10022|NA
1337|Bondur|Loui|x6493|lbondur@classicmodelcars.com|4|1102|Sales Rep|4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA
1370|Hernandez|Gerard|x2028|ghernande@classicmodelcars.com|4|1102|Sales Rep|4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA
1401|Castillo|Pamela|x2759|pcastillo@classicmodelcars.com|4|1102|Sales Rep|4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA
1501|Bott|Larry|x2311|lbott@classicmodelcars.com|7|1102|Sales Rep|7|London|+44 20 7877 2041|25 Old Broad Street|Level 7|NULL|UK|EC2N 1HN|EMEA
1504|Jones|Barry|x102|bjones@classicmodelcars.com|7|1102|Sales Rep|7|London|+44 20 7877 2041|25 Old Broad Street|Level 7|NULL|UK|EC2N 1HN|EMEA
1611|Fixter|Andy|x101|afixter@classicmodelcars.com|6|1088|Sales Rep|6|Sydney|+61 2 9264 2451|5-11 Wentworth Avenue|Floor #2|NULL|Australia|NSW 2010|APAC
1612|Marsh|Peter|x102|pmarsh@classicmodelcars.com|6|1088|Sales Rep|6|Sydney|+61 2 9264 2451|5-11 Wentworth Avenue|Floor #2|NULL|Australia|NSW 2010|APAC
1619|King|Tom|x103|tking@classicmodelcars.com|6|1088|Sales Rep|6|Sydney|+61 2 9264 2451|5-11 Wentworth Avenue|Floor #2|NULL|Australia|NSW 2010|APAC
1621|Nishi|Mami|x101|mnishi@classicmodelcars.com|5|1056|Sales Rep|5|Tokyo|+81 33 224 5000|4-1 Kioicho|NULL|Chiyoda-Ku|Japan|102-8578|Japan
1625|Kato|Yoshimi|x102|ykato@classicmodelcars.com|5|1621|Sales Rep|5|Tokyo|+81 33 224 5000|4-1 Kioicho|NULL|Chiyoda-Ku|Japan|102-8578|Japan
1702|Gerard|Martin|x2312|mgerard@classicmodelcars.com|4|1102|Sales Rep|4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA
Rows = 23
Time = 67.18192 ms
```

Here are my times for $$Orders \bowtie Orderdetails$$:
```
(For Nested loop join)
Rows = 2996
Time = 771.565083 ms

(For Hash Join)
Rows = 2996
Time = 141.454531 ms
```

Here are my times for $$Customers \bowtie Payments$$:
```
(For Nested loop join)
Rows = 273
Time = 105.08738 ms

(For Hash Join)
Rows = 273
Time = 67.924224 ms
```

Here are my times for $$Orders \bowtie Products$$. (No common attributes)
```
(For Nested loop join)
Rows = 35860
Time = 2317.917919 ms

(For Hash Join)
Rows = 35860
Time = 1805.988437 ms
```

#### Grading

```
This assignment will be graded out of 80 points.

[15pt] The user interface is coded as prescribed above. The program exits on '.quit'
[10pt] The schema file is read and parsed on start.
[10pt] Attribute order is preserved in the result.
[20pt] Nested loop join is correctly implemented. Algorithm is out of core. Cartesian
       product is produced when a common attribute doesn't exist.
[20pt] Hash join is correctly implemented. Algorithm is out of core. Cartesian
       product is produced when a common attribute doesn't exist.
[5pt]  Your algorithms are proper timed, and elapsed time should be reported
       in milliseconds (ms). Number of rows are output.
```

#### Submitting Your Assignment

After you have completed the homework, zip up your files and submit your work on Canvas.

#### Credits

Written by David Chiu.
