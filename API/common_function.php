<?php
require_once 'config.php';
// =================================================================
// COMMON FUNCTIONS LIBRARY
// =================================================================
// This file is a "toolbox" for all reusable PHP scripts.
// It should only contain function definitions used multiple times throughout the backend.
// Created by WAM on 9/25/25
//
/* To call functions use: at the top of the php file then call functions freely
require_once 'common_functions.php';
*/
// =================================================================

//-------------------- Log in check function --------------------
// Created by: WAM 
// Date created: 9/25/25

function get_user_ID() 
{
	if (!isset($_SESSION['user_id'])) {
        throw new Exception("Not logged in");
    }
    $customer_id = $_SESSION['user_id'];
    if(!is_numeric($customer_id) || $customer_id <= 0 ){
        throw new Exception("Invalid session ID format");
    }

    return (int)$customer_id;
}

/* Use case & Syntax:
// this would assign the customer_id value to $customer ID

 $customer_id = get_user_ID();

*/
//--------------------  END OF FUNCTION  --------------------

//-------------------- Checking Deliverables --------------------
// Created by: WAM
// Date created: 9/25/25 
// Note these loops were origionally created by me on 9/23/25 but was moved here and turned to a function on 9/25/25

function check_deliverables($generated_products)
{
    if (!is_array($generated_products) || count($generated_products) !== 6) // checks number of strings
	{
	   throw new Exception("error in number of arrays retrieved");
	}
		
	for ($i = 0; $i < 6; $i++) // checks each array in generated products 
	{
		//redefine variable to prevent errors
		$product = $generated_products[$i];
		if (
			!isset($product['color_1']) || 
			!isset($product['color_2']) || 
			!isset($product['attribute_1']) || 
			!isset($product['attribute_2']) || 
			!isset($product['desc_short']) || 
			!isset($product['desc_long'])
		) {
			throw new Exception('Error in product data at index ' . $i . '.');
			// this should throw an exception that lists the line where the error occured 
		}
	}
}

/* Use case & Syntax:
// when called the function loops through all strings related to $generated products and throws exceptions if something is wrong
// in the case that the output was properly generated this code is essentially skipped over

 check_deliverables($generated_products);

*/
//--------------------  END OF FUNCTION  --------------------

///-------------------- Saving to outputs table in mySQL --------------------
// Created by: WAM 
// Date created: 9/25/25
// Note these loops were origionally created by me on 9/24/25 but was moved here and turned to a function on 9/25/25


function save_to_outputs($conn, $customer_id, $prompt_response)
{
	// save to outputs database first
	// This line creates a new line in Outputs and other values are auto generated
	$sql_output = "INSERT INTO outputs (customer_id, customer_prompt_response) VALUES (? , ?)";
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
	// returns order_id
	return $new_order_id;
}

/* Use case & Syntax:
// Takes the connection link the customer id and the prompt input and saves them to SQL while returning the unique identifier

 $order_id = save_to_outputs($conn, $customer_id, $prompt_response);

*/
//--------------------  END OF FUNCTION  --------------------

//-------------------- Saving to outputs_details table in mySQL --------------------
// Created by: WAM
// Date created: 9/25/25


function save_to_output_details($conn, $new_order_id, $color_1, $color_2, $attribute_1, $attribute_2, $desc_s, $desc_l)
{
	// save to outputs_details database
	// This line creates a new line in outputs_details and other values are auto generated
	$sql_details = "INSERT INTO outputs_details (order_id, color_1, color_2, attribute_1, attribute_2, desc_short, desc_long) VALUES (?, ?, ?, ?, ?, ?, ?)";
	// this statement sends the above line to the SQL server 
	// this ensures that the values we are trying to assign are actually in that line
	$stmt_details = $conn->prepare($sql_details);
	// this assigns values to the insert line but puts them in as strings at this point to prevent direct SQL injection
	// NOTE TO TEAM "issssss" means that the first input is an Integer and the rest are strings
	$stmt_details->bind_param("issssss", $new_order_id, $color_1, $color_2, $attribute_1, $attribute_2, $desc_s, $desc_l);
	// executes the INSERT INTO command with the blind parameters assigned
	$stmt_details->execute();
	// creates a variable to store the newly generated ID for this portion of the order
	$new_detail_id = $conn->insert_id;
	// now that the above code has been executed and we have grabbed the order ID we can free up the server resources
	$stmt_details->close();
	// Returns the unique identifier for the row
	return $new_detail_id;
}

/* Use case & Syntax:
// This function takes a number of arguments

 $detail_id_1 = save_to_output_details($conn, $new_order_id, $color_1, $color_2, $attribute_1, $attribute_2, $desc_s, $desc_l);

*/
//--------------------  END OF FUNCTION  --------------------

//-------------------- Fetch Output Details --------------------
// Created by: WAM
// Date created: 10/1/25


function getOutputDetailsByOrderId($conn, $order_id)
{
    // Creates SQL order structure
    $sql = "SELECT * FROM outputs_details WHERE order_id = ?";
    
    // Prepares statement and throws exception if fails
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        throw new Exception("Failed to prepare statement for fetching details: ");
    }
    
    // bind param to prevent direct SQL injection
    $stmt->bind_param("i", $order_id);
    
    // trys to execute the statement if this fails throws exception
    if (!$stmt->execute()) {
        throw new Exception("Failed to execute statement for fetching details: ");
    }
    
    // gets entire result of all rows with that order id
    $result = $stmt->get_result();
    
    if ($result->num_rows !== 6) {
        throw new Exception("Incorrect number of rows found for order_id " . $order_id . ", but still found " . $result->num_rows . ".");
    }

    // Packaging logic
    // Creates an array to package the entire order
    $id_array = [];
    
    // Uses a loop to put each row into the data
    while ($row = $result->fetch_assoc()) {
        // add the current row to the array
        $id_array[] = $row;
    }

    // close the statement to prevent Memory leak
    $stmt->close();
    
    // return the array
    return $id_array;
}
/* Use case & Syntax: takes an order id and fetches all 6 rows associated with it in outputs_details
// explanation

 output_details = getOutputDetailsByOrderId($conn, $order_id);

*/
//--------------------  END OF FUNCTION  --------------------


//-------------------- SQL Checking function --------------------
// Created by: WAM
// Date created: 9/30/25


function SQL_checker($conn, $order_id, $order_details_id)
{
    // The SQL command asks the database to COUNT how many rows match our criteria.
    $sql = "SELECT COUNT(*) FROM outputs_details WHERE order_id = ? AND id = ?";
    
    $stmt = $conn->prepare($sql);
    // checks if the statement will work and throws error if it doesnt work
    if ($stmt === false) {
        throw new Exception("Failed to prepare statement: ");
    }

    // Bind the two integer IDs we are checking.
    $stmt->bind_param("ii", $output_id, $order_details_id);
    
    if (!$stmt->execute()) {
        throw new Exception("Failed to execute statement: ");
    }
    
    // Get the result and bind it to a variable called $count.
    $stmt->bind_result($count);
    
    // Fetch the single result row.
    $stmt->fetch();
    
    $stmt->close();
    
    // returns true if val = 1 and false if val is 0
    return $count > 0;
}

/* Use case & Syntax:
// explanation

 show use case

*/
//--------------------  END OF FUNCTION  --------------------

//-------------------- Output function --------------------
// Created by: WAM
// Date created: 9/30/25


function gather_output($conn, $customer_id, $order_id)
{
	//first create a loop to check and make sure that all the outputs exist inside of the SQL server
	// set up SQL statement to count number of rows where the order and customer ID's match the inputs

    $detail_ids = get_order_IDs($conn, $customer_id, $order_id);

    $order_details_id_1 = $detail_ids[0];
    $order_details_id_2 = $detail_ids[1];
    $order_details_id_3 = $detail_ids[2];
    $order_details_id_4 = $detail_ids[3];
    $order_details_id_5 = $detail_ids[4];
    $order_details_id_6 = $detail_ids[5];

    $sql = "SELECT COUNT(*) FROM outputs WHERE order_id = ? AND customer_id = ?";
    
    $stmt = $conn->prepare($sql);
    // checks if the statement will work and throws error if it doesnt work
    if ($stmt === false) {
        throw new Exception("Failed to prepare statement: ");
    }
    // Turn the inputs to strings to prevent direct SQL injection
    $stmt->bind_param("ii", $order_id, $customer_id);
    if (!$stmt->execute()) {
        throw new Exception("Failed to execute statement: ");
    }
    // Get the result and bind it to a variable called $count.
    $stmt->bind_result($count);
    // Fetch the single result row.
    $stmt->fetch();
    
    $stmt->close();
    // check if the main order ID exists
    if($count == 0)
	{
		throw new Exception("Failed to find order with specified customer and order IDs: ");
	}

    /*
	// check1-check6 are all True/False values assigned based on if an order ID is found for 
	$check1 = SQL_checker($conn, $order_id, $order_details_id_1);
	$check2 = SQL_checker($conn, $order_id, $order_details_id_2);
	$check3 = SQL_checker($conn, $order_id, $order_details_id_3);
	$check4 = SQL_checker($conn, $order_id, $order_details_id_4);
	$check5 = SQL_checker($conn, $order_id, $order_details_id_5);
	$check6 = SQL_checker($conn, $order_id, $order_details_id_6);

	// Next we need to check for the output detail IDs
	if(!$check1 && !$check2 && !$check3 && !$check4 && !$check5 && !$check6)
	{
		throw new Exception("Failed to find order with specified detail and order IDs: ");
	}


    */

	// At this point we have confirmed the entire order exists in the SQL database and that we have the correct order number values
	// now we can get all of the order information out of the SQL server for this specific order 
	// $order_id, $order_details_id_1, $order_details_id_2, $order_details_id_3, $order_details_id_4, $order_details_id_5, $order_details_id_6
	// above are variables used here for easy copy paste access while coding/editing to prevent syntax errors

    // calling function to put all of the order details into a single array
    $order_output = getOutputDetailsByOrderId($conn, $order_id);


	return $order_output;
}

/* Use case & Syntax:
// goal take 7 inputs order # then 6 order details # then outputs all information as a single array containing 6 rows each with a set of order details

$order_output = gather_output($conn, $customer_id, $order_id, $order_details_id_1, $order_details_id_2, $order_details_id_3, $order_details_id_4, $order_details_id_5, $order_details_id_6);

*/
//--------------------  END OF FUNCTION  --------------------

//-------------------- Get all ID's --------------------
// Created by: WAM
// Date created: 10/8/25


function get_order_IDs($conn, $customer_id, $order_id)
{
    // Verify Ownership
    // 'outputs' record exists and belongs to the correct user.
    if (!output_customer_ID_match($conn, $order_id, $customer_id)) {
        // If the check fails, throw an exception to stop the process.
        throw new Exception("Access Denied: The specified order does not exist or does not belong to this user.");
    }

    $sql = "SELECT id FROM outputs_details WHERE order_id = ?";
    
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        throw new Exception("Failed to prepare statement for fetching detail IDs: " . $conn->error);
    }
    
    $stmt->bind_param("i", $order_id);
    
    if (!$stmt->execute()) {
        throw new Exception("Failed to execute statement for fetching detail IDs: " . $stmt->error);
    }
    
    $result = $stmt->get_result();
    
    // --- STEP 3: PACKAGE THE IDs INTO A SIMPLE ARRAY ---
    $detail_ids = []; // Create an empty array to hold the IDs.
    
    // Loop through each row found by the query.
    while ($row = $result->fetch_assoc()) {
        // For each row, add just the value of the 'id' column to our array.
        $detail_ids[] = $row['id'];
    }
    
    $stmt->close();
    
    // --- STEP 4: RETURN THE FINAL ARRAY ---
    return $detail_ids;
}

/* Use case & Syntax:
// explanation

 show use case

*/
//--------------------  END OF FUNCTION  --------------------

//-------------------- New general function --------------------
// Created by: WAM
// Date created: 10/15/25


function output_customer_ID_match($conn, $output_id, $customer_id)
{
    // Checks the SQL server for an entry in the outputs table that has the passed customer and output ID's'
    $sql = "SELECT COUNT(*) FROM outputs WHERE order_id = ? AND customer_id = ?";

    // Prepare statement (checks that the statement makes sense to SQL)
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        throw new Exception("Failed prepare statement: " . $conn->error);
    }
    $stmt->bind_param("ii", $output_id, $customer_id);
    if (!$stmt->execute()) {
        throw new Exception("Failed execute statement: " . $stmt->error);
    }

    // standard SQL statements see above modules if you want an in depth explanation
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();

    return $count == 1;
}

/* Use case & Syntax:
// Takes the connection, output and customer ID's and returns true/fasle on whether there is an order ID 

 if (!output_customer_ID_match($conn, $order_id, $customer_id))

*/
//--------------------  END OF FUNCTION  --------------------

//---------------------------------------------------------------------------------------------------------------
//                                    Template created by WAM
//---------------------------------------------------------------------------------------------------------------
//                                 DO NOT TOUCH COPY THIS FORMATING
//---------------------------------------------------------------------------------------------------------------



//-------------------- New general function --------------------
// Created by: 
// Date created: 


//code here

/* Use case & Syntax:
// explanation

 show use case

*/
//--------------------  END OF FUNCTION  --------------------


?>