<?php
include('./../conn.php');

extract($_POST);

$insert = $conn->exec("INSERT INTO section_load (section_id, student_id) VALUES ($section_id, $student_id)");

echo $insert;
