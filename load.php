<?php
/**
 * Created by PhpStorm.
 * User: 战-不败的象征
 * Date: 2017/4/11
 * Time: 12:33
 */

$mysqli = new mysqli('localhost','***','***','*');
$data = '';

if(mysqli_connect_errno()){
    die(0);
} else{
    $query = 'SELECT * FROM comment';
    if($result = $mysqli -> query($query)){
        if($result -> num_rows > 0){
            $data .= '[';
            $i = 1;
            while($row = $result -> fetch_assoc()){
                $data .= '{';
                $data .= 'name:"'. $row['name'] .'"';
                $data .= ',title:"'. $row['title'] .'"';
                $data .= ',content:"'. $row['content'] .'"';
                $data .= ',progressNum:"'. $row['progressNum'] .'"';
                $data .= ',qq:"'. $row['qq'] .'"';
                $data .= ',address:"'. $row['address'] .'"';
                $data .= ',date:"'. $row['date'] .'"';
                $data .= ',img:"'. $row['img'] .'"';
                $data .= ',color:"'. $row['color'] .'"';
                $data .= ',id:"'. $row['id'] .'"';
                $data .= ',praise:"'. $row['praise'] .'"';

                $q = 'SELECT * FROM replay WHERE id='. $i;
                $res = $mysqli->query($q);
                $data .= ',replay: [';
                if($res -> num_rows > 0){
                    while ($r = $res -> fetch_assoc()){
                        $data .= '{';
                        $data .='name:"'. $r['name'] .'"';
                        $data .=',text:"'. $r['text'] .'"';
                        $data .=',type:"'. $r['type'] .'"';
                        $data .=',date:"'. $r['date'] .'"';
                        $data .='},';
                    }
                }
                $data .= '{}]';
                $i ++;

                $data .= '},';
            }
            $data .= '{}]';
            echo $data;
        } else{
            echo 2;
        }
    } else{
        echo 1;
    }
}
