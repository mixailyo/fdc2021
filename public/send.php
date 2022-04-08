<?php
    $urname = $_POST['urname'];
    $urtel = $_POST['urtel'];
    $urname = htmlspecialchars($urname);
    $urtel = htmlspecialchars($urtel);
    $urname = urldecode($urname);
    $urtel = urldecode($urtel); 


    if (mail("test@gmail.com", "Заявка", "Имя:".$urname.". Телефон: ".$urtel ,"From: test2@gmail.com \r\n")) {
        header("Location: /thanks.html");
    }

    if(@mail($email, $subject, $message, $headers)){
      echo "Отправлено";
    }else{
      echo "Не отправлено";
    } 
?>