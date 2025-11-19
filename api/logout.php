<?php

// CRITICAL FIX: Disable error display to prevent HTML warnings 
// from breaking the JSON response for the frontend.
error_reporting(0); 

// Start output buffering immediately to catch and discard
// any unintended output (like PHP warnings) that would break the JSON.
ob_start();

// logout.php
// Handles destroying the user session and logging the user out.

// Must be called first to access the current session
session_start();

// Set response header
header('Content-Type: application/json');

// 1. Unset all session variables associated with the current session
$_SESSION = array();

// 2. If using cookies for session tracking, destroy the session cookie
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    
    // Explicitly set the session cookie value to an empty string 
    // and set the expiration time to the past. This is the most reliable way 
    // to force the browser to delete the session cookie.
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// 3. Destroy the session data on the server
session_destroy();

// 4. Send a success response back to the frontend
echo json_encode(['success' => true, 'message' => 'Logout successful.']);

// Clean (discard) the buffer contents and stop buffering.
ob_end_clean(); 
echo json_encode($response);
exit();
?>