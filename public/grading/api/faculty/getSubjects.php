<?php
include('./../conn.php');

$select = $conn->query("SELECT * FROM subjects");
$subjects = $select->fetchAll(PDO::FETCH_OBJ);

echo json_encode($subjects);
