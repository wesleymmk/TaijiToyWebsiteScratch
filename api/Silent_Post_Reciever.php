<?php
// This script receives the "Silent POST" from PayPal after a payment.

// --- LOAD DEPENDENCIES ---
require_once 'config.php';
require_once 'common_function.php';
// PHPMailer files
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// PayPal sends the data as a standard POST
$payment_status = $_POST['RESULT'];
$payment_message = $_POST['RESPMSG'];
$transaction_id = $_POST['PNREF']; // PayPal's transaction ID

// get the internal order ID back from the 'USER1' field.
$order_id = $_POST['USER1'];

// simple log for debugging 
$log_message = "PayPal Webhook Received:\n" .
               "Status (RESULT): " . $payment_status . "\n" .
               "Message: " . $payment_message . "\n" .
               "PayPal ID (PNREF): " . $transaction_id . "\n" .
               "Our Order ID (USER1): " . $order_id . "\n\n";
file_put_contents('paypal_log.txt', $log_message, FILE_APPEND);


// Case Succesful paymeny
// A RESULT of 0 means the transaction was approved.
if ($payment_status == 0) {
    
    try {
        // Connect to your database
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        $conn->set_charset("utf8mb4");

        // Update your database to mark the order as "paid"
        $sql = "UPDATE outputs SET output_ordered = 1, payment_id = ? WHERE order_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $transaction_id, $order_id);
        $stmt->execute();
        $stmt->close();
        $conn->close();

        // Send the order purchased notification to the site owner
        $mail = new PHPMailer(true);
        
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; // using Gmail's SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'your-email@gmail.com'; // Your sponsor's "from" email
        $mail->Password   = 'your-gmail-app-password'; // The 16-digit app password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        $mail->setFrom('your-email@gmail.com', 'Taiji Toy Factory');
        $mail->addAddress('your-sponsor-email@example.com', 'Site Owner'); // The site owner's email
        $mail->Subject = 'New Order Placed! (Order #' . $order_id . ')';
        $mail->Body    = "<h1>You have a new order!</h1>
                          <p>Order #{$order_id} was successfully paid for.</p>
                          <p>PayPal Transaction ID: {$transaction_id}</p>";
        $mail->send();

    } catch (Exception $e) {
        // If the database update or email fails, log the error
        file_put_contents('paypal_log.txt', "CRITICAL ERROR: " . $e->getMessage() . "\n", FILE_APPEND);
    }
}

?>