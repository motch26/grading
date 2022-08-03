<?php
include('./../conn.php');

extract($_POST);

$insert = $conn->exec("INSERT INTO faculty (firstName, mi, lastName) VALUES('$firstName', '$mi', '$lastName')");
if ($insert) {
  $faculty_id = $conn->lastInsertId();
  $insert2 = $conn->exec("INSERT INTO users (id, username, password, role) VALUES ($faculty_id, '$username', '$password', 'faculty')");

  echo $insert2;
} else echo 0;
