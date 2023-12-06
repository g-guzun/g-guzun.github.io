<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
 <link rel="stylesheet" type="text/css" href="../../includes/dchiu.css"/>
 <link rel="icon" href="//www.pugetsound.edu/favicon.ico" type="image/x-icon" />
 <link rel="shortcut icon" href="//www.pugetsound.edu/favicon.ico" type="image/x-icon" />
 <title>David Chiu - Assistant Professor of Computer Science - University of Puget Sound</title>
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
</head>
<body>
<h1>Welcome to David's PGM and PPM Conversion Tool!</h1>

<p>
Browse your computer for any image (Puget Sound is not responsible for your content, but please be appropriate).
</p>

<form action="convertIt.php" method="post" enctype="multipart/form-data">
	<input type="file" name="file" id="file">
	<br /><br />
	<input type="radio" name="ppmversion" value="P2" checked="checked" />Greyscale (P2)<br />
	<input type="radio" name="ppmversion" value="P3" />Color (P3)
	<br /><br />
	<input type="submit" name="submit" value="Submit">
</form>
</body>
</html>
