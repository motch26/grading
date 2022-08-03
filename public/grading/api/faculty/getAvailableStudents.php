<?php
include('./../conn.php');

$select = $conn->query("SELECT s.id, CONCAT(s.lastName, ', ', s.firstName, ' ', s.mi) AS name FROM students s WHERE s.id NOT IN (SELECT student_id FROM section_load)");
$students = $select->fetchAll(PDO::FETCH_OBJ);

echo json_encode($students);
