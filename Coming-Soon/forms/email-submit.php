<?php

header('Content-Type: application/json');

$return = [];

function checkFields($val) {
    $val = trim(htmlspecialchars($val));

    if ($val === "") {
        return false;
    }

    return $val;
}

if (isset($_POST) && (strtoupper($_SERVER['REQUEST_METHOD']) === "POST") && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && (strtoupper($_SERVER['HTTP_X_REQUESTED_WITH']) === "XMLHTTPREQUEST")) {
    $fields = array_map('checkFields', $_POST);

    foreach ($fields as $field) {
        if ($field === false) {
            $return['error'] = "Email address is required.";

            echo json_encode($return);

            return;
        }
    }

    if (!filter_var($fields['email-form-email'], FILTER_VALIDATE_EMAIL)) {
        $return['error'] = "Please enter a valid email address.";

        echo json_encode($return);

        return;
    }

    //write to csv
    $csvFile = 'eUbfxzYtPNDNqQKaBfZqtfQGTqrOYU7jcuSE97OKKX50rFlFlwwB9DDumMPFzX5VCSnu65fDEkWjaEoT.csv';

    if (!file_exists($csvFile)) {
        file_put_contents($csvFile, "ID,Email\n");
    }

    $csv     = @fopen($csvFile, 'a');
    $csvRead = @file($csvFile);

    $write = @fputcsv($csv, [count($csvRead), $fields['email-form-email']]);

    @fclose($csv);

    if ($write) {
        $return['success'] = 'Thanks, we\'ll be in touch soon!';
    } else {
        $return['error'] = 'There was an error writing this submission.';
    }
}

echo json_encode($return);
?>
