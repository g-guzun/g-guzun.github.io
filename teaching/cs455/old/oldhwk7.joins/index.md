## CS 455 - Principles of Database Systems

### Hwk: Implementing Joins

#### Student Outcomes

- To gain insight into the mechanics and performance of classic join algorithms.
- To gain insight into when to apply certain join algorithms.
- To implement hash join, sort-merge join, and nested-loop join algorithms.

#### Required Files

Download the file below, and extract it into your project directory.

- [data_testing.zip](data_testing.zip) - This file contains some small relations for testing.
- [classicmodels.zip](classicmodels.zip) - This file contains the [classicmodels database](http://richardtwatson.com/dm6e/Reader/ClassicModels.html).

#### Instructions

In this assignment, you will get some hands-on experience programming several classical implementations of the natural join ($$R \bowtie S$$) operation, one of the key algorithms in relational database systems. Specifically, you will be implementing the 3 natural-join algorithms we learned in class. Their pseudo-codes are listed in the slides.

<!-- - **Nested-Loop Join**
  The nested-loop join is the naive approach, and its mechanism follows almost exactly what you've been taught the $$R \bowtie S$$ relational operator does. It loops through each tuple in $R$ and $S$ and produces a concatenated tuple if the values of their common attributes are all equal. The pseudocode of the nested-loop join is given below.

  ```
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

- **Hash Join**
  The hash join algorithm has two distinct phases. Phase I builds a hashmap over relation
  $$R$$. Each map entry is keyed on the value of the common attribute and stores the tuple in
  $$R$$. Important: It is for this reason that the common attribute $$R.c$$ must have unique values (e.g., be a key) in $$R$$. If $$R.c$$ were not unique, then different tuples would collide (and overwrite each other) in the hashmap. Phase II then iterates through each tuple in
  $$S$$ and searches for the value of its common attribute in the hash map. If it exists in the map, then there is equivalence on common attributes in both relations, and the concatenated tuple is retained in the result. Otherwise the tuple in
  $$S$$ is discarded.

  ```
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
    if (!map.containsKey(r.c)) {
      insert <key=r.c, value=r> into map
    }
    else {
          exception: Hash-join cannot be performed
          exception: The common attribute in R must be unique
          return T
    }
  }

  // Phase II: Join up with S
  for each tuple s in S {
        if (s.c in map) {
          r = lookup(s.c) in map
          create new tuple (r,s) and add it to T
        }
  }
  return T
  ```

- **Sort-Merge Join**
  The sort-merge join assumes that the tuples in both relations are sorted on their common attributes. We use cursors $$i$$ and $$j$$ to track the row positions of relation $$R$$ and $$S$$, respectively. We shift the cursors down until we exceed one of the relations. When a match on their common attributes is found, we enter the merge phase, in which we concatenate both tuples, while moving $$S$$'s cursor down. You can think of the merge phase as a baby nested loop join on the tuples that match. When $$S$$'s cursor refers to a tuple that is no longer a match, then $$R$$'s cursor moves increments and $$S$$'s cursor resets.

  ```
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

#### Database Files

Inside the `data/` directory in the given project starter file, you are provided a set of files. Each file contains data for a relation in the following schema:

<center><img src="figures/schema.png" width="500px"/></center>

The format of these files is as follows, where `attr_i` is the name of the `i`th attribute and `val_i` is the value of the `i`th attribute.

```
#attr_1|attr_2|...|attr_N
#sorting_attr (optional)
val_1|val_2|...|val_N
val_1|val_2|...|val_N
val_1|val_2|...|val_N
val_1|val_2|...|val_N
val_1|val_2|...|val_N
.
.
.
```

Comments in the file are preceded by a `#`. The comment on the first line has all the attribute names. The second comment may or may not exist. If it's specified, then it contains the name of the attribute by which all tuples in the file is sorted. If this comment does not exist, then the tuples are not sorted in any way. It's a good idea to open them up just to see what's stored inside before moving on. Here are some characteristics of all the relations, which you will find useful when testing.

- `customers`: 122 tuples, sorted on `customerNumber`
- `orders`: 326 tuples, sorted on `orderNumber`
- `orderdetails`: 2996 tuples, sorted on `orderNubmer`
- `payments`: 273 tuples, sorted on `customerNumber`
- `productlines`: 7 tuples, unsorted heap file
- `products`: 110 tuples, sorted on `productCode`
- `employees`: 23 tuples, sorted on `employeeNumber`
- `offices`: 7 tuples, sorted on `officeCode`

#### Program Requirements

**You must write this program in Java.** There are no restrictions on how you choose to implement this program, but it's probably a good idea to have _at least_ three classes: a driver class that has only the main method, a `Relation` class, and a `Tuple` class. I also found it useful to have an `Attribute` class and a `Comparator` class to order the Tuples.

- Create a class in your project called JoinEngine that only has the `main()` method. When the program starts, you should read every file in the `data/` directory into a object representing a relation. You must use the file name, minus the file extension (`.txt`), as the name of the relation. For grading, I will be using completely different files (with different file names). Your program must work, assuming that my `data/` directory will be placed in your project directory. You should test rigorously with your own toy-files to ensure that your program can accept arbitrary data sets. Assignments that fail to work with my data sets will be returned without a grade. Look into using the `File` class' `listFiles()` method.

  - Avoid hardcoding absolute file paths in your code. Points will be deducted if I can't easily run your program with database files on my machine.
  - You must ignore any file whose filename starts with a dot.

- After all the files have been input, you should prompt the user to enter the relations across which they'd like to perform the natural join. If any relations they entered do not exist (case insensitive), your program should throw an `IllegalArgumentException` and exit. Otherwise, you should present the user with a menu, allowing the user to select from one of the three join algorithms. When the user is done making their choice, the join processing should then occur, and you must output the resulting relation, the time elapsed in milliseconds (look into `System.nanoTime()`), and the number of rows returned in the result set. When reporting the time, do not include the time elapsed to print out the table -- only include the time taken to perform the join algorithm.

- If a common attribute does not exist between the tables, you may either throw an exception or, more accurately, you could also produce the cartesian product. Otherwise, you may assume that there is _at most one_ common attribute between two relations. If a common attribute does exist then:

  - The nested loop join should occur unconditionally.

  - The sort-merge join must sort the tuples in both tables only if they are not already sorted on the common attribute. Further, it must take $$O(1)$$
    time for you to determine whether the tuples are already sorted on the common attribute. To sort tuples, you must store your `Tuples` in a List and then there are two ways: (1) your `Tuple` class can implement `Comparable`, then override `compareTo()` to establish natural ordering and call `Collections.sort(...)`, or (2) you could create a class that implements `Comparator<Tuple>`, and plug the list and the comparator into `Collections.sort(...)`.

  - Even though it holds in this particular data set, you cannot assume that the common attribute is always the first attribute in the relation.

- The ordering of attributes must be preserved in the joined relation. For instance, when applying
  $$R(A,B,C)\bowtie S(X,C,Y,Z)$$, the resulting relation should have the following attribute ordering:
  $$(A,B,C,X,Y,Z)$$. This means you should preserve the original attribute ordering of $$R$$ and
  $$S$$, and remove the common attribute from $$S$$.

#### Other items worth considering include:

- A relation's list of attribute names should NOT be added as a tuple.

- Style and effective (Javadocs) commenting is expected. Please include your name on top of every class file.

- You will be graded on generating correct output, code documentation and code design (be sure to handle exceptions gracefully).

- If your code does not compile, you will receive a zero for this assignment.

- Rest assured that my input file will be well-formed (to the above specifications) and does not contain garbage inputs.

#### Selected Outputs (on data_testing DB)

ade_sorted_unique abc_sorted_notunique over Nested Loop Join

```
D|A|E|B|C
d5|a1|e5|b0|c0
d5|a1|e5|b1|c1
d3|a3|e3|b3|c3
d3|a3|e3|b4|c4
d1|a5|e1|b5|c5
```

abc_unsorted_notunique ade_unsorted_unique over Nested Loop Join

```
A|B|C|D|E
a1|b0|c0|d5|e5
a5|b5|c5|d1|e1
a1|b1|c1|d5|e5
a3|b3|c3|d3|e3
a3|b4|c4|d3|e3
```

abc_sorted_notunique ade_unsorted_unique over HashJoin

```
A|B|C|D|E
a1|b0|c0|d5|e5
a1|b1|c1|d5|e5
a5|b5|c5|d1|e1
a3|b3|c3|d3|e3
a3|b4|c4|d3|e3
```

ade_unsorted_unique abc_sorted_notunique over HashJoin

```
D|A|E|B|C
d5|a1|e5|b0|c0
d5|a1|e5|b1|c1
d3|a3|e3|b3|c3
d3|a3|e3|b4|c4
d1|a5|e1|b5|c5
```

abc_sorted_notunique ade_sorted_unique over SortJoin

```
A|B|C|D|E
a1|b0|c0|d5|e5
a1|b1|c1|d5|e5
a3|b3|c3|d3|e3
a3|b4|c4|d3|e3
a5|b5|c5|d1|e1
```

abc_unsorted_notunique ade_unsorted_unique over SortJoin

```
A|B|C|D|E
a1|b0|c0|d5|e5
a1|b1|c1|d5|e5
a3|b3|c3|d3|e3
a3|b4|c4|d3|e3
a5|b5|c5|d1|e1
```

#### Selected Outputs (on classic models DB)

Here is $$offices \bowtie employees$$ over sort-merge join:

```
Available relations:

   offices payments orderdetails orders customers productlines employees products

Your selection (separated by space): offices employees
Choose a join algorithm:
1. Nested loop join
2. Hash Join
3. Sort-Merge Join
Your selection: 3

officeCode|city|phone|addressLine1|addressLine2|state|country|postalCode|territory|employeeNumber|lastName|firstName|extension|email|reportsTo|jobTitle|
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1002|Murphy|Diane|x5800|dmurphy@classicmodelcars.com|NULL|President
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1056|Patterson|Mary|x4611|mpatterso@classicmodelcars.com|1002|VP Sales
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1076|Firrelli|Jeff|x9273|jfirrelli@classicmodelcars.com|1002|VP Marketing
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1143|Bow|Anthony|x5428|abow@classicmodelcars.com|1056|Sales Manager (NA)
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1165|Jennings|Leslie|x3291|ljennings@classicmodelcars.com|1143|Sales Rep
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1166|Thompson|Leslie|x4065|lthompson@classicmodelcars.com|1143|Sales Rep
2|Boston|+1 215 837 0825|1550 Court Place|Suite 102|MA|USA|02107|NA|1188|Firrelli|Julie|x2173|jfirrelli@classicmodelcars.com|1143|Sales Rep
2|Boston|+1 215 837 0825|1550 Court Place|Suite 102|MA|USA|02107|NA|1216|Patterson|Steve|x4334|spatterson@classicmodelcars.com|1143|Sales Rep
3|NYC|+1 212 555 3000|523 East 53rd Street|apt. 5A|NY|USA|10022|NA|1286|Tseng|Foon Yue|x2248|ftseng@classicmodelcars.com|1143|Sales Rep
3|NYC|+1 212 555 3000|523 East 53rd Street|apt. 5A|NY|USA|10022|NA|1323|Vanauf|George|x4102|gvanauf@classicmodelcars.com|1143|Sales Rep
4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA|1102|Bondur|Gerard|x5408|gbondur@classicmodelcars.com|1056|Sale Manager (EMEA)
4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA|1337|Bondur|Loui|x6493|lbondur@classicmodelcars.com|1102|Sales Rep
4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA|1370|Hernandez|Gerard|x2028|ghernande@classicmodelcars.com|1102|Sales Rep
4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA|1401|Castillo|Pamela|x2759|pcastillo@classicmodelcars.com|1102|Sales Rep
4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA|1702|Gerard|Martin|x2312|mgerard@classicmodelcars.com|1102|Sales Rep
5|Tokyo|+81 33 224 5000|4-1 Kioicho|NULL|Chiyoda-Ku|Japan|102-8578|Japan|1621|Nishi|Mami|x101|mnishi@classicmodelcars.com|1056|Sales Rep
5|Tokyo|+81 33 224 5000|4-1 Kioicho|NULL|Chiyoda-Ku|Japan|102-8578|Japan|1625|Kato|Yoshimi|x102|ykato@classicmodelcars.com|1621|Sales Rep
6|Sydney|+61 2 9264 2451|5-11 Wentworth Avenue|Floor #2|NULL|Australia|NSW 2010|APAC|1088|Patterson|William|x4871|wpatterson@classicmodelcars.com|1056|Sales Manager (APAC)
6|Sydney|+61 2 9264 2451|5-11 Wentworth Avenue|Floor #2|NULL|Australia|NSW 2010|APAC|1611|Fixter|Andy|x101|afixter@classicmodelcars.com|1088|Sales Rep
6|Sydney|+61 2 9264 2451|5-11 Wentworth Avenue|Floor #2|NULL|Australia|NSW 2010|APAC|1612|Marsh|Peter|x102|pmarsh@classicmodelcars.com|1088|Sales Rep
6|Sydney|+61 2 9264 2451|5-11 Wentworth Avenue|Floor #2|NULL|Australia|NSW 2010|APAC|1619|King|Tom|x103|tking@classicmodelcars.com|1088|Sales Rep
7|London|+44 20 7877 2041|25 Old Broad Street|Level 7|NULL|UK|EC2N 1HN|EMEA|1501|Bott|Larry|x2311|lbott@classicmodelcars.com|1102|Sales Rep
7|London|+44 20 7877 2041|25 Old Broad Street|Level 7|NULL|UK|EC2N 1HN|EMEA|1504|Jones|Barry|x102|bjones@classicmodelcars.com|1102|Sales Rep

Time = 2.806131 ms
```

Here is $$offices \bowtie employees$$ over hash join:

```
Available relations:

   offices payments orderdetails orders customers productlines employees products

Your selection (separated by space): offices employees
Choose a join algorithm:
1. Nested loop join
2. Hash Join
3. Sort-Merge Join
Your selection: 2

officeCode|city|phone|addressLine1|addressLine2|state|country|postalCode|territory|employeeNumber|lastName|firstName|extension|email|reportsTo|jobTitle|
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1002|Murphy|Diane|x5800|dmurphy@classicmodelcars.com|NULL|President
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1056|Patterson|Mary|x4611|mpatterso@classicmodelcars.com|1002|VP Sales
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1076|Firrelli|Jeff|x9273|jfirrelli@classicmodelcars.com|1002|VP Marketing
6|Sydney|+61 2 9264 2451|5-11 Wentworth Avenue|Floor #2|NULL|Australia|NSW 2010|APAC|1088|Patterson|William|x4871|wpatterson@classicmodelcars.com|1056|Sales Manager (APAC)
4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA|1102|Bondur|Gerard|x5408|gbondur@classicmodelcars.com|1056|Sale Manager (EMEA)
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1143|Bow|Anthony|x5428|abow@classicmodelcars.com|1056|Sales Manager (NA)
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1165|Jennings|Leslie|x3291|ljennings@classicmodelcars.com|1143|Sales Rep
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1166|Thompson|Leslie|x4065|lthompson@classicmodelcars.com|1143|Sales Rep
2|Boston|+1 215 837 0825|1550 Court Place|Suite 102|MA|USA|02107|NA|1188|Firrelli|Julie|x2173|jfirrelli@classicmodelcars.com|1143|Sales Rep
2|Boston|+1 215 837 0825|1550 Court Place|Suite 102|MA|USA|02107|NA|1216|Patterson|Steve|x4334|spatterson@classicmodelcars.com|1143|Sales Rep
3|NYC|+1 212 555 3000|523 East 53rd Street|apt. 5A|NY|USA|10022|NA|1286|Tseng|Foon Yue|x2248|ftseng@classicmodelcars.com|1143|Sales Rep
3|NYC|+1 212 555 3000|523 East 53rd Street|apt. 5A|NY|USA|10022|NA|1323|Vanauf|George|x4102|gvanauf@classicmodelcars.com|1143|Sales Rep
4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA|1337|Bondur|Loui|x6493|lbondur@classicmodelcars.com|1102|Sales Rep
4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA|1370|Hernandez|Gerard|x2028|ghernande@classicmodelcars.com|1102|Sales Rep
4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA|1401|Castillo|Pamela|x2759|pcastillo@classicmodelcars.com|1102|Sales Rep
7|London|+44 20 7877 2041|25 Old Broad Street|Level 7|NULL|UK|EC2N 1HN|EMEA|1501|Bott|Larry|x2311|lbott@classicmodelcars.com|1102|Sales Rep
7|London|+44 20 7877 2041|25 Old Broad Street|Level 7|NULL|UK|EC2N 1HN|EMEA|1504|Jones|Barry|x102|bjones@classicmodelcars.com|1102|Sales Rep
6|Sydney|+61 2 9264 2451|5-11 Wentworth Avenue|Floor #2|NULL|Australia|NSW 2010|APAC|1611|Fixter|Andy|x101|afixter@classicmodelcars.com|1088|Sales Rep
6|Sydney|+61 2 9264 2451|5-11 Wentworth Avenue|Floor #2|NULL|Australia|NSW 2010|APAC|1612|Marsh|Peter|x102|pmarsh@classicmodelcars.com|1088|Sales Rep
6|Sydney|+61 2 9264 2451|5-11 Wentworth Avenue|Floor #2|NULL|Australia|NSW 2010|APAC|1619|King|Tom|x103|tking@classicmodelcars.com|1088|Sales Rep
5|Tokyo|+81 33 224 5000|4-1 Kioicho|NULL|Chiyoda-Ku|Japan|102-8578|Japan|1621|Nishi|Mami|x101|mnishi@classicmodelcars.com|1056|Sales Rep
5|Tokyo|+81 33 224 5000|4-1 Kioicho|NULL|Chiyoda-Ku|Japan|102-8578|Japan|1625|Kato|Yoshimi|x102|ykato@classicmodelcars.com|1621|Sales Rep
4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA|1702|Gerard|Martin|x2312|mgerard@classicmodelcars.com|1102|Sales Rep

Time = 0.781566 ms
```

Here is $$offices \bowtie employees$$ over nested-loop join:

```
Available relations:

   offices payments orderdetails orders customers productlines employees products

Your selection (separated by space): offices employees
Choose a join algorithm:
1. Nested loop join
2. Hash Join
3. Sort-Merge Join
Your selection: 1

officeCode|city|phone|addressLine1|addressLine2|state|country|postalCode|territory|employeeNumber|lastName|firstName|extension|email|reportsTo|jobTitle|
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1002|Murphy|Diane|x5800|dmurphy@classicmodelcars.com|NULL|President
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1056|Patterson|Mary|x4611|mpatterso@classicmodelcars.com|1002|VP Sales
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1076|Firrelli|Jeff|x9273|jfirrelli@classicmodelcars.com|1002|VP Marketing
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1143|Bow|Anthony|x5428|abow@classicmodelcars.com|1056|Sales Manager (NA)
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1165|Jennings|Leslie|x3291|ljennings@classicmodelcars.com|1143|Sales Rep
1|San Francisco|+1 650 219 4782|100 Market Street|Suite 300|CA|USA|94080|NA|1166|Thompson|Leslie|x4065|lthompson@classicmodelcars.com|1143|Sales Rep
2|Boston|+1 215 837 0825|1550 Court Place|Suite 102|MA|USA|02107|NA|1188|Firrelli|Julie|x2173|jfirrelli@classicmodelcars.com|1143|Sales Rep
2|Boston|+1 215 837 0825|1550 Court Place|Suite 102|MA|USA|02107|NA|1216|Patterson|Steve|x4334|spatterson@classicmodelcars.com|1143|Sales Rep
3|NYC|+1 212 555 3000|523 East 53rd Street|apt. 5A|NY|USA|10022|NA|1286|Tseng|Foon Yue|x2248|ftseng@classicmodelcars.com|1143|Sales Rep
3|NYC|+1 212 555 3000|523 East 53rd Street|apt. 5A|NY|USA|10022|NA|1323|Vanauf|George|x4102|gvanauf@classicmodelcars.com|1143|Sales Rep
4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA|1102|Bondur|Gerard|x5408|gbondur@classicmodelcars.com|1056|Sale Manager (EMEA)
4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA|1337|Bondur|Loui|x6493|lbondur@classicmodelcars.com|1102|Sales Rep
4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA|1370|Hernandez|Gerard|x2028|ghernande@classicmodelcars.com|1102|Sales Rep
4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA|1401|Castillo|Pamela|x2759|pcastillo@classicmodelcars.com|1102|Sales Rep
4|Paris|+33 14 723 4404|43 Rue Jouffroy Dabbans|NULL|NULL|France|75017|EMEA|1702|Gerard|Martin|x2312|mgerard@classicmodelcars.com|1102|Sales Rep
5|Tokyo|+81 33 224 5000|4-1 Kioicho|NULL|Chiyoda-Ku|Japan|102-8578|Japan|1621|Nishi|Mami|x101|mnishi@classicmodelcars.com|1056|Sales Rep
5|Tokyo|+81 33 224 5000|4-1 Kioicho|NULL|Chiyoda-Ku|Japan|102-8578|Japan|1625|Kato|Yoshimi|x102|ykato@classicmodelcars.com|1621|Sales Rep
6|Sydney|+61 2 9264 2451|5-11 Wentworth Avenue|Floor #2|NULL|Australia|NSW 2010|APAC|1088|Patterson|William|x4871|wpatterson@classicmodelcars.com|1056|Sales Manager (APAC)
6|Sydney|+61 2 9264 2451|5-11 Wentworth Avenue|Floor #2|NULL|Australia|NSW 2010|APAC|1611|Fixter|Andy|x101|afixter@classicmodelcars.com|1088|Sales Rep
6|Sydney|+61 2 9264 2451|5-11 Wentworth Avenue|Floor #2|NULL|Australia|NSW 2010|APAC|1612|Marsh|Peter|x102|pmarsh@classicmodelcars.com|1088|Sales Rep
6|Sydney|+61 2 9264 2451|5-11 Wentworth Avenue|Floor #2|NULL|Australia|NSW 2010|APAC|1619|King|Tom|x103|tking@classicmodelcars.com|1088|Sales Rep
7|London|+44 20 7877 2041|25 Old Broad Street|Level 7|NULL|UK|EC2N 1HN|EMEA|1501|Bott|Larry|x2311|lbott@classicmodelcars.com|1102|Sales Rep
7|London|+44 20 7877 2041|25 Old Broad Street|Level 7|NULL|UK|EC2N 1HN|EMEA|1504|Jones|Barry|x102|bjones@classicmodelcars.com|1102|Sales Rep

Time = 1.366364 ms
```

Here are my times for $$orders \bowtie orderdetails$$

```
Time = 105.34427 ms (nested loop join)
Time = 14.707695 ms (hash join)
Time = 19.144208 ms (sort-merge join -- no sorting needed on either relation)
```

Here are my times for $$products \bowtie orderdetails$$

```
Time = 64.144084 ms (nested loop join)
Time = 18.42204 ms (hash join)
Time = 30.062172 ms (sort-merge join -- must first sort orderdetails)
```

#### Grading

```
This assignment will be graded out of 80 points.

[15pt] Your program demonstrates abstraction and modularity.
       e.g., multiple classes, good use of information hiding, etc.
[10pt] All files in the data directory are read into relations on program's start.
[5pt]  The common attribute is projected only once in the natural-join result.
[10pt] Nested loop join is properly implemented.
[15pt] Hash join is properly implemented.
[15pt] Sort-merge join is properly implemented.
[5pt]  When sort-merge is called, the tuples are sorted on-demand only if the
       relations are not already sorted on the common attribute.
[5pt]  Your algorithms are proper timed, and elapsed time should be reported
       in milliseconds (ms).
[misc] Your program must be written in Java. Non-Java programs will be returned
       without a grade.
```

#### Submitting Your Assignment

After you have completed the homework, use the following to submit your work on canvas.
Remove all .class files from the program directory and zip up your project.

Navigate to our course on Canvas. You should see the Homework 6 Dropbox. Click on this link, and you should be able to drag your file right into the submission box. Click "Save Changes". You may submit as often as you'd like before the deadline. I will grade the most recent copy.

#### Credits

Written by David Chiu.
