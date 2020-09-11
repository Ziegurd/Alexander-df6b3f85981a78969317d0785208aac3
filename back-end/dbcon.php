<?php
  session_start();
  $servername = "localhost"; $username = "root"; $password = ""; $dbname = "mkmtest_db";
  $conn = mysql_connect($servername, $username, $password);
  $db = mysql_select_db($dbname);
?>
