<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"];
    $message = $_POST["message"];
    $datetime = date('Y-m-d H:i:s');  // Az aktuális dátum és idő formátuma (év-hónap-nap óra:perc:másodperc)

    // Elmentjük az üzenetet a messages.csv fájlba
    $file = fopen("messages.csv", "a");
    fputcsv($file, array($datetime, $name, $message));
    fclose($file);
}
?>
