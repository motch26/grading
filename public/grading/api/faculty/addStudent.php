<?php
include('./../conn.php');

extract($_POST);

$insert = $conn->exec("INSERT INTO students (firstName, mi, lastName) VALUES('$firstName', '$mi', '$lastName')");
if ($insert) {
  $student_id = $conn->lastInsertId();
  $insert2 = $conn->exec("INSERT INTO users (id, username, password, role) VALUES ($student_id, '$username', '$password', 'student')");

  echo $insert2;
} else echo 0;
