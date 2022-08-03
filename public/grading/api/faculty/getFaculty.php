<?php
include('./../conn.php');

$select = $conn->query("SELECT f.id, f.firstName, f.mi, f.lastName, u.username, u.password FROM faculty f INNER JOIN users u USING (id) WHERE role = 'faculty'");
$faculty = $select->fetchAll(PDO::FETCH_OBJ);

echo json_encode($faculty);
