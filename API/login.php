<?php
//Done by Nathan Duarte
// 1. Start a session
// This allows us to store information about the logged-in user
session_start();

// 2. Include the database configuration file
require_once 'config.php';
require_once 'common_function.php';

// 3. Set the response header to JSON
// This tells the browser that our response will be in JSON format
header('Content-Type: application/json');

// 4. Get the JSON data sent from the JavaScript frontend
$request_data = json_decode(file_get_contents('php://input'), true);

// 5. Basic Validation: Check if email and password were sent
if (!isset($request_data['email']) || !isset($request_data['password'])) {
    // Send a JSON error response and stop the script
    echo json_encode(['success' => false, 'message' => 'Email and password are required.']);
    exit();
}

$email = $request_data['email'];
$password_attempt = $request_data['password'];

// 6. Connect to the database using MySQLi
try{
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
    exit();
}

// 7. Prepare a secure SQL statement to prevent SQL injection
$sql = "SELECT customer_id, email, password_hash FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    echo json_encode(['success' => false, 'message' => 'Failed to prepare SQL statement.']);
    exit();
}

// Bind the user's email to the statement
$stmt->bind_param("s", $email);

// Execute the statement
$stmt->execute();

// Get the result
$result = $stmt->get_result();

// 8. Check if a user with that email was found
if ($result->num_rows === 1) {
    // A user was found, fetch their data
    $user = $result->fetch_assoc();
    $stored_hash = $user['password_hash'];

    // 9. Verify the submitted password against the stored hash
    if (password_verify($password_attempt, $stored_hash)) {
        // Passwords match! Login is successful.

        // Store user info in the session
        $_SESSION['user_id'] = $user['customer_id'];
        $_SESSION['user_email'] = $user['email'];

        // Send a success response back to the frontend
        echo json_encode([
            'success' => true,
            'message' => 'Login successful!',
            'user' => [
                'email' => $user['email']
            ]
        ]);

    } else {
        // Passwords do not match.
        echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
    }
} else {
    // No user found with that email.
    echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
}

// 10. Close the statement and the database connection
$stmt->close();
$conn->close();

?>
