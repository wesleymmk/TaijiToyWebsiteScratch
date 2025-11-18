<?php

session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); 

require_once 'config.php';
require_once 'common_function.php';

// presetting response incase the script crashes
$response = ['success' => false, 'message' => 'An unexpected error occurred.'];
$conn = null;


try {
    // ensure user is logged in
    $customer_id = get_user_ID();

    $request_data = json_decode(file_get_contents('php://input'), true);
    
    // getting the order id making sure its there
    if (!isset($request_data['order_id']) || !is_numeric($request_data['order_id'])) {
        throw new Exception("A valid order_id is required.");
    }
    
    $order_id = $request_data['order_id'];

    // complete connection to SQL
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    $conn->set_charset("utf8mb4");
    
    // Check to ensure the order/images are connected to the right customer
    if (!output_customer_ID_match($conn, $order_id, $customer_id)) {
        throw new Exception("Access Denied: You do not have permission to view these images.");
    }

    // Creating the Base URL path this will need to change when going live
    // Note: images are saved under the `JS/Generated_Images` folder
    $base_image_url = "/TaijiToyWebsiteScratch/JS/Generated_Images/Order_" . $order_id . "/";

    // Creatingthe vals of the individual images
    $image_paths = [];
    for ($i = 1; $i <= 6; $i++) {
        // Creating the full paths for example: "/TaijiToyWebsiteScratch/Generated_Images/Order_14/Trait_1.jpg"
        $image_paths[] = $base_image_url . "Trait_" . $i . ".jpg";
    }

    //successful response and passing back image paths
    $response['success'] = true;
    $response['message'] = "Successfully generated " . count($image_paths) . " image paths.";
    $response['data'] = $image_paths;

} catch (Exception $e) {
    // setting the error message.
    $response['message'] = $e->getMessage();
} finally {
    // close the connection
    if ($conn) {
        $conn->close();
    }
}

// Send the final JSON response
echo json_encode($response);

?>