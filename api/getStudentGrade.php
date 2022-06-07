<?php
include('./conn.php');

extract($_GET);

$search = $conn->query("SELECT * FROM grades WHERE student_id = $id AND session_id = $sessionID");
$grades = $search->fetch(PDO::FETCH_OBJ);

if ($grades) echo json_encode($grades);
else echo false;
