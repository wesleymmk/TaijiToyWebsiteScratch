<?php
// Include the database configuration
require_once 'config.php';

// Set the response header to JSON
header('Content-Type: application/json');

// Get the JSON data from the frontend
$request_data = json_decode(file_get_contents('php://input'), true);

// Basic Validation
if (!isset($request_data['email']) || !isset($request_data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Email and password are required.']);
    exit();
}

$email = $request_data['email'];
$password = $request_data['password'];

// More validation
if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Please fill in all fields.']);
    exit();
}

if (strlen($password) < 8) {
    echo json_encode(['success' => false, 'message' => 'Password must be at least 8 characters long.']);
    exit();
}

// Connect to the database
try{
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error) {
        throw new Exception("Connection failed. " . $conn->connect_error);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
    exit();
}


// --- Check if the email already exists ---
$sql_check = "SELECT customer_id FROM users WHERE email = ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("s", $email);
$stmt_check->execute();
$stmt_check->store_result();

if ($stmt_check->num_rows > 0) {
    // Email is already taken
    echo json_encode(['success' => false, 'message' => 'An account with this email already exists.']);
    $stmt_check->close();
    $conn->close();
    exit();
}
$stmt_check->close();


// --- If email is not taken, proceed with registration ---

// Hash the password securely
$password_hash = password_hash($password, PASSWORD_DEFAULT);

// Prepare the SQL INSERT statement
$sql_insert = "INSERT INTO users (email, password_hash) VALUES (?, ?)";
$stmt_insert = $conn->prepare($sql_insert);

if ($stmt_insert === false) {
    echo json_encode(['success' => false, 'message' => 'Failed to prepare SQL statement.']);
    exit();
}

// Bind the parameters
$stmt_insert->bind_param("ss", $email, $password_hash);

// Execute the statement and check for success
if ($stmt_insert->execute()) {
    echo json_encode(['success' => true, 'message' => 'Account created successfully! You can now log in.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to create account. Please try again.']);
}

// Close the statement and connection
$stmt_insert->close();
$conn->close();

?>