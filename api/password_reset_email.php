<?php
// This script handles the request to send a password reset email.
// This script takes the input email as the input

// --- LOAD DEPENDENCIES ---
require_once 'config.php';
require_once 'common_functions.php';

// Adjust path to PHPMailer as needed
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

$response = ['success' => false, 'message' => 'An unexpected error occurred.'];
$conn = null;

try {
    // Get the email from the request
    $input = json_decode(file_get_contents('php://input'), true);
    if (!isset($input['email']) || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Please provide a valid email address.");
    }
    $email = $input['email'];

    // Connect to the database
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    $conn->set_charset("utf8mb4");

    // Check if the users email exists
    $sql_check = "SELECT customer_id FROM users WHERE email = ?";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("s", $email);
    $stmt_check->execute();
    $result = $stmt_check->get_result();

    if ($result->num_rows === 0) {
        // SECURITY: Don't tell the user if the email doesn't exist.
        // Just say "If an account exists, an email has been sent."
        // This prevents email enumeration attacks.
        $response['success'] = true;
        $response['message'] = "If an account exists with this email, a reset code has been sent.";
        echo json_encode($response);
        exit();
    }
    $stmt_check->close();

    // Generate a random 6-digit code 
    $reset_code = random_int(100000, 999999); // 6-digit code

    // link token option
    // $token = bin2hex(random_bytes(32)); //long link token

    // Store the code and expiration (e.g., 15 minutes from now)
    // We use REPLACE INTO to overwrite any existing pending reset for this email
    $expiry = date('Y-m-d H:i:s', strtotime('+15 minutes'));
    $sql_store = "REPLACE INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)";
    $stmt_store = $conn->prepare($sql_store);
    $stmt_store->bind_param("sss", $email, $reset_code, $expiry);
    $stmt_store->execute();
    $stmt_store->close();

    // Send the Email
    $mail = new PHPMailer(true);

    // -- SMTP Config  --  
    
    
    //UPDATE THIS ONCE WE GET EMAIL AND APP TOKEN FROM STEVE
    
    
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com'; 
    $mail->SMTPAuth   = true;
    $mail->Username   = 'noreply@taijitoy.com'; 
    $mail->Password   = getenv('GMAIL_APP_PASSWORD'); 
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    // -- Email Content --
    $mail->setFrom('noreply@taijitoy.com', 'noreply@taijitoy.com');
    $mail->addAddress($email);
    
    $mail->isHTML(true);
    $mail->Subject = 'Password Reset Request';
    $mail->Body    = "<h1>Password Reset</h1>
                      <p>You requested a password reset for your Taiji Toy Factory account.</p>
                      <p>Your reset code is: <strong style='font-size: 24px;'>{$reset_code}</strong></p>
                      <p>This code will expire in 15 minutes.</p>
                      <p>If you did not request this, please ignore this email.</p>";
    
    $mail->send();

    $response['success'] = true;
    $response['message'] = "If an account exists with this email, a reset code has been sent.";

} catch (Exception $e) {
    // Log the error for you, but show a generic message to the user
    error_log("Password Reset Error: " . $e->getMessage());
    $response['message'] = "An error occurred while processing your request.";
    // Ideally, only show detail in dev:
    // $response['debug_error'] = $e->getMessage();
} finally {
    if ($conn) $conn->close();
}

echo json_encode($response);
?>