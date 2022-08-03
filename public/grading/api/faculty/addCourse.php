<?php
include('./../conn.php');

extract($_POST);

$insert = $conn->exec("INSERT INTO course (code, description, sy) VALUES('$code', '$description', '$sy')");

echo $insert;
