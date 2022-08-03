<?php
include('./../conn.php');

$select = $conn->query("SELECT s.id, s.level, CONCAT(s.code, ' ', s.level, ' - ', s.section ) AS name FROM section s");
$sections = $select->fetchAll(PDO::FETCH_OBJ);

echo json_encode($sections);
