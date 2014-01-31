<?php
header("Content-disposition: attachment; filename=Anfrage.pdf");
header("Content-type: application/pdf");
readfile("Anfrage.pdf");
?>