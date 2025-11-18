<?php
// Endpoint for admin dashboard to fetch summarized analytics.
session_start();
require_once 'config.php';
header('Content-Type: application/json');

// NOTE: You must implement strong authentication here to ensure only admins can access this data!
// Example: if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) { ... }

// Connect to the database
try {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error) {
        throw new Exception("Connection failed.");
    }
} catch (Exception $e) {
    error_log("Admin Analytics DB Connection Error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
    exit();
}

$response_data = [];

// === QUERY 1: ACTIVE USERS COUNT ===
// Count users who have shown activity in the last 5 minutes (300 seconds)
try {
    $active_sql = "SELECT COUNT(user_id) AS active_count 
                   FROM active_sessions 
                   WHERE last_activity > (NOW() - INTERVAL 5 MINUTE)";
    
    $result = $conn->query($active_sql);
    $active_count = $result->fetch_assoc()['active_count'] ?? 0;
    $response_data['active_users'] = (int)$active_count;

} catch (Exception $e) {
    error_log("Active Users Query Error: " . $e->getMessage());
    $response_data['active_users'] = 0;
}


// === QUERY 2: SUMMARY METRICS (Average Clicks & Time) ===
try {
    $summary_sql = "SELECT 
                        COUNT(order_id) AS total_orders,
                        ROUND(AVG(clicks_to_order), 1) AS avg_clicks,
                        ROUND(AVG(time_ms) / 1000, 1) AS avg_time_sec,
                        MAX(timestamp) AS last_order_time
                    FROM order_analytics";
    
    $result = $conn->query($summary_sql);
    $summary_data = $result->fetch_assoc();
    
    $response_data['summary'] = [
        'total_orders' => (int)($summary_data['total_orders'] ?? 0),
        'avg_clicks' => (float)($summary_data['avg_clicks'] ?? 0),
        'avg_time_sec' => (float)($summary_data['avg_time_sec'] ?? 0),
        'last_order_time' => $summary_data['last_order_time'] ?? 'N/A'
    ];

} catch (Exception $e) {
    error_log("Summary Metrics Query Error: " . $e->getMessage());
    $response_data['summary'] = [];
}


// === QUERY 3: CLICKS Histogram (Data for Chart) ===
// Fetch clicks data grouped by click count for visualization
/*try {
    $clicks_hist_sql = "SELECT 
                            clicks_to_order, 
                            COUNT(order_id) as count 
                        FROM order_analytics
                        GROUP BY clicks_to_order
                        ORDER BY clicks_to_order ASC
                        LIMIT 10"; // Limit to top 10 click counts for clean chart
    
    $result = $conn->query($clicks_hist_sql);
    $clicks_histogram = [];
    while($row = $result->fetch_assoc()) {
        $clicks_histogram[] = [
            'clicks' => (int)$row['clicks_to_order'],
            'count' => (int)$row['count']
        ];
    }
    $response_data['clicks_histogram'] = $clicks_histogram;

} catch (Exception $e) {
    error_log("Clicks Histogram Query Error: " . $e->getMessage());
    $response_data['clicks_histogram'] = [];
}
*/

try {
    // NOTE: This assumes your 'users' table has a DATETIME column named 'registration_date'
    $reg_hist_sql = "SELECT 
                         DATE(registration_date) AS reg_date, 
                         COUNT(customer_id) AS count 
                     FROM users
                     GROUP BY reg_date
                     ORDER BY reg_date ASC"; 
    
    $result = $conn->query($reg_hist_sql);
    $registration_data = [];
    while($row = $result->fetch_assoc()) {
        $registration_data[] = [
            'date' => $row['reg_date'],
            'count' => (int)$row['count']
        ];
    }
    // New key for the JavaScript to read
    $response_data['registration_data'] = $registration_data;

} catch (Exception $e) {
    error_log("Registration Histogram Query Error: " . $e->getMessage());
    $response_data['registration_data'] = [];
}

$stmt->close();
$conn->close();

echo json_encode(['success' => true, 'data' => $response_data]);

?>