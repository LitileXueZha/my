<?php
/**
 * Created by PhpStorm.
 * User: 战-不败的象征
 * Date: 2017/4/11
 * Time: 14:37
 */

$mysqli = new mysqli('localhost','***','***','*');
$query = 'UPDATE comment SET praise='.$_POST['praise'].' WHERE id='.$_POST['id'];
$mysqli -> query($query);
