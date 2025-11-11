<?php
// Endpoint to receive and store custom user behavior analytics (clicks, time)
// Done by Nathan D.
session_start();

require_once 'config.php';
header('Content-Type: application/json');

$user_id = $_SESSION['user_id'];
$request_data = json_decode(file_get_contents('php://input'), true);

// Extract and cast data safely
$order_id = $request_data['order_id'] ?? null;
$clicks = (int)($request_data['clicks_to_order'] ?? 0);
$time_ms = (int)($request_data['time_ms'] ?? 0);

if (!$user_id) {
    echo json_encode(['success' => false, 'message' => 'User is not authenticated. Analytics record failed']);
    exit();
}

if (!$order_id) {
    echo json_encode(['success' => false, 'message' => 'Missing valid order ID for analytics record.']);
    exit();
}

// Connect to the database
try {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error) {
        throw new Exception("Connection failed.");
    }
} catch (Exception $e) {
    error_log("Analytics DB Connection Error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Failed to connect to database.']);
    exit();
}

// Prepare SQL INSERT statement
$sql = "INSERT INTO order_analytics (user_id, order_id, clicks_to_order, time_ms, timestamp) 
        VALUES (?, ?, ?, ?, NOW())";

$stmt = $conn->prepare($sql);

if ($stmt === false) {
    error_log("Analytics Prepare Error: " . $conn->errpr);
    echo json_encode(['success' => false, 'message' => 'Failed to prepare SQL statement.']);
    $conn->close();
    exit();
}

// Bind parameters (i = integer)
$stmt->bind_param("iiii", $user_id, $order_id, $clicks_to_order, $time_ms);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    error_log("Analytics Insert Error: " . $stmt->error);
    echo json_encode(['success' => false, 'message' => 'Failed to insert analytics data.']);
}

$stmt->close();
$conn->close();

?>
