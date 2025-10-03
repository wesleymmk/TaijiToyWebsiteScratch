<?php
// Made by Anthony Guzman 10/1/25 
// save_traits.php — Receives Gemini traits from Node/JS frontend and saves to SQL
// 
header('Content-Type: application/json');
require_once('config.php');              
require_once('common_function.php');     

try {
    session_start();
    $customer_id = get_user_ID(); // Will throw exception if not logged in

    // Get incoming JSON from Node.js
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // DEBUG LOG — see what is being sent to PHP
    file_put_contents(__DIR__ . "/debug_log.txt", print_r($data, true));

    if (!isset($data['prompt']) || !isset($data['traits']) || count($data['traits']) !== 6) {
        throw new Exception("Invalid or incomplete data received from frontend.");
    }

    $prompt = $data['prompt'];
    $traits = $data['traits'];

    // Open database connection
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    $conn->set_charset("utf8mb4");

    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    // Save main prompt to outputs table
    $order_id = save_to_outputs($conn, $customer_id, $prompt);

    //  Loop through traits and save each row into outputs_details
    foreach ($traits as $trait) {
        save_to_output_details(
            $conn,
            $order_id,
            $trait['color_1'],
            $trait['color_2'],
            $trait['attribute_1'],
            $trait['attribute_2'],
            $trait['short_description'],
            $trait['long_description']
        );
    }

    //  Prepare success response
    $response = [
        'success' => true,
        'message' => 'Successfully saved traits to SQL',
        'data' => [
            'order_id' => $order_id,
            'details' => $traits
        ]
    ];

} catch (Exception $e) {
    // Catch and report errors
    $response = [
        'success' => false,
        'message' => $e->getMessage()
    ];
} finally {
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
    echo json_encode($response);
}
