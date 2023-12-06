## CS 455 - Principles of Database Systems

### Hwk: SQL Lab

This is a 2-day SQL lab. It is not graded, and I do not expect you to finish. The queries you are asked to perform are realistic. The database models the mini-world of a fictitious company that sells small-scale models of Classic Cars. More information (and practice problems) on the database can be found [here](https://www.richardtwatson.com/dm6e/Reader/ClassicModels.html).

#### Student Outcomes

To write SQL queries for the retrieval of data.

#### Required Files

Download the file below, and open it up with SQLite or SQLite DB Browser.

- [classicmodels.db](files/classicmodels.db)

#### Instructions

Start by downloading the classic models database, and open it up in SQLite. I strongly recommend you using a GUI, like DB Browser instead of the command line. Once open, you will find the following schema and quite a bit of data already populated.

<center><img src="figures/schema.png" width="500px"/></center>

Take a moment to study the schema, noting the keys. Browse the data in each relation if you wish. Answer the following queries. I've given you the expected results below each query.

1. List all customer names and their addresses who don't have a specified sales rep. Order by customer name.

   ```
   customerName   addressLine1  addressLine2  city        state       postalCode
   -------------  ------------  ------------  ----------  ----------  ----------
   ANG Resellers  Gran Vía, 1   NULL          Madrid      NULL        28001
   Anton Designs  c/ Gobelas,   NULL          Madrid      NULL        28023
   Asian Shoppin  Suntec Tower  8 Temasek     Singapore   NULL        038988
   Asian Treasur  8 Johnstown   NULL          Cork        Co. Cork    NULL
   BG&E Collecta  Rte des Arse  NULL          Fribourg    NULL        1700
   Cramer Spezia  Maubelstr. 9  NULL          Brandenbur  NULL        14776
   Der Hund Impo  Obere Str. 5  NULL          Berlin      NULL        12209
   Feuer Online   Heerstr. 22   NULL          Leipzig     NULL        04179
   Franken Gifts  Berliner Pla  NULL          München     NULL        80805
   Havel & Zbysz  ul. Filtrowa  NULL          Warszawa    NULL        01-012
   Kommission Au  Luisenstr. 4  NULL          Münster     NULL        44087
   Kremlin Colle  2 Pobedy Squ  NULL          Saint Pete  NULL        196143
   Lisboa Souven  Jardim das r  NULL          Lisboa      NULL        1675
   Messner Shopp  Magazinweg 7  NULL          Frankfurt   NULL        60528
   Mit Vergnügen  Forsterstr.   NULL          Mannheim    NULL        68306
   Natürlich Aut  Taucherstraß  NULL          Cunewalde   NULL        01307
   Porto Imports  Estrada da s  NULL          Lisboa      NULL        1756
   Raanan Stores  3 Hagalim Bl  NULL          Herzlia     NULL        47625
   SAR Distribut  1250 Pretori  NULL          Hatfield    Pretoria    0028
   Schuyler Impo  Kingsfordweg  NULL          Amsterdam   NULL        1043 GR
   Stuttgart Col  Adenaueralle  NULL          Stuttgart   NULL        70563
   Warburg Excha  Walserweg 21  NULL          Aachen      NULL        52066
   ```

2. List the names of all customers that have a creditLimit between 100,000 and 200,000 inclusively. Order by customer name.

   ```
   customerName    creditLimit
   --------------  -----------
   AV Stores, Co.  136800.0
   Amica Models &  113000.0
   Annas Decorati  107800.0
   Australian Col  117300.0
   Collectable Mi  105000.0
   Corporate Gift  105000.0
   Corrida Auto R  104600.0
   Diecast Classi  100600.0
   Dragon Souveni  103800.0
   Heintze Collec  120800.0
   Kellys Gift Sh  110000.0
   La Rochelle Gi  118200.0
   Land of Toys I  114900.0
   Lordine Souven  121400.0
   Martas Replica  123700.0
   Mini Classics   102700.0
   Muscle Machine  138500.0
   Online Diecast  114200.0
   Rovelli Gifts   119600.0
   Saveley & Henr  123900.0
   Scandinavian G  116400.0
   Toms Spezialit  120400.0
   Vida Sport, Lt  141300.0
   ```

3. List all employees who have the initials of M.P. or P.M., by name. Order by last name.

   ```
   firstName   lastName
   ----------  ----------
   Peter       Marsh
   Mary        Patterson
   ```

4. List all the products' productNames purchased by Mini Wheels Co. Order the list by product line.

   ```
   productName
   ------------------------
   1952 Alpine Renault 1300
   1969 Harley Davidson Ult
   1996 Moto Guzzi 1100i
   2003 Harley-Davidson Eag
   2002 Suzuki XREO
   1936 Harley Davidson El
   1997 BMW R 1100 S
   1960 BSA Gold Star DBD34
   1958 Setra Bus
   1940 Ford Pickup Truck
   1996 Peterbilt 379 Stake
   1937 Lincoln Berline
   1936 Mercedes-Benz 500K
   1934 Ford V8 Coupe
   18th Century Vintage Hor
   1917 Maxwell Touring Car
   1936 Chrysler Airflow
   1913 Ford Model T Speeds
   1939 Cadillac Limousine
   ```

5. List the customers by customerName whose contact person shares either a first name or last name with any of the company's employees Order by customerName.

   ```
   customerName
   --------------------------
   Australian Collectors, Co.
   Auto-Moto Classics Inc.
   Boards & Toys Co.
   Cambridge Collectables Co.
   Classic Legends Inc.
   Collectable Mini Designs C
   Corporate Gift Ideas Co.
   Gift Depot Inc.
   Martas Replicas Co.
   Mini Classics
   Mini Wheels Co.
   Muscle Machine Inc
   Signal Gift Stores
   Super Scale Inc.
   Tekni Collectables Inc.
   Toys4GrownUps.com
   West Coast Collectables Co
   ```

6. List the customers (by name) that are based in the country which is first in the lexicographic order of customer countries. (Hint: In this database instance, that country is Australia). Order by customerName.

   ```
   customerName
   ----------------------
   Annas Decorations, Ltd
   Australian Collectable
   Australian Collectors,
   Australian Gift Networ
   Souveniers And Things
   ```

7. Identify the product(s) by productCode and productName that the company has the least stock of. Order by product code.

   ```
   productCode  productName
   -----------  ------------------------
   S24_2000     1960 BSA Gold Star DBD34
   ```

8. Identify the offices (by city) that have the least employees and the most employees (answer should include city, numEmps)

   ```
   numEmps     city
   ----------  ----------
   2           Boston
   2           London
   2           NYC
   2           Tokyo
   6           San Franci
   ```

9. For all Sales Reps list their names (first and last) and the name of the office they work out of and the number of clients they represent. Order by reverse order of numClients

   ```
   firstName   lastName    city        numClients
   ----------  ----------  ----------  ----------
   Pamela      Castillo    Paris       10
   Barry       Jones       London      9
   George      Vanauf      NYC         8
   Larry       Bott        London      8
   Foon Yue    Tseng       NYC         7
   Gerard      Hernandez   Paris       7
   Leslie      Jennings    San Franci  6
   Leslie      Thompson    San Franci  6
   Julie       Firrelli    Boston      6
   Steve       Patterson   Boston      6
   Loui        Bondur      Paris       6
   Martin      Gerard      Paris       6
   Andy        Fixter      Sydney      5
   Peter       Marsh       Sydney      5
   Mami        Nishi       Tokyo       5
   ```

10. List the customer(s) and their total payments (answer should include customerNumber, customerName, totalPayment where totalPayment is the total amount of dollars the customer has paid). Order by totalPayment.

    ```
    customerNumber  customerName       totalPayment
    --------------  -----------------  ------------
    219             Boards & Toys Co.  7918.6
    198             Auto-Moto Classic  21554.26
    103             Atelier graphique  22314.36
    473             Frau da Collezion  25358.32
    381             Royale Belge       29217.18
    456             Microscale Inc.    29230.43
    489             Double Decker Gif  29586.15
    415             Bavarian Collecta  31310.09
    173             Cambridge Collect  32198.69
    362             Gifts4AllAges.com  33533.47
    328             Tekni Collectable  38281.51
    347             Men R US Retailer  41506.19
    487             Signal Collectibl  42570.37
    144             Volvo Model Repli  43680.65
    475             West Coast Collec  43748.72
    471             Australian Collec  44920.76
    211             King Kong Collect  45480.79
    344             CAF Imports        46751.14
    189             Clover Collection  49898.27
    447             Gift Ideas Corp.   49967.78
    484             Iberia Gift Impor  50987.85
    452             Mini Auto Werke    51059.99
    333             Australian Gift N  55190.16
    204             Online Mini Colle  55577.26
    357             GiftsForHim.com    56662.38
    339             Classic Gift Idea  57939.34
    256             Auto Associés & C  58876.41
    450             The Sharp Gifts W  59551.38
    242             Alpha Cognac       60483.36
    201             UK Collectables,   61167.18
    171             Daedalus Designs   61781.7
    314             Petit Auto         62253.85
    177             Osaka Souveniers   62361.22
    495             Diecast Collectab  65541.74
    412             Extreme Desk Deco  66704.94
    129             Mini Wheels Co.    66710.56
    260             Royal Canadian Co  66812.0
    250             Lyon Souveniers    67659.19
    216             Enaco Distributor  68520.47
    233             Québec Home Shopp  68977.67
    299             Norway Gifts By M  69059.04
    424             Classic Legends I  69214.33
    202             Canadian Gift Exc  70122.19
    455             Super Scale Inc.   70378.65
    350             Marseille Mini Au  71547.53
    240             giftsbymail.co.uk  71783.75
    181             Vitachrome Inc.    72497.64
    379             Collectables For   73533.65
    209             Mini Caravy        75859.32
    128             Blauer See Auto,   75937.76
    448             Scandinavian Gift  76776.44
    486             Motor Mint Distri  77726.59
    319             Mini Classics      78432.16
    112             Signal Gift Store  80180.98
    239             Collectable Mini   80375.24
    324             Stylish Desk Deco  80556.73
    249             Amica Models & Co  82223.23
    382             Salzburg Collecta  85060.0
    406             Auto Canal+ Petit  86436.97
    172             La Corne Dabondan  86553.52
    385             Cruz & Sons Co.    87468.3
    462             FunGiftIdeas.com   88627.49
    259             Toms Spezialitäte  89223.14
    227             Heintze Collectab  89909.8
    386             Lordine Souvenier  90143.31
    286             Martas Replicas C  90545.37
    282             Souveniers And Th  91655.61
    205             Toys4GrownUps.com  93803.3
    175             Gift Depot Inc.    95424.63
    186             Toys of Finland,   95546.46
    311             Oulu Toy Supplies  95706.15
    167             Herkku Gifts       97562.47
    157             Diecast Classics   98509.25
    320             Mini Creations Lt  101872.52
    334             Suominen Souvenie  103896.74
    121             Baane Mini Import  104224.79
    161             Technics Stores I  104545.22
    166             Handji Gifts& Co   105420.57
    398             Tokyo Collectable  105548.73
    145             Danish Wholesale   107446.5
    131             Land of Toys Inc.  107639.94
    298             Vida Sport, Ltd    108777.92
    458             Corrida Auto Repl  112440.09
    496             Kellys Gift Shop   114497.19
    363             Online Diecast Cr  116449.29
    119             La Rochelle Gifts  116949.68
    353             Reims Collectable  126983.19
    278             Rovelli Gifts      127529.69
    146             Saveley & Henriot  130305.35
    321             Corporate Gift Id  132340.78
    276             Annas Decorations  137034.22
    187             AV Stores, Co.     148410.09
    323             Down Under Souven  154622.08
    148             Dragon Souveniers  156251.03
    151             Muscle Machine In  177913.95
    114             Australian Collec  180585.07
    124             Mini Gifts Distri  584188.24
    141             Euro+ Shopping Ch  715738.98
    ```

11. List the product number, product name, and customer name such that the customer has never ordered that product. Order by customerName, productCode.

    ```
    productCode  productName                            customerName
    -----------  -------------------------------------  -------------
    S10_1678     1969 Harley Davidson Ultimate Chopper  ANG Resellers
    S10_1949     1952 Alpine Renault 1300               ANG Resellers
    S10_2016     1996 Moto Guzzi 1100i                  ANG Resellers
    S10_4698     2003 Harley-Davidson Eagle Drag Bike   ANG Resellers
    S10_4757     1972 Alfa Romeo GTA                    ANG Resellers
    S10_4962     1962 LanciaA Delta 16V                 ANG Resellers
    S12_1099     1968 Ford Mustang                      ANG Resellers
    S12_1108     2001 Ferrari Enzo                      ANG Resellers
    S12_1666     1958 Setra Bus                         ANG Resellers
    S12_2823     2002 Suzuki XREO                       ANG Resellers
    (too many more to list)
    ```

12. List the profit per product that the company would make if it were able to sell all of that product at MSRP (answer should include productName, profit). Order by profit.

    ```
    productName               profit
    ------------------------  ----------
    1960 BSA Gold Star DBD34  582.75
    1928 Ford Phaeton Deluxe  4864.72
    1997 BMW F650 ST          5868.66
    1968 Ford Mustang         6747.64
    Pont Yacht                8818.2
    F/A 18 Hornet 1/72        14105.6
    1911 Ford Town Car        14709.6
    1970 Chevy Chevelle SS 4  24371.25
    1996 Peterbilt 379 Stake  25258.42
    2002 Yamaha YZR M1        28314.0
    The Mayflower             31919.47
    1962 City of Detroit Str  34693.05
    P-51-D Mustang            35196.16
    1936 Mercedes Benz 500k   40121.68
    Diamond T620 Semi-Skirte  48219.36
    1958 Chevy Corvette Limi  49441.9
    1928 Mercedes-Benz SSK    52712.12
    1969 Dodge Super Bee      60117.12
    The Schooner Bluenose     61974.99
    1952 Citroen-15CV         64788.24
    1938 Cadillac V-16 Presi  68868.93
    1926 Ford Fire Engine     72345.3
    18th century schooner     76963.9
    1939 Chevrolet Deluxe Co  77865.84
    1954 Greyhound Scenicrui  80845.62
    Boeing X-32A JSF          82034.73
    1958 Setra Bus            92797.83
    1969 Ford Falcon          94378.53
    The Titanic               96000.48
    1941 Chevrolet Special D  98187.62
    1957 Corvette Convertibl  98508.63
    1900s Vintage Tri-Plane   99822.32
    1949 Jaguar XK 120        102507.0
    1970 Dodge Coronet        103601.82
    1940s Ford truck          113608.96
    1937 Horch 930V Limousin  114483.9
    1930 Buick Marquette Pha  117087.96
    1957 Ford Thunderbird     118925.54
    1999 Yamaha Speed Boat    146552.19
    1982 Ducati 996 R         148687.69
    1982 Ducati 900 Monster   151574.4
    1940 Ford Pickup Truck    152442.42
    1974 Ducati 350 Mk3 Desm  153418.72
    1962 Volkswagen Microbus  154629.15
    1928 British Royal Navy   154800.36
    1936 Harley Davidson El   158333.38
    1934 Ford V8 Coupe        158793.39
    1972 Alfa Romeo GTA       163640.64
    1969 Chevrolet Camaro Z2  164794.5
    1982 Lamborghini Diablo   166198.96
    1913 Ford Model T Speeds  169780.17
    1966 Shelby Cobra 427 S/  173202.61
    HMS Bounty                177465.69
    1939 Cadillac Limousine   180544.65
    1971 Alpine Renault 1600  181086.75
    1936 Chrysler Airflow     188070.3
    1900s Vintage Bi-Plane    203572.92
    1948 Porsche 356-A Roads  203880.6
    Collectable Wooden Train  214656.0
    1980’s GM Manhattan Expr  216095.62
    1957 Vespa GS150          224672.58
    1917 Grand Touring Sedan  226909.2
    1993 Mazda RX-7           230669.25
    The Queen Mary            232419.84
    1940 Ford Delivery Sedan  233191.62
    American Airlines: B767-  234749.79
    1936 Mercedes-Benz 500K   256027.75
    18th Century Vintage Hor  263528.16
    Corsair F4U ( Bird Cage)  264986.8
    1903 Ford Model A         267218.77
    1970 Plymouth Hemi Cuda   271144.44
    The USS Constitution Shi  271349.73
    1956 Porsche 356A Coupe   278058.0
    1970 Triumph Spitfire     286676.5
    1904 Buick Runabout       291061.9
    1998 Chrysler Plymouth P  293927.28
    America West Airlines B7  298470.76
    1962 LanciaA Delta 16V    300977.12
    1950s Chicago Surface Li  304647.42
    1992 Porsche Cayenne Tur  319227.0
    1932 Alfa Romeo 8C2300 S  319589.81
    1917 Maxwell Touring Car  329734.71
    1996 Moto Guzzi 1100i     330918.75
    American Airlines: MD-11  333043.2
    1997 BMW R 1100 S         363035.52
    1937 Lincoln Berline      366149.16
    1969 Harley Davidson Ult  371978.37
    1982 Camaro Z28           378735.08
    1912 Ford Model T Delive  381596.8
    1961 Chevrolet Impala     381725.19
    1957 Chevy Pickup         384650.0
    1968 Dodge Charger        385720.44
    1985 Toyota Supra         390980.48
    1964 Mercedes Tour Bus    395310.46
    2001 Ferrari Enzo         406087.99
    1969 Dodge Charger        413236.89
    ATA: B757-300             421527.92
    2002 Chevy Corvette       424786.62
    1969 Corvair Monza        427757.64
    1980s Black Hawk Helicop  428638.6
    1995 Honda Civic          472573.92
    1965 Aston Martin DB5     528776.16
    2003 Harley-Davidson Eag  572936.48
    1999 Indy 500 Monte Carl  614259.36
    1932 Model A Ford J-Coup  642152.1
    1976 Ford Gran Torino     670834.5
    1948 Porsche Type 356 Ro  711288.8
    1992 Ferrari 360 Spider   763249.68
    2002 Suzuki XREO          843246.95
    1952 Alpine Renault 1300  845334.6
    ```

13. List the average order size for each customer (answer should include customerName, avgQuantity) Order by customer name.

    ```
    customerName    avgQuantity
    --------------  ----------------
    AV Stores, Co.  592.666666666667
    Alpha Cognac    229.0
    Amica Models &  421.5
    Annas Decorati  367.25
    Atelier graphi  90.0
    Australian Col  235.0
    Australian Col  385.2
    Australian Gif  181.666666666667
    Auto Associés   318.5
    Auto Canal+ Pe  333.666666666667
    Auto-Moto Clas  95.6666666666667
    Baane Mini Imp  270.5
    Bavarian Colle  401.0
    Blauer See Aut  202.75
    Boards & Toys   51.0
    CAF Imports     234.0
    Cambridge Coll  178.5
    Canadian Gift   351.5
    Classic Gift I  334.0
    Classic Legend  240.0
    Clover Collect  245.0
    Collectable Mi  477.0
    Collectables F  265.0
    Corporate Gift  361.75
    Corrida Auto R  387.666666666667
    Cruz & Sons Co  320.333333333333
    Daedalus Desig  349.5
    Danish Wholesa  263.0
    Diecast Classi  277.75
    Diecast Collec  347.5
    Double Decker   178.5
    Down Under Sou  338.2
    Dragon Souveni  304.8
    Enaco Distribu  294.0
    Euro+ Shopping  358.730769230769
    Extreme Desk D  351.666666666667
    Frau da Collez  136.0
    FunGiftIdeas.c  301.0
    Gift Depot Inc  301.0
    Gift Ideas Cor  222.0
    Gifts4AllAges.  345.333333333333
    GiftsForHim.co  334.333333333333
    Handji Gifts&   309.0
    Heintze Collec  441.0
    Herkku Gifts    324.333333333333
    Iberia Gift Im  294.5
    Kellys Gift Sh  411.75
    King Kong Coll  298.0
    La Corne Dabon  278.666666666667
    La Rochelle Gi  458.0
    Land of Toys I  407.75
    Lordine Souven  426.666666666667
    Lyon Souvenier  228.0
    Marseille Mini  268.0
    Martas Replica  488.0
    Men R US Retai  250.0
    Microscale Inc  190.5
    Mini Auto Werk  177.333333333333
    Mini Caravy     259.666666666667
    Mini Classics   464.5
    Mini Creations  380.0
    Mini Gifts Dis  374.470588235294
    Mini Wheels Co  230.666666666667
    Motor Mint Dis  243.333333333333
    Muscle Machine  443.75
    Norway Gifts B  393.5
    Online Diecast  416.0
    Online Mini Co  286.0
    Osaka Souvenie  346.0
    Oulu Toy Suppl  370.0
    Petit Auto      265.333333333333
    Québec Home Sh  239.0
    Reims Collecta  286.6
    Rovelli Gifts   550.0
    Royal Canadian  436.5
    Royale Belge    69.5
    Salzburg Colle  360.5
    Saveley & Henr  476.0
    Scandinavian G  453.0
    Signal Collect  257.0
    Signal Gift St  309.666666666667
    Souveniers And  400.25
    Stylish Desk D  312.333333333333
    Suominen Souve  343.666666666667
    Super Scale In  318.0
    Technics Store  294.75
    Tekni Collecta  329.333333333333
    The Sharp Gift  414.0
    Tokyo Collecta  287.5
    Toms Spezialit  468.0
    Toys of Finlan  350.333333333333
    Toys4GrownUps.  353.333333333333
    UK Collectable  348.666666666667
    Vida Sport, Lt  539.0
    Vitachrome Inc  262.333333333333
    Volvo Model Re  161.75
    West Coast Col  255.5
    giftsbymail.co  447.5
    ```

#### Extensions

If you're done early, or are looking for more practice, consider the following exercises.

- Give the relational algebra expressions for all the above queries
- Go to the [author's page](https://www.richardtwatson.com/dm6e/Reader/ClassicModels.html) for many more query examples!

#### Grading

```
Attendance is required for the 2-day lab.
```

<!-- #### Submitting Your Assignment

After you have completed the homework, use the following to submit your work on canvas.
Remove all .class files from the program directory and zip up your project.

Navigate to our course on Canvas. You should see the Homework 6 Dropbox. Click on this link, and you should be able to drag your file right into the submission box. Click "Save Changes". You may submit as often as you'd like before the deadline. I will grade the most recent copy. -->

#### Credits

Classic Models sample database by Richard T. Watson. Modified for SQLite by David.
