<?php
include('./conn.php');

extract($_POST);

$insert = $conn->exec("INSERT INTO session (teacher_id, section_id, subject_id) VALUES ($id, $section_id, $subject_id)");

echo $insert;
