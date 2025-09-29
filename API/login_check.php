<?php
session_start();
header('Content-Type: application/json');
// =================================================================
// Log in Check Function
// =================================================================
// This file is a log in check function callable by the front end to ensure the user accessing the page is logged in
// Created by WAM on 9/29/25
//
// =================================================================


// Check if the 'customer_id' is set in the session.
if (isset($_SESSION['customer_id'])) 
{
    echo json_encode
    ([
        'loggedin' => true
    ]);
} 
else {
    echo json_encode
    ([
        'loggedin' => false
    ]);
}

// ComUtils.apiCall(login_check.php, {})
// 
?>