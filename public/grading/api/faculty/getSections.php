<?php
include('./../conn.php');

$select = $conn->query(
  "
SELECT section.*, (SELECT COUNT(*) FROM section_load WHERE section_load.section_id = section.id) AS noStudents  FROM section "
);
$sections = $select->fetchAll(PDO::FETCH_OBJ);

echo json_encode($sections);
