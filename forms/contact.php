<?php

$to = 'vivekrabadiya54@gmail.com';
$subject = 'New Message from Contact Form';

// Get form data
$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$subjectField = htmlspecialchars($_POST['subject']);
$message = htmlspecialchars($_POST['message']);

// Email content
$body = "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Subject: $subjectField\n\n";
$body .= "Message:\n$message";

// Email headers
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";

// Send email
if(mail($to, $subject, $body, $headers)) {
    echo 'success';
} else {
    echo 'error';
}
?>
