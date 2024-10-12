<?php
$servername="localhost";
$username="root";
$password="";
$database="User";

$connect=mysqli_connect($servername,$username,$password,$database);
$warn=false;
$login=false;
if($_SERVER['REQUEST_METHOD']=="POST"){
  $username=$_POST['Username'];
  $password=$_POST['password'];
  

  // $insert = "SELECT * FROM `sign up data` WHERE Username='$username' AND password='$password'";
   $insert = "SELECT * FROM `sign up data` WHERE Username='$username'";
$result=mysqli_query($connect,$insert);

$num=mysqli_num_rows($result);
if($num==1){

  while($row=mysqli_fetch_assoc($result)){
            if(password_verify($password,$row['password'])){
              $login=true;
            }
            else{
              $warn="Invalid credentials";
            }
        }
  $login=true;
  session_start();
  $_SESSION['loggedin']=true;
  $_SESSION['username']=$username;
  header("location:welcome.php");
}
else{
  $warn="Invalid credentials";
}
}
?>
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Login</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
 
</head>

<body>
  <?php
   require('parcel/nav.php');
 ?>
  <div class="container ">
  <?php
if($login){
  echo '<div class="alert alert-danger" role="alert">Password not match with retype password</div>';
}
if($login){
  echo '<div class="alert alert-success" role="alert">
 you are login now
</div>';
}
   ?>
    <h1 class="text-center">Login to out website</h1>
    <form action="/Login system/Login.php" method="post" style="width:50%; display: block;margin: auto;">
      <div class="mb-3">
        <label for="Username" class="form-label">Username</label>
        <input type="text" class="form-control" id="Username" name="Username" aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="text" class="form-control" id="password" name="password">
      </div>
      <button type="submit" class="btn btn-primary mb-3">Login</button>
    </form>
  </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
</body>
</html>