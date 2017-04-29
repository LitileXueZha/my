<?php
/**
 * Created by PhpStorm.
 * User: 战-不败的象征
 * Date: 2017/4/11
 * Time: 13:40
 */

$mysqli = new mysqli('localhost','root','19960626','my');

if(mysqli_connect_errno()){
    die(0);
} else{
    $query = 'INSERT INTO replay VALUES("'.
        $_POST['id'].'","'.
        $_POST['name'].'","'.
        $_POST['text'].'","'.
        $_POST['date'].'","'.
        $_POST['type'].'")';

    $mysqli -> query($query);
}