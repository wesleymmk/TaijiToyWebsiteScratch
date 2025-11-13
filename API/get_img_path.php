<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); 

// presetting response incase the script crashes
$response = ['success' => false, 'message' => 'An unexpected error occurred.'];

try {
    $request_data = json_decode(file_get_contents('php://input'), true);
    
    // getting the order id making sure its there
    if (!isset($request_data['order_id']) || !is_numeric($request_data['order_id'])) {
        throw new Exception("A valid order_id is required.");
    }
    
    $order_id = $request_data['order_id'];

    // Creating the Base URL path this will need to change when going live
    $base_image_url = "/TaijiToyWebsiteScratch/Generated_Images/Order_" . $order_id . "/";

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
}

// Send the final JSON response
echo json_encode($response);

?>