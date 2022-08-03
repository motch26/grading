<?php
include('./conn.php');
extract($_GET);

$search = $conn->query("SELECT students.id, students.firstName, students.mi, students.lastName FROM session  INNER JOIN students ON session.section_id = students.sectionID WHERE session.id = $sessionID");
$students = $search->fetchAll(PDO::FETCH_OBJ);

if ($students) echo json_encode($students);
else echo false;
