<?php
include('./conn.php');

extract($_GET);

$search = $conn->query("SELECT COUNT(*) FROM session WHERE teacher_id = $id");
$totalClasses = $search->fetchColumn();

$search2 = $conn->query("SELECT COUNT(DISTINCT subject_id) FROM session WHERE teacher_id = $id");
$totalSubjects = $search2->fetchColumn();

$arr = [$totalClasses, $totalSubjects];
echo json_encode($arr);
