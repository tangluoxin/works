<?php
	$username=$_POST['username'];
	$pword=$_POST['pword'];
	if($username=="a"){
		echo "The username already exists";
	}else{
		echo " register success";
	}
?>