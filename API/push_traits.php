// This file was made by Anthony Guzman
<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
if (!isset($input['coreValues'])) {
    echo json_encode(['success' => false, 'message' => 'Missing coreValues']);
    exit;
}

$ch = curl_init('http://localhost:3000/generate');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['coreValues' => $input['coreValues']]));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    echo json_encode(['success' => false, 'message' => curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);
http_response_code($httpCode);
echo $response;
//section added by WAM
//This portion is for saving the customer inputs to the sql server
// check for logged in customer
if (!isset($_SESSION['customer_id'])) {
    $response['message'] = 'You must be logged in to place an order.';
    echo json_encode($response);
    exit();
}
// if the customer is logged in then the system attempts to contact the database
try {

    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        $conn->set_charset("utf8mb4");

        // we use transaction here so that it only saves if all data is points are storred
        $conn->begin_transaction();

        // place data into outputs table, table struct: order_id	output_creation_time	output_ordered	customer_id	customer_prompt_response	
        // We need to add a function here to check the customers log in credentials then pull the customer ID from the SQL server
        $sql_insert_order = "INSERT INTO outputs (order_id, output_ordered, customer_id, customer_prompt_response) VALUES (/*assign order ID */, /*def is Null not sure if we will use this*/, /*customer ID varaibale */, 'coreValues')";
        $stmt_order = $conn->prepare($sql_insert_order);
        $stmt_order->bind_param("isd", $customer_id, $shipping_address, $total_price);
        $stmt_order->execute();

        // creates a new order ID based on the most recent 
        $new_order_id = $conn->insert_id;
        $stmt_order->close();
    
        // statement to insert the 6 items into the new `order_items` table
        $sql_insert_item = "INSERT INTO order_items (order_id, color_1, color_2, attribute_1, attribute_2, short_description, long_description) VALUES (/*assign order ID */, /*color ID 1*/, /*color ID 2*/, /*attribute 1*/, /*attribute 2 */, /*short description */, /*long description */)";
        $stmt_item = $conn->prepare($sql_insert_item);

        // 6. Loop through the fetched designs and insert each one
        foreach ($items_to_insert as $item) {
            $stmt_item->bind_param(
                "",
                $new_order_id,
                $item['color_1'],
                $item['color_2'],
                $item['attribute_1'],
                $item['attribute_2'],
                $item['desc_short'],
                $item['desc_long']
            );
            $stmt_item->execute();
        }
        $stmt_item->close();

        // If no errors, commit the transaction
        $conn->commit();

        $response['success'] = true;
        $response['message'] = 'Order placed successfully!';
        $response['new_order_id'] = $new_order_id;

    } catch (Exception $e) {
        // If anything didnt save properly rolls back all changes
        if (isset($conn)) {
            $conn->rollback();
        }
        $response['message'] = 'error saving:' . $e->getMessage();
    } finally {
        if (isset($conn)) {
            $conn->close();
        }
    }

// end of section added by WAM
