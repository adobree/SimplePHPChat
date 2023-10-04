<?php
// Olvassuk ki az üzeneteket a messages.csv fájlból és rendezzük őket
$lines = array_map('str_getcsv', file('messages.csv'));
usort($lines, function($a, $b) {
    // Az idő alapján rendezzük csökkenő sorrendben
    return strtotime($b[0]) - strtotime($a[0]);
});

// Kiírjuk a rendezett üzeneteket
foreach ($lines as $line) {
    // Csak az óra és perc jelenjen meg az időből
    $time = date('H:i', strtotime($line[0]));
    echo $time . " - " . $line[1] . ": <br><div class='uzenet'>" . $line[2] . "</div>";
}
?>