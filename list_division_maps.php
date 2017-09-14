<?php

$files = array();
$globber = glob("./hyak_files/division_maps/*.pdf");

foreach ($globber as $filename) {
	array_push($files, $filename);
}

header('Content-Type: application/json');
echo(json_encode($files));

?>