<?php

$files = array();

foreach (glob("./hyak_files/division_maps/*.pdf") as $filename) {
	// echo "$filename size " . filesize($filename) . "\n<br/>";
	array_push($files, $filename);
}

header('Content-Type: application/json');
echo(json_encode($files));

?>