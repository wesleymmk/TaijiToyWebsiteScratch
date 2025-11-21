<?php
// This script finalizes the password reset process.
// It verifies the code one last time and then updates the user's password.

require_once 'config.php';
require_once 'common_functions.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

$response = ['success' => false, 'message' => 'An unexpected error occurred.'];
$conn = null;

try {
    // Get Input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['email'], $input['code'], $input['new_password'])) {
        throw new Exception("Email, reset code, and new password are required.");
    }

    $email = $input['email'];
    $code_attempt = $input['code'];
    $new_password = $input['new_password'];

    // Validate password strength
    if (strlen($new_password) < 6) {
        throw new Exception("Password must be at least 6 characters long.");
    }

    // Connect to Database
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    $conn->set_charset("utf8mb4");

    // Verify Code (Again) - Security Check
    // We re-verify to ensure someone didn't just bypass the first check.
    $sql_check = "SELECT * FROM password_resets WHERE email = ? AND token = ? AND expires_at > NOW()";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("ss", $email, $code_attempt);
    $stmt_check->execute();
    $result = $stmt_check->get_result();

    if ($result->num_rows === 0) {
        throw new Exception("Invalid or expired reset code.");
    }
    $stmt_check->close();

    // Update Password
    // Hash the new password
    $new_hash = password_hash($new_password, PASSWORD_DEFAULT);

    $sql_update = "UPDATE users SET password_hash = ? WHERE email = ?";
    $stmt_update = $conn->prepare($sql_update);
    $stmt_update->bind_param("ss", $new_hash, $email);
    $stmt_update->execute();
    $stmt_update->close();

    // Delete Used CodeA
    // Invalidate the code so it can't be used again.
    $sql_delete = "DELETE FROM password_resets WHERE email = ?";
    $stmt_delete = $conn->prepare($sql_delete);
    $stmt_delete->bind_param("s", $email);
    $stmt_delete->execute();
    $stmt_delete->close();

    // Success
    $response['success'] = true;
    $response['message'] = "Your password has been successfully reset. You can now log in.";

} catch (Exception $e) {
    $response['message'] = $e->getMessage();
} finally {
    if ($conn) $conn->close();
}

echo json_encode($response);
?>