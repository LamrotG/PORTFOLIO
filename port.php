<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $name = htmlspecialchars(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST["message"]));

    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        exit();
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        exit();
    }

    $to = "lgutsa16@gmail.com";
    $subject = "Portfolio Contact Message";
    $body = "Name: $name\nEmail: $email\nMessage:\n$message";

    mail($to, $subject, $body);

    http_response_code(200);
    exit();
}
?>