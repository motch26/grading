<?php
include('./conn.php');

extract($_POST);

$update = $conn->exec("UPDATE grades SET firstTerm = $firstTerm, midTerm = $midTerm, endTerm = $endTerm WHERE session_id = $session_id AND student_id = $student_id");
if ($update) echo 1;
else echo false;
