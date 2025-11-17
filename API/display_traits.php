<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// Made by WAM 10/6/25 
// display_traits.php � Receives unique order ID and accesses SQL to get all the traits
// === Load dependencies ===
require_once 'config.php';
require_once 'common_function.php';
session_start();

$response = ['success' => false, 'message' => 'An unexpected error occurred.'];
$conn = null;

try
{
    $customer_id = get_user_ID();
    
    $request_data = json_decode(file_get_contents('php://input'), true);
    if (!isset($request_data['order_id']) || !is_numeric($request_data['order_id'])) {
        throw new Exception("A valid order_id is required.");
    }
    
    $order_id = $request_data['order_id'];
	
	// defines the $conn variable which is directions on where the script should look for a place to save the order information
	// This is defined in config.php a hidden file only placeholders are used here to identify it for security
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    $conn->set_charset("utf8mb4");

    // Get the traits
    $php_traits = gather_output($conn, $customer_id, $order_id);
    
    // Get the coreValues (customer_prompt_response) from outputs table
    $sql = "SELECT customer_prompt_response FROM outputs WHERE order_id = ? AND customer_id = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        throw new Exception("Failed to prepare statement for fetching core values");
    }
    $stmt->bind_param("ii", $order_id, $customer_id);
    if (!$stmt->execute()) {
        throw new Exception("Failed to execute statement for fetching core values");
    }
    $result = $stmt->get_result();
    $core_values = "";
    if ($row = $result->fetch_assoc()) {
        $core_values = $row['customer_prompt_response'];
    }
    $stmt->close();


    $response['success'] = true;
    $response['message'] = "Successfully retrieved details for order ID " . $order_id;
    $response['data'] = $php_traits;
    $response['coreValues'] = $core_values;
}
catch (Exception $e) {
    $response['message'] = $e->getMessage();

} finally {
    // This block always runs, ensuring the database connection is closed.
    if ($conn) $conn->close();
}

echo json_encode($response);
?>
