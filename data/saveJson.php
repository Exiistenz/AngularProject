<?php
  	$json = file_get_contents("php://input");
  	$file = fopen('db.json','w+');
  	fwrite($file, $json);
  	fclose($file);
?>