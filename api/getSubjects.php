<?php
include('./conn.php');

$search = $conn->query("SELECT * FROM subject");
$subjects = $search->fetchAll(PDO::FETCH_OBJ);

if ($subjects) echo json_encode($subjects);
else echo false;
