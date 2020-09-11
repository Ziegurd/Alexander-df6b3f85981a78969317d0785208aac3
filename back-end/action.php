<?php
require "dbcon.php";
if ($_POST) {
  $post = $_POST;
  if($post["case"] === "login") {
    login($post);
  } elseif ($post["case"] === "register") {
    register($post);
  }
}

function register($post) {
  $username = strtoupper($post["username"]);
  $password = $post["password"];

  $sql = "INSERT INTO user(username, password) VALUES('$username', '$password')";
  $result = mysql_query($sql);
  echo ($result === TRUE) ? TRUE : FALSE;
}

function login($post) {
  $username = strtoupper($post["username"]);
  $password = $post["password"];
  $lastLogin = $post["lastLogin"];

  $sql = "SELECT username FROM user WHERE username = '$username' AND password = '$password'";
  $result = mysql_query($sql);
  $row = mysql_fetch_row($result);
  if($row !== FALSE) {
    $sql = "UPDATE user SET lastLogin = '$lastLogin' WHERE username = '$username'";
    mysql_query($sql);
    echo $username;
  }
  else {
    echo FALSE;
  }
}
?>
