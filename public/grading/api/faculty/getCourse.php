<?php
include('./../conn.php');

$select = $conn->query("SELECT * FROM course ORDER BY sy ASC");
$sy = $select->fetchAll(PDO::FETCH_OBJ);

echo json_encode($sy);
