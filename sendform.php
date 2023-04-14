<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

//for file
$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('en', 'phpmailer/language');		//errors on english
$mail->IsHTML(true);

//message from 
$mail->setFrom('pjtwigg@indox.com', 'Newsletter subscription');
//message to
$mail->addAddress('pamela@pjtwigg.com');
//$mail->addAddress('myone72@yahoo.com');
//тема письма
$mail->Subject = 'Newsletter subscription';


//Тема письма 
$body = '<h1>Newsletter subscription (automatic message)</h1>';


//проверка, если поле не пустое, то выводим введеные в него данные 
if(trim(!empty($_POST['name']))){
	$body.='<p><strong>Name:</strong> '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))){
	$body.='<p><strong>Email:</strong> '.$_POST['email'].'</p>';
}

$mail->Body = $body;  //собранная переменная $body присваевается в плагин 

//обработчик отправки
if (!$mail->send()){
	$message = 'Error';
} else {
	$message = 'Request sent!';
}

$response = ['massage' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>