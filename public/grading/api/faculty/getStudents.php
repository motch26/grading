<?php
include('./../conn.php');

$select = $conn->query("SELECT s.id, s.firstName, s.mi, s.lastName, u.username, u.password FROM students s INNER JOIN users u USING (id) WHERE role = 'student'");
$students = $select->fetchAll(PDO::FETCH_OBJ);

echo json_encode($students);
