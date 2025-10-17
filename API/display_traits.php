<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// Made by WAM 10/6/25 
// display_traits.php — Receives unique order ID and accesses SQL to get all the traits
// === Load dependencies ===
require_once 'config.php';
require_once 'common_function.php';
session_start();

$response = ['success' => false, 'message' => 'An unexpected error occurred.'];
$conn = null;

try
{
    $customer_id = 7; //get_user_ID();
    /*
    $request_data = json_decode(file_get_contents('php://input'), true);
    if (!isset($request_data['order_id']) || !is_numeric($request_data['order_id'])) {
        throw new Exception("A valid order_id is required.");
    }
    */
    $order_id = 10;//$request_data['order_id'];
	
	// defines the $conn variable which is directions on where the script should look for a place to save the order information
	// This is defined in config.php a hidden file only placeholders are used here to identify it for security
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    $conn->set_charset("utf8mb4");

    $php_traits = gather_output($conn, $customer_id, $order_id);


    $response['success'] = true;
    $response['message'] = "Successfully retrieved details for order ID " . $order_id;
    $response['data'] = $php_traits;
}
catch (Exception $e) {
    $response['message'] = $e->getMessage();

} finally {
    // This block always runs, ensuring the database connection is closed.
    if ($conn) $conn->close();
}

echo json_encode($response);
?>
