<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// Made by Anthony Guzman 10/1/25 
// save_traits.php — Receives Gemini traits from Node/JS frontend and saves to SQL
// === Load dependencies ===
session_start();
require_once 'config.php';               // Contains DB credentials + connection
require_once 'common_function.php';      // provided shared functions

$response = ['success' => false, 'message' => 'An unexpected error occurred.'];
$conn = null;

try {
    // === Grab raw POST body and decode JSON ===
    $input = json_decode(file_get_contents('php://input'), true);

    $customer_id = 7; //get_user_ID();

    if (!isset($input['prompt']) || !isset($input['traits'])) {
        throw new Exception("Missing prompt or traits in request");
    }

    $prompt_response = $input['prompt'];
    $generated_products = $input['traits'];
	
	// defines the $conn variable which is directions on where the script should look for a place to save the order information
	// This is defined in config.php a hidden file only placeholders are used here to identify it for security
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    $conn->set_charset("utf8mb4");

    // does this process as a transaction so that if the whole process doesnt work it cancels
	// and does not put corrupt/incorrect data into the server
    $conn->begin_transaction();

	//check_deliverables($generated_products);
	
	$new_order_id = save_to_outputs($conn, $customer_id, $prompt_response);

    /*
	$detail_id_1 = save_to_output_details($conn, $new_order_id, $color_1, $color_2, $attribute_1, $attribute_2, $desc_s, $desc_l);
	$detail_id_2 = save_to_output_details($conn, $new_order_id, $color_1, $color_2, $attribute_1, $attribute_2, $desc_s, $desc_l);
	$detail_id_3 = save_to_output_details($conn, $new_order_id, $color_1, $color_2, $attribute_1, $attribute_2, $desc_s, $desc_l);
	$detail_id_4 = save_to_output_details($conn, $new_order_id, $color_1, $color_2, $attribute_1, $attribute_2, $desc_s, $desc_l);
	$detail_id_5 = save_to_output_details($conn, $new_order_id, $color_1, $color_2, $attribute_1, $attribute_2, $desc_s, $desc_l);
	$detail_id_6 = save_to_output_details($conn, $new_order_id, $color_1, $color_2, $attribute_1, $attribute_2, $desc_s, $desc_l);

	// now we have saved everything
    //$f_output = gather_output($conn, $customer_id, $new_order_id, $details_id_1, $detail_id_2, $detail_id_3, $detail_id_4, $$detail_id_5, $detail_id_6);


    // Set the main success flag to true.
    $response['success'] = true;
    $response['message'] = "Successfully generated and saved product ideas.";

    // creating data package that contains the new order id to send to the front end
    $response['data'] = [
        'output_id' => $new_order_id
    ];

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
finally 
{
		// This block runs whether there was a success or an error
		// makes sure the database connection is always closed
		if (isset($conn)) {
			$conn->close();
		}
}*/
   $detail_ids = []; // Create an array to store the new detail IDs.
    foreach ($generated_products as $idea) {
        $new_id = save_to_output_details(
            $conn,
            $new_order_id,
            $idea['color_1'],
            $idea['color_2'],
            $idea['attribute_1'],
            $idea['attribute_2'],
            $idea['short_description'],
            $idea['long_description']
        );
        $detail_ids[] = $new_id; // Add the new ID to our array.
    }

    // If we get this far without an error, commit the transaction.
    $conn->commit();

    // --- Prepare the final successful response ---
    $response['success'] = true;
    $response['message'] = "Saved to SQL successfully.";
    $response['data'] = [
        'output_id' => $new_order_id,
    ];

} catch (Exception $e) {
    // If any error occurred, undo all database changes.
    if ($conn) $conn->rollback();
    $response['message'] = $e->getMessage();

} finally {
    // This block always runs, ensuring the database connection is closed.
    if ($conn) $conn->close();
}

// **FIX 5: Send the final response only once at the end of the script.**
echo json_encode($response);
?>
