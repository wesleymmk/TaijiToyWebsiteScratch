<?php
session_start();
require_once 'config.php';
// ^ initial declarations

// created by WM
// test function for saving entire orders to 







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



	// Function for checking that output was generated properly created by WAM
	if (!is_array($generated_products) || count($generated_products) !== 6) 
	{
    throw new Exception("error in num of arrays retrieved");
	}
	
	// checks each array in generated products  
	for($i = 0, $i < 6, $i++)
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