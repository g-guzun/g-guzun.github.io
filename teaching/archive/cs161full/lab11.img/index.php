<?php
/** lab config */
require("../course_cfg.php");
require("lab_cfg.php");
require($cfg['includes_dir']."/course_lab_header.php");
require($cfg['includes_dir']."/highlight.php");
?>

<h3>Overview</h3>
<p>
Digital image processing is an important field of study in computer science, with 
widespread applications in medicine, space exploration, photo-editing tools (e.g., 
Photoshop), and so on. In this homework, you'll be implementing some of the basic
image-transformation algorithms.
A <b>digital image</b> can be modeled as a 2D array containing <code>height</code> rows
and <code>width</code> columns. Each element in the 2D array is known as a <b>Pixel</b> 
(short for <i>picture element</i>).
</p>

<h3>Objectives</h3>
<ul>
	<li>Exposure to the Eclipse IDE</li>
	<li>Use of constants</li>
	<li>Use of the <code>main()</code> method</li>
	<li>More practice with nested loops and 2D arrays</li>
</ul>

<h3>Required Software</h3>
This project manipulates images in PPM (portable pixel map) format, which requires special tools to view.

<ul>
	<li>
	<p><b>If Working from Lab TH 409:</b> Good news! The tools are already installed for you to open
	<code>.pgm</code> file. If you're using Linux, double-clicking on any <code>.pgm</code> file will 
	open up in GIMP (Gnu IMage Processor). If you're on Windows 7, double-clicking on any <code>.pgm</code> 
	file will open up in Libre Office Draw.
	</p>
	</li>
	<li>
	<p><b>If Working from Home/Laptop:</b> You can download GIMP free at 
	<a href="http://www.gimp.org/downloads">http://www.gimp.org/downloads</a>. It is compatible with 
	Mac, Windows, and Linux. After installation, <code>.pgm</code> files will open in GIMP.
	</p>
	</li>
</ul>
While GIMP is a powerful image processing tool, we will only be using it to display <code>.pgm</code> files.
We will not be using it to perform any processing.

In this assignment, you will be writing a program that performs simple transformations on images. The 
image format that you will be dealing is <code>pgm</code>, which is part of a broader class of formats 
known as <code>ppm</code> (Portable Pixel Map). PPMs may be unfamiliar to you because it's not 
mainstream like <code>jpeg</code>, <code>gif</code>, <code>png</code>, etc. However, it's an excellent 
educational format because it is human-readable. The tradeoff is that even small images like 
the one you'll be working with in this program can be very large in size!

<h3>Required Files</h3>
The following file(s) have been provided for this lab.
<ul>
<li><a href="Lab11_ImageProcessor.zip">Lab11_ImageProcessor.zip</a></li>
</ul>

<h3>Instructions</h3>
<p>
Download the BlueJ project from the above link. After you unzip it into your working directory,
navigate into the <code>Lab11_ImageProcessor</code> folder. You should see the following files enclosed:
<ul>
<!--<li>spine.pgm: A magnetic resonance image (MRI) of a fractured spine, shown in Figure 3(a).-->
<li><code>test.pgm</code> and <code>test2.pgm</code>: Two small images for degugging.</li>
<li><code>grumpycat.pgm</code>: An image of Grumpy Cat.</li>
<li><code>nasa.pgm</code>: A washed-out aerial image from NASA.</li>
<li><code>Pixel.java</code>: This is the Pixel class. Look through the methods and fields. There are several
methods, whose signatures are provided, but the implementation details are left for you to define.
<li><code>Image.java</code>: This is the Image class, which represents a greyscale image and offers services to
manipulate this image. There are several methods left for you to implement.
</ul>

</p>

<h3>Part 1: The Pixel Class</h3>
<p>
We'll be working with greyscale (black and white) images, where a Pixel is a value within the
range $[0, 2^b − 1]$, where $b$ is  the bit 
depth. 
In practice, it is not unusual to use a bit depth of
$b = 8$ (resulting in an 8-bit image). This means that any Pixel is a value in the range 
$[0, 2^8-1]$, or $[0, 255]$. Note that a 
Pixel 
value closer to 0 will tend 
towards black (with 0 being pure-black), and a value 
closer to $2^b-1$ tends toward white (with 
$2^b-1$ being pure-white).
</p>
<h4>Fields and Constants</h4>
<ol>
	<li>
	<p>
	Open up the Pixel class, which is almost completely empty. Create a constant named 
	<code>BIT_DEPTH</code> and assign it to 8.
	</p>
	</li>
	<li>
	<p>
	Create another constant named <code>MAX_PIXEL_VAL</code>
	and assign its value to <code>2<sup>BIT_DEPTH</sup> - 1</code>. 
	To find this value, you can use this expression: <code>(int)
	(Math.pow(2, Pixel.BIT_DEPTH)-1)</code>. The <code>(int)</code> 
that precedes the expression may be baffling for now, but it's known as 
<b>Type Casting</b>, which you'll learn more about later in this 
assignment.
	</p>
	</li>
	<li>
	<p>
	Finally, create an integer field called <code>value</code>.
	</p>
	</li>
</ol>
<h4>Constructor and Methods</h4>
<ol>
	<li>
	<p>
	Create a constructor that inputs an initial value for the Pixel.
	If the given value is below 0, then
	the setter should set the pixel value to 0. If it is above <code>Pixel.MAX_PIXEL_VAL</code>, then
	set it to <code>Pixel.MAX_PIXEL_VAL</code>.
	</p>
	</li>
	<li>
	<p>
	Write getter and setter methods called <code>getValue()</code> and <code>setValue()</code>.
	For the setter, you must again ensure that the value they're trying to set is within the
	range of <code>0</code> AND <code>Pixel.MAX_PIXEL_VAL</code>. Just like the constructor,
	if the given value is below 0, then
	the setter should set the pixel value to 0. If it is above <code>MAX_PIXEL_VAL</code>, then
	set it to <code>Pixel.MAX_PIXEL_VAL</code>.
        <pre><?php echo highlightIt('code/setValue.txt'); ?></pre>	
	</p>
	</li>
	<li>
	<p>
	Write a method <code>invertIntensity()</code> that inverses the pixel value from black to white, or
	from white to black. For instance:
        <pre><?php echo highlightIt('code/invert.txt'); ?></pre>
	</p>
	</li>
	<li>
	<p>
	Write a method <code>logIntensity()</code> that inputs a double named <code>coeff</code>.
	This method sets the Pixel value to be <code>coeff * log(p+1)</code>, where <code>p</code>
	is the current pixel value.  For instance:
        <pre><?php echo highlightIt('code/logIntensity.txt'); ?></pre>
	</p>
	<p>
	<b>Important! Type Casting:</b> To do this problem, you need to use the <code>Math.log()</code> static method.
	One problem you will run into is that <code>Math.log()</code> returns a double when you need
	an integer. You need to <i>coerce</i> the returned value into an integer type, and to do this, you
	can use this syntax:
        <pre><?php echo highlightIt('code/casting1.java'); ?></pre>
	where <code>var</code> is of type <code>TargetDataType</code>.
        <pre><?php echo highlightIt('code/casting2.java'); ?></pre>	
	</p>
	</li>
	<li>
	<p>
	Write a method <code>powerLawIntensity()</code> that inputs two doubles named <code>coeff</code>
	and <code>gamma</code>. This method sets the Pixel value to be <code>coeff * p<sup>gamma</sup></code>, where <code>p</code>
	is the current pixel value. For instance:
        <pre><?php echo highlightIt('code/powerLawIntensity.txt'); ?></pre>
	</p>
	</li>
</ol>


<h3>Part 2: Image Class</h3>
<p>
Open the <code>Image</code> class that has been provided. Scroll to the bottom and you will
find the following methods already implemented. <b>Do not modify these methods!</b>
<ul>
	<li><code>public void open(String filename)</code>: Opens the given filename and reads it into the 2D array.
	<li><code>public void save(String filename)</code>: Saves the current Image to the given filename.
	<li><code>public String toString()</code>: Returns the image in String format.
</ul>
We'll revisit these methods later.
</p>

<h4>Fields</h4>
<ol>
	<li>
	<p>
	Create two fields that will store the <code>height</code> and 
<code>width</code> of 
the Image.
	</p>
	</li>
	<li>
	<p>
	Create fields that will store a 2D array of <code>Pixels</code>. You should name
	this field <code>canvas</code>.
	</p>
	</li>
</ol>

<h4>Constructor and Transformation Methods</h4>
<ol>
	<li>
	<p>
	<b>Constructor</b>: Write a constructor that inputs a String argument called
	<code>filename</code>. This constuctor simply calls the already-provided 
	<code>open()</code> method given the <code>filename</code>. The 
<code>open()</code> method automatically fills the 2D array, as well as 
your height and width fields!
	</p>
	</li>
	<li>
	<p>
	Write getter methods for both the height and width fields. You do not need to
	provide setters for these fields.
	</p>
	</li>
<!--
	<li>
	<p>
	Write a <code>toString()</code> method that returns (not print!) a String adhering the 
	following format:
        <pre><?php echo highlightIt('code/toString.txt'); ?></pre>
	In the above, your returned String starts with <code>P2</code> on the first line.
	This means the current image is a PPM Version 2 format (greyscale image).
	On the next line, <code>W</code> should be replaced with the width of your current image,
	and <code>H</code> should be replaced with the height. The line after that
	contains the value of the maximum value of a Pixel -- <i>say, didn't you make
	a constant to store that value earlier?</i>. Finally, on the next line,
	replace <code>&lt;&lt;all pixel values&gt;&gt;</code> with all the pixel values stored
	in your 2D array from left-to-right and row-by-row.
	</p>
	<p>
	You may be wondering how to get the "new line" to show up in your String. In Java, the newline
	character is written as <code>\n</code>. It must be used within quotes. So the following 
	String: <code>"Hello\nWorld\n\n!"</code>
	would show up as the following when printed:
        <pre><?php echo highlightIt('code/newline.txt'); ?></pre>	
	</p>
	<p>
	I provided you with a file called <code>test.pgm</code> to test this method.
	First, open this file up by double-clicking on it. Gimp should show a window that looks
	empty. If you look hard enough, there's actually an image being displayed.. it's just so small,
	you can't see it. Magnify this image to 2400% its original size to reveal the  2 by 3 Pixel image:
	<br/>
	<center><img style="vertical-align: middle" width="500px" src="figures/hwk8_test.png"/></center><br/>
	</p>
	<p>
	Check if this method is working with the following code:
        <pre><?php echo highlightIt('code/toString2.txt'); ?></pre>
	</p>
	As you can see, the first row of Pixels is 0 (black), 127 (grey), 255 (white), followed by 
	a second row of Pixels 255 (white), 127 (grey), and 0 (black).
	</li>
-->
	<li>
	<p>
	Write a method called <code>inverseTransform()</code> that takes no inputs and returns nothing.
	It loops through all Pixel elements in your 2D array and inverts their intensities.
        <pre><?php echo highlightIt('code/inverseTransform.txt'); ?></pre>
	</p>
	</li>
	<li>
	<p>
	Write a method called <code>logTransform()</code> that takes as input a double named
	<code>coeff</code> and returns nothing.
	It loops through all Pixel elements in your 2D array and applies <code>logIntensity</code>
	with the given <code>coeff</code>.
        <pre><?php echo highlightIt('code/logTransform.txt'); ?></pre>
	</p>
	</li>
	<li>
	<p>
	Write a method called <code>powerLawTransform()</code> that takes as input two double named
	<code>coeff</code> and <code>gamma</code>, and returns nothing.
	It loops through all Pixel elements in your 2D array and applies <code>powerLawIntensity</code>
	with the given <code>coeff</code> and <code>gamma</code>.
        <pre><?php echo highlightIt('code/powerLawTransform.txt'); ?></pre>
	</p>
	</li>
	<li>
	<p>
	Before moving on to the next section, you should test everything out to check whether
	everything's working so far. Check out the examples below (type into code pad). If successful,
	open up the BlueJ project folder, and double-click to open the new pgm file after transformation.
	You should get the results that follow:
	</p>
	</li>
</ol>
<h4>Examples of Transformations</h4>
<center>
	<table width="100%">
	<tr>
	<td width="50%">
	<code><br/>Image cat = new Image("grumpycat.pgm");<br/>cat.save("grumpycatNew.pgm");</code><br/>
	<img border="1" width="250" src="figures/gcOrig.jpg"/>
	</td>
	<td width="50%">
	<code>Image cat = new Image("grumpycat.pgm");<br/>cat.inverseTransform();<br/>cat.save("grumpcatNew.pgm");</code><br/>
	<img border="1" width="250" src="figures/gcInverse.jpg"/>
	</td>
	</tr>
	<tr>
	<td colspan="2"><br/><br/></td>
	</tr>
	<tr>
	<td width="50%">
	<code>Image cat = new Image("grumpycat.pgm");<br/>cat.logTransform(39.5);<br/>cat.save("grumpycatNew.pgm");</code><br/>
	<img border="1" width="250" src="figures/gcLog_39.5.jpg"/>
	</td>
	<td width="50%">
	<code>Image cat = new Image("grumpycat.pgm");<br/>cat.powerLawTransform(1.25, 0.85);<br/>cat.save("grumpycatNew.pgm");</code><br/>
	<img border="1" width="250" src="figures/gcPower_1.25_0.85.jpg"/>
	</td>
	</tr>
	</table>
</center>

<h3>Flip Methods</h3>
Still in the <code>Image</code> class, now implement the following:
<ol>
	<li>
	<p>
	Write a method <code>flipHorizontal()</code> that will flip your 2D array along the horizontal (x)
	axis. The Pixels on the left-hand side of the image get swapped over to the right-hand side.
	For instance,
	<ul>
	<li><code>canvas[i][0]</code> should get swapped with <code>canvas[i][width-1]</code></li>
	<li><code>canvas[i][1]</code> should get swapped with <code>canvas[i][width-2]</code></li>
	<li><code>canvas[i][2]</code> should get swapped with <code>canvas[i][width-3]</code></li>
	<li>and so on...</li>
	</ul>
	for all rows <code>i</code>.
        <pre><?php echo highlightIt('code/flipHorizontal.txt'); ?></pre>
	</p>
	</li>
	<li>
	<p>
	Write a method <code>flipVertical()</code> that will flip your 2D array along the vertical (y)
	axis. The Pixels on the top of the image get swapped over to the bottom.
	For instance,
	<ul>
	<li><code>canvas[0][j]</code> should get swapped with <code>canvas[height-1][j]</code></li>
	<li><code>canvas[1][j]</code> should get swapped with <code>canvas[height-2][j]</code></li>
	<li><code>canvas[2][j]</code> should get swapped with <code>canvas[height-3][j]</code></li>
	<li>and so on...</li>
	</ul>
	for all columns <code>j</code>.
        <pre><?php echo highlightIt('code/flipVertical.txt'); ?></pre>
	</p>
	</li>
	<li>
	<p>
	Again, test everything out on real images to check whether everything's working so far. Try it on 
	the aerial photo from NASA, or on the cat photo.
	</p>
	</li>
<h4>Examples of Flipping</h4>
<center>
	<table width="100%">
	<tr>
	<td width="50%">
	<code><br/>Image nasa = new Image("nasa.pgm");<br/>nasa.save("nasaNew.pgm");</code><br/>
	<img border="1" width="250" src="figures/nasa.jpg"/>
	</td>
	<td width="50%">
	<code>Image nasa = new Image("nasa.pgm");<br/>nasa.flipHorizontal();<br/>nasa.save("nasaNew.pgm");</code><br/>
	<img border="1" width="250" src="figures/nasaFlipHorizontal.jpg"/>
	</td>
	</tr>
	<tr>
	<td colspan="2"><br/><br/></td>
	</tr>
	<tr>
	<td width="50%">
	<code>Image nasa = new Image("nasa.pgm");<br/>nasa.flipVertical();<br/>nasa.save("nasaNew.pgm");</code><br/>
	<img border="1" width="250" src="figures/nasaFlipVertical.jpg"/>
	</td>
	</tr>
	</table>
</center>
</ol>

<h3>Rotation Methods</h3>
Still in the <code>Image</code> class, now implement the following:
<ol>
	<li>
	<p>
	Write a method <code>rotateClockwise()</code> that inputs and returns nothing.
	The method will instantiate a new 2D array of <code>Pixels</code> with the
	width and height swapped. Then you must transpose the image so that it is flipped
	clockwise.
        <pre><?php echo highlightIt('code/rotateClockwise.txt'); ?></pre>	
	</p>
	</li>
	<li>
	<p>
	Write a method <code>rotateCounterClockwise()</code> that inputs and returns nothing.
	The method will instantiate a new 2D array of <code>Pixels</code> with the
	width and height swapped. Then you must transpose the image so that it is flipped
	counter-clockwise.
        <pre><?php echo highlightIt('code/rotateCounterClockwise.txt'); ?></pre>	
	</p>
	</li>
	<li>
	<p>
	Take note that, after a rotation, the height and width of the new image may change.
	</p>
	</li>
</ol>
<h4>Examples of Rotation</h4>
<center>
	<table width="100%">
	<tr>
	<td width="50%">
	<code><br/>Image nasa = new Image("nasa.pgm");<br/>nasa.save("nasaNew.pgm");</code><br/>
	<img border="1" width="250" src="figures/nasa.jpg"/>
	</td>
	<td width="50%">
	<code>Image nasa = new Image("nasa.pgm");<br/>nasa.rotateClockwise();<br/>nasa.save("nasaNew.pgm");</code><br/>
	<img border="1" width="250" src="figures/nasaClockwise.jpg"/>
	</td>
	</tr>
	<tr>
	<td colspan="2"><br/><br/></td>
	</tr>
	<tr>
	<td width="50%">
	<code>Image nasa = new Image("nasa.pgm");<br/>nasa.rotateCounterClockwise();<br/>nasa.save("nasaNew.pgm");</code><br/>
	<img border="1" width="250" src="figures/nasaCounterClockwise.jpg"/>
	</td>
	</tr>
	</table>
</center>
</ol>

<h3>ImageProcessor Class</h3>
<ol>
	<li>
	<p>
	Create a new class called <code>ImageProcessor</code>. The purpose of this class is to simply
	run your program, and therefore is not meant to be instantiated as an object. That implies
	there should be no instance state (fields) nor instance methods.
	</p>
	</li>
	<li>
	<p>
	Create the main method, <code>public static void main(String[] args)</code>.
	Inside main, you should write the code to process your images. For instance:
        <pre><?php echo highlightIt('code/main.txt'); ?></pre>	
	</p>
	</li>
	<li>
	<p>
	Once the main method has been implemented, right-click on the <code>ImageProcessor</code> class
	and you should see a new item called <b>Run Main Method</b>. Select this, and the above code will
	be executed, opening grumpycat.pgm, turning it upside-down (through two rotations), and inversing
	the image. The new file will be saved as grumpycatNew.pgm, unless you named it otherwise.
	</p>
	</li>
</ol>

<h4>Processing Your Own Photos</h4>
<p>
Process <i>at least</i> two of your own images from your phone or camera. The images must be of your own 
creation. There are no restrictions on the subject of your images, but please be appropriate!!!
To convert your image into <code>.pgm</code>, 
<ul>
<li>Go to <a href="ppmconvert/">my PPM converter</a></li>
<!--<li>Login using the same username and password combo as to access my notes.</li>-->
<li>Make sure Greyscale (P2) is selected.</li>
<li>Upload your file from your computer.</li>
<li>The program will return a link for you to download.</li>
<li>After you've downloaded your the file, move it to your BlueJ folder for this project.</li>
<li>Open it up to ensure the conversion was successful. It should be your original image in greyscale.</li>
<li>Using the <code>main()</code> method in the <code>ImageProcessor</code> class, perform some transformations on your 
images to make it look cooler.</li>
<li>Include the original <code>.pgm</code> files of your images with your code.</li>
<li>Your <code>main()</code> method should include code to process all your images.</li>
</ul>

<h3>Extensions</h3>
<p>
Looking for a challenge? There is no extra credit for the following extensions, but 
completing these require some thought, and prepares you for CS2.
<ul>
	<li>
	<p>
	Compute the time complexity for flip methods and rotation methods.
	</p>
	</li>
	<li>
	<p>
	<b>Space complexity and in-place algorithms:</b> Your flip and rotation methods may
	require a new temporary 2D array to be created. The down-side to this is that, 
	these algorithms require <code>2N<sup>2</sup></code> space to run over an <code>N<sup>2</sup></code>
	image. Algorithms that require double the space is not ideal if you're dealing with
	very large images, or if the computing device has a limited amount of memory (e.g., a mobile device).
	</p>
	<p>
	Refactor the flip and rotation methods so that they are <b>in-place</b>. That is,  changes
	are made directly on the 2D array, without requiring another temporary 2D array to be allocated.
	A few variables for temporary storage are allowed.
	<ul>
		<li>
		Start with the flip methods first.
		</li>
		<li>
		For the rotation methods, you should assume you're working with a square image, so test out its
		validity with <code>test2.pgm</code> and <code>nasa.pgm</code>. The out-of-place version of rotation must be
		kept around and used for images that differ in width and height. 
		</li>
		<li>
		There are two ways to tackle in-place rotation, depending on how you prefer to think about the problem. One way
		is to look at the image as having multiple "shells." You'd want to rotate the outer shell fully, then move on to
		the shell just below it, and so on, until you reach the inner-most shell. Another way is to treat the image like 
		a matrix, and <a href="http://en.wikipedia.org/wiki/Transpose">transpose it</a>. The result is not quite a rotation,
		but it's close...
		</li>
	</ul>
	</p>
	</li>
</ul>
<h3>Grading</h3>
<p>
       	This assignment will be graded out of a total of 100pts.
</p>
<ul>
  <li>
       	<b>[10pts]</b> The Pixel constants are defined and used throughout your code where appropriate.
  </li>
  <li>
      	<b>[5pts]</b> Pixel's <code>setValue()</code> method appropriately truncates the input pixel value to the proper range of 0 and MAX_PIXEL_VAL.
  </li>
  <li>
      	<b>[15pts]</b> Pixel's <code>invert()</code>, <code>logIntensity()</code>, and <code>powerLawIntensity()</code> are properly implemented.</li>
  <li>
      	<b>[20pts]</b> <code>flipHorizontal()</code> and <code>flipVertical()</code> are properly implemented.
  </li>
  <li>
      	<b>[30pts]</b> <code>rotateClockwise()</code> and <code>rotateCounterClockwise()</code> methods are properly implemented.
  </li>
  <li>
      	<b>[5pts]</b> ImageProcessor's <code>main()</code> is properly implemented, and processes two of your images.
  </li>
  <li>
      	<b>[5pts]</b> You re-use code whenever possible.
  </li>
  <li>
      	<b>[5pts]</b> You provide Javadocs style comments for any new methods implemented.
  </li>
  <li>
      	<b>[5pts]</b> You include sufficient inline comments to explain the logic of your methods.
  </li>
</ul>
</p>

<?php
require($cfg['includes_dir']."/course_hwk_footer.php");
?>
