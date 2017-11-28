<?php
// Constants
$FIREBASE = "_YOUR_FIREBASE_URL_";
$NODE_DELETE = "temperature.json";
$NODE_GET = "temperature.json";
$NODE_PATCH = ".json";
$NODE_PUT = "temperature.json";
// Data for PUT
// Node replaced
$data = 32;
// Data for PATCH
// Matching nodes updated
$data = array(
    "temperature" => 42
);
// JSON encoded
$json = json_encode( $data );
// Initialize cURL
$curl = curl_init();
// Create
// curl_setopt( $curl, CURLOPT_URL, $FIREBASE . $NODE_PUT );
// curl_setopt( $curl, CURLOPT_CUSTOMREQUEST, "PUT" );
// curl_setopt( $curl, CURLOPT_POSTFIELDS, 32 );
// Read
// curl_setopt( $curl, CURLOPT_URL, $FIREBASE . $NODE_GET );
// Update
curl_setopt( $curl, CURLOPT_URL, $FIREBASE . $NODE_PATCH );
curl_setopt( $curl, CURLOPT_CUSTOMREQUEST, "PATCH" );
curl_setopt( $curl, CURLOPT_POSTFIELDS, $json );
// Delete
// curl_setopt( $curl, CURLOPT_URL, $FIREBASE . $NODE_DELETE );
// curl_setopt( $curl, CURLOPT_CUSTOMREQUEST, "DELETE" );
// Get return value
curl_setopt( $curl, CURLOPT_RETURNTRANSFER, true );
// Make request
// Close connection
$response = curl_exec( $curl );
curl_close( $curl );
// Show result
echo $response . "\n";
?>