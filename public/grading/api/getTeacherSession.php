<?php
include('./conn.php');

extract($_GET);

$search = $conn->query("SELECT session.id, section.id AS 'secID', course.course_code, section.level, section.section, subject.name FROM session INNER JOIN section ON session.section_id = section.id INNER JOIN course ON section.course_id = course.id INNER JOIN subject ON session.subject_id = subject.id  WHERE teacher_id = $id");
$sessions = $search->fetchAll(PDO::FETCH_OBJ);

if ($sessions) echo json_encode($sessions);
else echo false;
