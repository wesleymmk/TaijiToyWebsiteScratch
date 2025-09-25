<?php
session_start();
require_once 'config.php';
require_once 'common_functions.php';
header('Content-Type: application/json');
// ^ initial declarations

// created by WM
// test function for saving entire orders to 


// single toy saving
// things this function needs as inputs to work
// $customer_prompt_response this is a variable that will hold the exact input for the order from the customer
// $customer_id this is a variable that will be gathered from the user being logged in allowing us to attach the customers ID to the order they just created
try 
{
	// retrieves customer ID if they are logged in throws exception if user is not logged in
	$customer_id = get_user_ID();

    // Get the text prompt from the frontend
	// this first statement decodes the JSON into php
    $request_data = json_decode(file_get_contents('php://input'), true);

	// this checks that first the value text_prompt exist and secondly whether it contains data
    if (!isset($request_data['text_prompt']) || empty($request_data['text_prompt'])) 
	{
        throw new Exception("Input error");
    }
	// if it checks out the text prompt string is assigned directly into the customer_prompt_response variable
    $customer_prompt_response = $request_data['text_prompt'];

	// creates the $generated_products variable and stores the json response in it
	$generated_products = json_decode($ai_response_json, true);

	/* This function is commented out until we move to a 6 outputs stystem
	check_deliverables($generated_products);
	*/
	

	// connects to server
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    // does this process as a transaction so that if the whole process doesnt work it cancels
	// and does not put corrupt/incorrect data into the server
    $conn->begin_transaction();

	$new_order_id = save_to_outputs($conn, $customer_id, $prompt_response);


	$detail_id_1 = save_to_output_details($conn, $new_order_id, $color_1, $color_2, $attribute_1, $attribute_2, $desc_s, $desc_l);
	
	// other 5 instantiations of the save_to_output_details
	/*
	$detail_id_2 = save_to_output_details($conn, $new_order_id, $color_1, $color_2, $attribute_1, $attribute_2, $desc_s, $desc_l);
	$detail_id_3 = save_to_output_details($conn, $new_order_id, $color_1, $color_2, $attribute_1, $attribute_2, $desc_s, $desc_l);
	$detail_id_4 = save_to_output_details($conn, $new_order_id, $color_1, $color_2, $attribute_1, $attribute_2, $desc_s, $desc_l);
	$detail_id_5 = save_to_output_details($conn, $new_order_id, $color_1, $color_2, $attribute_1, $attribute_2, $desc_s, $desc_l);
	$detail_id_6 = save_to_output_details($conn, $new_order_id, $color_1, $color_2, $attribute_1, $attribute_2, $desc_s, $desc_l);
	*/


	// BELOW THIS is AI generated temporaraily will be replaced by WAM with better code when has time
    // --- STEP 5: PREPARE THE SUCCESSFUL RESPONSE ---
    $response['success'] = true;
    $response['message'] = "Successfully generated and saved 6 product ideas.";

	// this needs to be changed to send different data
    $response['data'] = $generated_products; // Send the data back to the frontend to be displayed.


	// handle these errors better
} 
catch (Exception $e) 
{
		// If any 'throw new Exception' was triggered, the code jumps here.
		if (isset($conn)) $conn->rollback(); // If there was an error, undo all database changes.
		$response['message'] = $e->getMessage();
		// Note: 'success' is already false from the initial declaration.
} 
finally 
{
		// This block runs whether there was a success or an error.
		// It's the perfect place to make sure the database connection is always closed.
		if (isset($conn)) {
			$conn->close();
		}
}

// --- FINAL STEP: SEND THE RESPONSE ---
// Send the final $response object (either success or error) back to the JavaScript.
echo json_encode($response);

	// end of AI gen
?> 