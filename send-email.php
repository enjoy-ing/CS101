<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Prepare email variables
    $to = "your-email@example.com";  // Replace with your email address
    $subject = "New Contact Form Submission from $name";
    $body = "You have received a new message from your website contact form.\n\n".
            "Here are the details:\n".
            "Name: $name\n".
            "Email: $email\n".
            "Message:\n$message";
    $headers = "From: $email";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "Thank you for contacting us! We'll get back to you shortly.";
    } else {
        echo "Sorry, there was an error sending your message. Please try again later.";
    }
}
?>
