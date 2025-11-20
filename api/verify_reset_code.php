<?php
// This script checks if a reset code is valid.
// It does NOT update the password.

require_once 'config.php';
require_once 'common_function.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

$response = ['success' => false, 'message' => 'An unexpected error occurred.'];
$conn = null;

try {
    //Get Input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['email'], $input['code'])) {
        throw new Exception("Email and reset code are required.");
    }

    $email = $input['email'];
    $code_attempt = $input['code'];

    // Connect to database
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    $conn->set_charset("utf8mb4");

    // Verify Code
    // check for a matching email AND code, AND check if it hasn't expired yet.
    $sql_check = "SELECT * FROM password_resets WHERE email = ? AND token = ? AND expires_at > NOW()";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("ss", $email, $code_attempt);
    $stmt_check->execute();
    $result = $stmt_check->get_result();

    if ($result->num_rows === 0) {
        // Code is invalid or expired
        throw new Exception("Invalid or expired reset code.");
    }

    // If we get here, the code is valid.
    $response['success'] = true;
    $response['message'] = "Code verification successful.";
    // You might want to return the email to confirm which account is being reset
    $response['email'] = $email; 

    $stmt_check->close();

} catch (Exception $e) {
    $response['message'] = $e->getMessage();
} finally {
    if ($conn) $conn->close();
}

echo json_encode($response);
?>