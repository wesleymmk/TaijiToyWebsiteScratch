<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();
require_once 'config.php';               // Contains DB credentials + connection
require_once 'common_function.php';      // provided shared functions

$response = ['success' => false, 'message' => 'An unexpected error occurred.'];
$conn = null;

try {
    $customer_id = get_user_ID(); 
    
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    $conn->set_charset("utf8mb4");

    // Call the function to get the packaged order summaries
    $order_data = getCustomerOrderSummaries($conn, $customer_id);

    // Prepare the successful response
    $response['success'] = true;
    $response['message'] = "Successfully retrieved " . $order_data['total_orders'] . " orders.";
    $response['data'] = $order_data; // Send the full package

    $response['debug_user_id'] = $customer_id;

} catch (Exception $e) {
    // If any 'throw new Exception' was triggered
    $response['message'] = $e->getMessage();

} finally {
    // Always close the connection
    if ($conn) {
        $conn->close();
    }
}

// Send the final JSON response (either success or error)
echo json_encode($response);
?>