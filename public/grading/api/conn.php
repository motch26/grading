<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

date_default_timezone_set('Asia/Manila');

$user = 'root';
$pass = '';
$conn = new PDO('mysql:host=localhost;dbname=grading', $user, $pass);
