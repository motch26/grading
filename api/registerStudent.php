<?php
include('./conn.php');

extract($_POST);

$insert = $conn->exec("INSERT INTO students (firstName, mi, lastName, sectionID) VALUES ('$firstName', '$mi', '$lastName', $sectionID );");

if ($insert) {
  $lastID = '';
  $lastID = $conn->lastInsertId();
  $lastIDNum = (int) $lastID;

  $userInsert = $conn->exec("INSERT INTO users (id, username, password, role) VALUES ($lastIDNum, '$username', '$password', 'student')");

  if ($userInsert) echo $userInsert;
  else echo false;
} else echo false;
