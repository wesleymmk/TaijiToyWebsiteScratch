<?php

// =================================================================
// COMMON FUNCTIONS LIBRARY
// =================================================================
// This file is a "toolbox" for all reusable PHP scripts.
// It should only contain function definitions used multiple times throughout the backend.
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
	if (!isset($_SESSION['customer_id'])) {
        throw new Exception("Not logged in");
    }
    $customer_id = $_SESSION['customer_id'];
    return $customer_id;
}

/* Use case & Syntax:
// this would assign the customer_id value to $customer ID

 $customer_id = getAuthenticatedUserId();

*/
//--------------------  END OF FUNCTION  --------------------

//-------------------- New general function --------------------
// Created by: WAM
// Date created: 9/25/25 
// Note these loops were origionally created by me on 9/23/25 but was moved here and turned to a function on 9/25/25

function check_deliverables($generated_products)
{
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
}

/* Use case & Syntax:
// when called the function loops through all strings related to $generated products and throws exceptions if something is wrong
// in the case that the output was properly generated this code is essentially skipped over

 check_deliverables($generated_products);

*/
//--------------------  END OF FUNCTION  --------------------





// Template created by WAM
//---------------------------------------------------------------------------------------------------------------
//                  DO NOT TOUCH COPY THIS FORMATING
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