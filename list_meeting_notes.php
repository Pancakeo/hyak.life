<?php

$files = array();

foreach (glob("./hyak_files/meeting_notes/**/*.pdf") as $filename) {
	array_push($files, $filename);
}

$files = array_reverse($files);
header('Content-Type: application/json');
echo(json_encode($files));

?>