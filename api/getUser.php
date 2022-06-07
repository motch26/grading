<?php
include('./conn.php');

extract($_GET);

$table = $role . 's';

$search = $conn->query("SELECT * FROM $table WHERE id = $id");
$user = $search->fetch(PDO::FETCH_OBJ);

echo json_encode($user);
