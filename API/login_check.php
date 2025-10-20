<?php
session_start();
header('Content-Type: application/json');
// =================================================================
// Log in Check Function
// =================================================================
// This file is a log in check function callable by the front end to ensure the user accessing the page is logged in
// Created by WAM on 9/29/25
// Updated by WAM on 10/20/25
// =================================================================


if (isset($_SESSION['customer_id'])) {
    // If the key exists, the user is authenticated.
    echo json_encode([
        'success' => true,
        'isLoggedIn' => true
    ]);
} else {
    // If the key does not exist, the user is not authenticated.
    echo json_encode([
        'success' => true,
        'isLoggedIn' => false
    ]);
}

// ComUtils.apiCall(login_check.php, {})
// 
?>