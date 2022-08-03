<?php

include('./../conn.php');
extract($_POST);
$insert = $conn->exec("INSERT INTO subjects (code, name, courses, level) VALUES ('$code', '$name', '$courses', $level)");

echo $insert;
