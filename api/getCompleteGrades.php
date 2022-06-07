<?php
include('./conn.php');


extract($_GET);

$search = $conn->query("SELECT subject.name AS 'subject', CONCAT(teachers.firstName, ' ', teachers.lastName) AS 'teacher', grades.firstTerm, grades.midTerm, grades.endTerm FROM grades INNER JOIN session ON grades.session_id = session.id INNER JOIN subject ON session.subject_id = subject.id INNER JOIN teachers ON session.teacher_id = teachers.id WHERE student_id = $id ");
$grades = $search->fetchAll(PDO::FETCH_OBJ);

if ($grades) echo json_encode($grades);
else echo false;
