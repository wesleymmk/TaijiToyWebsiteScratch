<?php
session_start();
require_once 'config.php';
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
	//checks if logged in and retrieves customer ID if they are logged in
	if (!isset($_SESSION['customer_id'])) {
        throw new Exception("Not logged in");
    }
    $customer_id = $_SESSION['customer_id'];

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

	// Function for checking that output was generated properly created by WAM
	if (!is_array($generated_products) || count($generated_products) !== 6) // checks number of strings
	{
	   throw new Exception("error in num of arrays retrieved");
	}
		
	for($i = 0, $i < 6, $i++) // checks each array in generated products 
	{
		if (
			!isset($generated_products[i]['color_1']) || 
			!isset($generated_products[i]['color_2']) || 
			!isset($generated_products[i]['attribute_1']) || 
			!isset($generated_products[i]['attribute_2']) || 
			!isset($generated_products[i]['desc_short']) || 
			!isset($generated_products[i]['desc_long'])
		) {
			throw new Exception("Error in product data line ' . $i . '.");
			// this should throw an exception that lists the line where the error occured 
		}
	}
	*/

	// connects to server
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    // does this process as a transaction so that if the whole process doesnt work it cancels
	// and does not put corrupt/incorrect data into the server
    $conn->begin_transaction();

	// save to outputs database first
	// This line creates a new line in Outputs and other values are auto generated
	$sql_output = INSERT INTO outputs (customer_id, customer_prompt_response) VALUES (? , ?);
	// this statement sends the above line to the SQL server 
	// this ensures that the values we are trying to assign are actually in that line
	$stmt_output = $conn->prepare($sql_output);
	// this assigns values to the insert line but puts them in as strings at this point to prevent direct SQL injection
	// NOTE TO TEAM "is" means that the first input is an Integer and the second is a string
	$stmt_output->bind_param("is", $customer_id, $prompt_response);
	// executes the INSERT INTO command with the blind parameters assigned
	$stmt_output->execute();

	// This creates a new variable called new order ID that stores the order ID for the entire order
	$new_order_id = $conn->insert_id;
	// now that the above code has been executed and we have grabbed the order ID we can free up the server resources
	$stmt_output->close();


	// defining the toy this set of code effectively works the same as the one above
	$sql_details_1 = INSERT INTO output_details (order_id, color_1, color_2, attribute_1, attribute_2, desc_short, desc_long) VALUES (?, ?, ?, ?, ?, ?, ?);

	$stmt_details_1 = $conn->prepare($sql_details_1);

	$stmt_details_1->bind_param("issssss", $new_order_id, $color_1_1, $color_2_1, $attribute_1_1, $attribute_2_1, $desc_s_1, $desc_l_1);

	$stmt_details_1->execute();
	// creates a variable to store the newly generated ID for this portion of the order
	$new_detail_id_1 = $conn->insert_id;

	$stmt_details_1->close();



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




header('Content-Type: application/json');



	// This intial definition of areas that are blank and then later assigned values using blind params this is to prevent direct SQL injection. 
	// order_id	output_creation_time	output_ordered	customer_id	customer_prompt_response	
	INSERT INTO outputs (order_id, output_creation_time, output_ordered, customer_id, customer_prompt_response) VALUES (/*assign order ID */? , /*def is Null not sure if we will use this*/? , /*customer ID varaibale */? , /*customer prompt response*/?);
	
	// id	order_id	color_1	color_2	attribute_1	attribute_2	desc_short	desc_long	image_path	
	// define area for toy 1
	INSERT INTO output_details (id, order_id, color_1, color_2, attribute_1, attribute_2, desc_short, desc_long, image_path) VALUES (/*assign order ID */? , /*color ID 1*/? , /*color ID 2*/? , /*attribute 1*/? , /*attribute 2 */? , /*short description */? , /*long description */?);
	
	// define area for toy 2
	INSERT INTO output_details (id, order_id, color_1, color_2, attribute_1, attribute_2, desc_short, desc_long, image_path) VALUES (/*assign order ID */? , /*color ID 1*/? , /*color ID 2*/? , /*attribute 1*/? , /*attribute 2 */? , /*short description */? , /*long description */?);
	
	// define area for toy 3
	INSERT INTO output_details (id, order_id, color_1, color_2, attribute_1, attribute_2, desc_short, desc_long, image_path) VALUES (/*assign order ID */? , /*color ID 1*/? , /*color ID 2*/? , /*attribute 1*/? , /*attribute 2 */? , /*short description */? , /*long description */?);
	
	// define area for toy 4
	INSERT INTO output_details (id, order_id, color_1, color_2, attribute_1, attribute_2, desc_short, desc_long, image_path) VALUES (/*assign order ID */? , /*color ID 1*/? , /*color ID 2*/? , /*attribute 1*/? , /*attribute 2 */? , /*short description */? , /*long description */?);
	
	// define area for toy 5
	INSERT INTO output_details (id, order_id, color_1, color_2, attribute_1, attribute_2, desc_short, desc_long, image_path) VALUES (/*assign order ID */? , /*color ID 1*/? , /*color ID 2*/? , /*attribute 1*/? , /*attribute 2 */? , /*short description */? , /*long description */?);
	
	// define area for toy 6
	INSERT INTO output_details (id, order_id, color_1, color_2, attribute_1, attribute_2, desc_short, desc_long, image_path) VALUES (/*assign order ID */? , /*color ID 1*/? , /*color ID 2*/? , /*attribute 1*/? , /*attribute 2 */? , /*short description */? , /*long description */?);
