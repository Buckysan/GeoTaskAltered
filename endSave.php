<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
ini_set("display_errors", true);
ini_set("auto_detect_line_endings", true);
ini_set("memory_limit", -1);
set_time_limit(0);
$log = "";
function sulk($err, $code) {
    die(json_encode($out));
}
// Unpack POST data
    $out = array(
        "error" => $err,
        "code" => $code,
    );
$tmp = file_get_contents("php://input");

$filename = "./data/endInfo.txt";

$rhandle = fopen($filename, "r");
$file = fread($rhandle, filesize("./data/endInfo.txt"));
fclose($rhandle);

$tmp .= $file;

$handle = fopen($filename, "w+b");

fwrite($handle, $tmp);
fclose($handle);
?>