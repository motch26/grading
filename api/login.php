<?php
include('./conn.php');

extract($_POST);

$search = $conn->query("SELECT * FROM users WHERE username = '$username' AND password ='$password'");
$count = $search->rowCount();

if ($count) {
  $user = $search->fetch(PDO::FETCH_OBJ);
  echo json_encode($user);
} else echo false;
