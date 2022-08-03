<?php
include('./../conn.php');

extract($_POST);

$insert = $conn->exec("INSERT INTO section (code, level, section) VALUES('$code', $level, '$section')");

echo $insert;
