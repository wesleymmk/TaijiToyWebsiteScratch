<?php
// Made by Anthony Guzman 10/1/25 
// save_traits.php — Receives Gemini traits from Node/JS frontend and saves to SQL
// 
session_start();

header('Content-Type: application/json');

// === Load dependencies ===
require_once 'config.php';               // Contains DB credentials + connection
require_once 'common_function.php';      // Your provided shared functions

try {
    // === Connect to MySQL ===
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    // === Grab raw POST body and decode JSON ===
    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['prompt']) || !isset($input['traits'])) {
        throw new Exception("Missing prompt or traits in request");
    }

    $prompt = $input['prompt'];
    $traits = $input['traits'];

    // === Check if user is logged in ===
    $customer_id = get_user_ID(); // from common_function.php

    // === Validate trait data ===
    check_deliverables($traits); // Throws exception if bad data

    // === Save prompt to outputs table ===
    $order_id = save_to_outputs($conn, $customer_id, $prompt);

    // === Save each trait to outputs_details table ===
    $detail_ids = [];

    foreach ($traits as $trait) {
        $detail_id = save_to_output_details(
            $conn,
            $order_id,
            $trait['color_1'],
            $trait['color_2'],
            $trait['attribute_1'],
            $trait['attribute_2'],
            $trait['short_description'],
            $trait['long_description']
        );
        $detail_ids[] = $detail_id;
    }

    // === Done, send success response ===
    echo json_encode([
        'success' => true,
        'message' => 'Saved to SQL successfully',
        'data' => [
            'order_id' => $order_id,
            'detail_ids' => $detail_ids
        ]
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
