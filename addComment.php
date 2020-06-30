<?php
/**
 * Created by PhpStorm.
 * User: 战-不败的象征
 * Date: 2017/4/11
 * Time: 10:31
 */

$mysqli = new mysqli('localhost', '***', '***', '**');
if(mysqli_connect_errno()){
    die('数据库加载失败！');
} else{
    if($_FILES['img']['name'] == ''){
        $name = '000.jpg';
    } else{
        $name = date('Y-m-d-h-i-s') .'.jpg';
    }
    $query = 'INSERT INTO comment VALUES ("'.
        $_POST['name'].'","'.
        $_POST['title'].'","'.
        $_POST['content'].'","'.
        $_POST['progressNum'].'","'.
        $_POST['qq'].'","'.
        $_POST{'address'}.'","'.
        $_POST['date'].'","'.
        $name.'","'.
        $_POST['color'].'","'.
        $_POST['id'].'",0)';
    $mysqli -> query($query);

    move_uploaded_file($_FILES['img']['tmp_name'], '***'. $name);
    echo $name;
}