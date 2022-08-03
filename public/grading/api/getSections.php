<?php
include('./conn.php');

$search = $conn->query("SELECT section.id, course.course_code, section.level, section.section FROM section INNER JOIN course ON course.id = section.course_id ORDER BY course.course_code");
$sections = $search->fetchAll(PDO::FETCH_OBJ);

if ($sections) echo json_encode($sections);
else echo false;
