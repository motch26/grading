<?php
include('./../conn.php');

extract($_GET);
$id = (int)$sectionId;

$select = $conn->query("SELECT s.id, CONCAT(s.lastName, ', ', s.firstName, ' ', s.mi) AS name FROM students s INNER JOIN section_load l ON s.id = l.student_id WHERE l.section_id = $id");
$students = $select->fetchAll(PDO::FETCH_OBJ);

echo json_encode($students);
