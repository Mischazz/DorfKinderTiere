<?php
header("Content-disposition: attachment; filename=Anfahrt.pdf");
header("Content-type: application/pdf");
readfile("Anfahrt.pdf");
?>