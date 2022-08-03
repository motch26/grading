<?php
include('./../conn.php');

$select = $conn->query("SELECT id, code FROM course");
$codes = $select->fetchAll(PDO::FETCH_OBJ);

echo json_encode($codes);
