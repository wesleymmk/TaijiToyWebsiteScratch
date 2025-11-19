<?php
// This script verifies a password reset code and updates the user's password.
// This script recieves email, reset code, and new password as inputs
// --- LOAD DEPENDENCIES ---
require_once 'config.php';
require_once 'common_functions.php';

// Standard API Headers
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

$response = ['success' => false, 'message' => 'An unexpected error occurred.'];
$conn = null;

try {
    //Get and Validate Input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['email'], $input['code'], $input['new_password'])) {
        throw new Exception("Email, reset code, and new password are required.");
    }

    $email = $input['email'];
    $code_attempt = $input['code'];
    $new_password = $input['new_password'];

    // Validate password strength (optional but recommended)
    if (strlen($new_password) < 6) {
        throw new Exception("Password must be at least 6 characters long.");
    }

    // Connect to Database
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    $conn->set_charset("utf8mb4");

    // Check the Reset Code
    // Looks for a matching email AND code, AND check if it hasn't expired yet.
    $sql_check = "SELECT * FROM password_resets WHERE email = ? AND token = ? AND expires_at > NOW()";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("ss", $email, $code_attempt);
    $stmt_check->execute();
    $result = $stmt_check->get_result();

    if ($result->num_rows === 0) {
        // If no row is found, the code is either wrong, expired, or for the wrong email.
        throw new Exception("Invalid or expired reset code. Please try again.");
    }
    $stmt_check->close();

    // ---Update the User's Password---
    // Hash the new password securely
    $new_hash = password_hash($new_password, PASSWORD_DEFAULT);

    $sql_update = "UPDATE users SET password_hash = ? WHERE email = ?";
    $stmt_update = $conn->prepare($sql_update);
    $stmt_update->bind_param("ss", $new_hash, $email);
    $stmt_update->execute();

    if ($stmt_update->affected_rows === 0) {
        // Edge case if the email in 'password_resets' doesn't match 'users'
        // or if the user tries to set the exact same password they already had.
    }
    $stmt_update->close();

    // Delete the Used Reset Code
    // This prevents the code from being used again (replay attack).
    $sql_delete = "DELETE FROM password_resets WHERE email = ?";
    $stmt_delete = $conn->prepare($sql_delete);
    $stmt_delete->bind_param("s", $email);
    $stmt_delete->execute();
    $stmt_delete->close();

    $response['success'] = true;
    $response['message'] = "Your password has been successfully reset. You can now log in.";

} catch (Exception $e) {
    $response['message'] = $e->getMessage();
} finally {
    if ($conn) $conn->close();
}

echo json_encode($response);
?>