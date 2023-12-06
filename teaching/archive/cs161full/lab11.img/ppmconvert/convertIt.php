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
<h1>David's PGM and PPM Conversion Tool</h1>
<?php
$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES["file"]["name"]);
$extension = strtolower(end($temp));

if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/pjpeg")
|| ($_FILES["file"]["type"] == "image/x-png")
|| ($_FILES["file"]["type"] == "image/png"))
//&& ($_FILES["file"]["size"] < 20000)
&& in_array($extension, $allowedExts)) {
  if ($_FILES["file"]["error"] > 0) {
    echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
  } else {
    echo "Upload: " . $_FILES["file"]["name"] . "<br>";
    echo "Type: " . $_FILES["file"]["type"] . "<br>";
    echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
    if (file_exists("upload/" . $_FILES["file"]["name"]))
    {
      echo $_FILES["file"]["name"] . " already exists. Please rename your file.";
    }
    else
    {
      move_uploaded_file($_FILES["file"]["tmp_name"], "upload/" . $_FILES["file"]["name"]);
      echo "Stored in: " . "upload/" . $_FILES["file"]["name"];
    }
  }

  //WHICH PPM VERSION?
  if ($_POST[ppmversion] == "P2")
  {
	  //convert the file using imagemagick
	  $convertedFile = "upload/".$temp[0].".pgm";

	  //run through ImageMagick convert tool
	  //8 bit greyscale
	  //400 x 400 pixel limit
	  passthru("convert upload/".$_FILES[file][name]." -compress none -colorspace gray -depth 8 -resize 500x500\> $convertedFile");
  }
  else
  {
	  //convert the file using imagemagick
	  $convertedFile = "upload/".$temp[0].".ppm";

	  //run through ImageMagick convert tool
	  //8 bit RGB
	  //400 x 400 pixel limit
	  passthru("convert upload/".$_FILES[file][name]." -compress none -depth 8 -resize 500x500\> $convertedFile");
  }
?>
<br />
<!-- <img src="<?php echo "upload/".$_FILES[file][name]; ?>" /> -->
<br /><br />
Click here to download <a href="<?php echo $convertedFile; ?>"><?php echo $convertedFile; ?></a>.<br />
Your file will be removed from the server within 24 hours.

<?php
	//remove the uploaded file
	passthru("rm -f upload/".$_FILES[file][name]);
}
else
{
  echo "Invalid file";
}
?>

</body>
</html>
