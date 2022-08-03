<?php
include('./../conn.php');

$select = $conn->query("SELECT f.id, CONCAT(f.firstName, ' ', f.mi, '. ', f.lastName) AS name FROM faculty f");
$faculty = $select->fetchAll(PDO::FETCH_OBJ);

echo json_encode($faculty);
