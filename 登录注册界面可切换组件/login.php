<?php
	$uname=$_POST['username'];
	$pword=$_POST['pword'];
	if($uname=="a" && $pword=="123"){
		echo "登录成功";
	}else{
		echo "登录失败";
	}
	
?>