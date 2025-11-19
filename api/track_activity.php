<?php
//Created by Nathan D
//Endpoint to track active user sessions

session_start();
require_once 'config.php'
header('Content-Type: application/json');

// Check if the user is authenticated
$user_id = $_SESSION['user_id'] ?? null;

if (!$user_id) {
    // If not authenticated, silently fail or return a minimal success, 
    // as logging this error constantly would be noisy.
    // For now, we'll tell the client it failed.
    echo json_encode(['success' => false, 'message' => 'User not authenticated.']);
    exit();
}

// Connect to the database
try {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error) {
        throw new Exception("Connection failed.");
    }
} catch (Exception $e) {
    error_log("Activity DB Connection Error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Failed to connect to database for activity tracking.']);
    exit();
}

// Prepare SQL INSERT OR REPLACE statement (UPSERT)
// This assumes your 'active_sessions' table has user_id as a UNIQUE or PRIMARY KEY.
// It will insert a new row if user_id doesn't exist (setting login_time and last_activity to NOW())
// OR update the existing row's last_activity to NOW().
$sql = "INSERT INTO active_sessions (user_id, last_activity) 
        VALUES (?, NOW())
        ON DUPLICATE KEY UPDATE last_activity = NOW()";

$stmt = $conn->prepare($sql);

if ($stmt === false) {
    error_log("Activity SQL Prepare Error: " . $conn->error);
    echo json_encode(['success' => false, 'message' => 'Failed to prepare SQL statement for activity.']);
    $conn->close();
    exit();
}

// Bind parameter (s = string for user_id)
$stmt->bind_param("s", $user_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    error_log("Activity Insert/Update Error: " . $stmt->error);
    echo json_encode(['success' => false, 'message' => 'Failed to record user activity.']);
}

$stmt->close();
$conn->close();
?>