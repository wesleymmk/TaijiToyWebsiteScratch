<?php
// This script handles the contact form submission.
// It receives the user's message and details and emails them to the site owner.

// --- LOAD DEPENDENCIES ---
require_once 'config.php';
require_once 'common_function.php'; // Using singular 'common_function.php' to match your other files

// Adjust these paths if you put PHPMailer in a different folder structure
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Standard API Headers
header('Content-Type: application/json');
// Add CORS headers for development/production
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}

$response = ['success' => false, 'message' => 'An unexpected error occurred.'];

try {
    // 1. Get and Validate Input
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Check if all required fields are present
    if (!isset($input['first_name'], $input['last_name'], $input['email'], $input['inquiry_type'], $input['message'])) {
        throw new Exception("All fields are required.");
    }

    $first_name = htmlspecialchars($input['first_name']);
    $last_name = htmlspecialchars($input['last_name']);
    $email = filter_var($input['email'], FILTER_VALIDATE_EMAIL);
    $inquiry_type = htmlspecialchars($input['inquiry_type']);
    $message_content = htmlspecialchars($input['message']);

    if (!$email) {
        throw new Exception("Invalid email address format.");
    }

    // 2. Prepare Email Content
    $full_name = $first_name . " " . $last_name;
    $subject = "New Contact Form Submission: " . $inquiry_type;

    // 3. Send the Email using PHPMailer
    $mail = new PHPMailer(true);

    // -- Server settings --
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com'; 
    $mail->SMTPAuth   = true;
    // Authenticate using the MAIN account (Using your provided email)
    $mail->Username   = 'steve@yydesign.biz'; 
    $mail->Password   = getenv('GMAIL_APP_PASSWORD'); // Use environment variable for security
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    // -- Recipients --
    // Send FROM the alias to keep it professional
    $mail->setFrom('noreply@taijitoy.com', 'TaijiToyNoReply');
    
    $mail->addAddress('steve@yydesign.biz', 'Steve Brown'); 
    
    // Reply-To the customer so the owner can just hit "Reply"
    $mail->addReplyTo($email, $full_name);

    // -- Content --
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = "
        <h1>New Contact Message</h1>
        <p><strong>Name:</strong> {$full_name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Inquiry Type:</strong> {$inquiry_type}</p>
        <hr>
        <h3>Message:</h3>
        <p>" . nl2br($message_content) . "</p>
    ";
    
    // Plain text version for non-HTML mail clients
    $mail->AltBody = "New message from {$full_name} ({$email})\n\nType: {$inquiry_type}\n\nMessage:\n{$message_content}";

    $mail->send();

    // Success Response
    $response['success'] = true;
    $response['message'] = "Message sent successfully.";

} catch (Exception $e) {
    // Log the error securely on the server
    error_log("Contact Form Error: " . $e->getMessage());
    
    // Send a user-friendly error message
    $response['message'] = "Failed to send message. Please try again later.";
    // For debugging (remove in production):
    // $response['debug_error'] = $e->getMessage();
}
// Note: No database connection was opened in this script, so no need to close one.

echo json_encode($response);
?>