<?php

$username = "alexk";
$password = "test1234";
$hostname = "localhost";
$dbname = "j1";

// Create connection

$conn = mysqli_connect($hostname, $username, $password, $dbname) or die("Unable to connect to MySQL". mysql_error());

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//get data from cookies and store in database
function storeData($conn) {

  $stmt = $conn->prepare( "INSERT INTO expPilot (name, sc1num, sc1sp1,  sc1sp2, sc1sp3, sc1sp4, sc1tp1, sc1tp2, sc1qcText, sc1qcSlider, sc2num, sc2sp1,  sc2sp2, sc2sp3, sc2sp4, sc2tp1, sc2tp2, sc2qcText, sc2qcSlider, sc3num, sc3sp1,  sc3sp2, sc3sp3, sc3sp4, sc3tp1, sc3tp2, sc3qcText, sc3qcSlider, sc4num, sc4sp1,  sc4sp2, sc4sp3, sc4sp4, sc4tp1, sc4tp2, sc4qcText, sc4qcSlider, question_1, question_2, question_3, question_4, question_5, question_6)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
     
  $stmt->bind_param("sssssssssssssssssssssssssssssssssssssssssss",$name, $sc1num, $sp1sc1, $sp2sc1, $sp3sc1, $sp4sc1, $tp1sc1, $tp2sc1, $qc_sc1, $qc_slider_sc1, $sc2num, $sp1sc2, $sp2sc2, $sp3sc2, $sp4sc2, $tp1sc2, $tp2sc2, $qc_sc2, $qc_slider_sc2, $sc3num, $sp1sc3, $sp2sc3, $sp3sc3, $sp4sc3, $tp1sc3, $tp2sc3, $qc_sc3, $qc_slider_sc3, $sc4num, $sp1sc4, $sp2sc4, $sp3sc4, $sp4sc4, $tp1sc4, $tp2sc4, $qc_sc4, $qc_slider_sc4, $question1, $question2, $question3, $question4, $question5, $question6);

   $givenName = $_COOKIE['givenName'];
   $name = $givenName;

   $sc1num = $_COOKIE['sc1num'];
   $sc2num = $_COOKIE['sc2num'];
   $sc3num = $_COOKIE['sc3num'];
   $sc4num = $_COOKIE['sc4num'];

   for ($x = 1; $x <= 4; $x++) 
   {
    ${"sp1sc" . $x} = $_COOKIE["sp1_scenario".$x];
    ${"sp2sc" . $x} = $_COOKIE["sp2_scenario".$x];
    ${"sp3sc" . $x} = $_COOKIE["sp3_scenario".$x];
    ${"sp4sc" . $x} = $_COOKIE["sp4_scenario".$x];
    ${"tp1sc" . $x} = $_COOKIE["tp1_scenario".$x];
    ${"tp2sc" . $x} = $_COOKIE["tp2_scenario".$x];
    ${"qc_sc" . $x} = $_COOKIE['qc_scenario'.$x];
    ${"qc_slider_sc".$x} = $_COOKIE['qc_slider_scenario'.$x];
   }

  for ($x = 1; $x <= 6; $x++) 
  {
	 ${"question". $x} = $_COOKIE[$x . "radioQuestion"];
  }


  $stmt->execute();

  echo "New records created successfully";
  
  $stmt->close();
  $conn->close();

    header("Location: http://ii.tudelft.nl/~alexk/expPilot/redirect.html");

}

storeData($conn);

?>