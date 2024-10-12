<?php
$servername="localhost";
$username="root";
$password="";
$database="User";

$connect=mysqli_connect($servername,$username,$password,$database);
$warn=false;
$success=false;
if($_SERVER['REQUEST_METHOD']=="POST"){
  $username=$_POST['Username'];
  $password=$_POST['password'];
 $cpassword=$_POST['cpassword'];

//  $exists=false;
 //
 $existsql="SELECT * FROM `sign up data` WHERE Username='$username'";
$result=mysqli_query($connect,$existsql);
$existrow=mysqli_num_rows($result);
if($existrow >  0){
  //  $exists=true;
  $warn="username already exist";
}
else{
  $exists=false;

if($password == $cpassword){
  $hash=password_hash($password, PASSWORD_DEFAULT);
$insert = "INSERT INTO `sign up data` (`sno`, `Username`, `password`, `Date`) VALUES (NULL,'$username', '$hash', current_timestamp())";
$result=mysqli_query($connect,$insert);

if($result){
  $success=true;
}
}
else{
  $warn="password do not match";
}
}
}

?>
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sigh up</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

</head>

<body>
  <?php
   require('parcel/nav.php');
 ?>
  <div class="container ">

    <?php
if($warn){
  echo '<div class="alert alert-danger" role="alert"><strong> Error!</strong> ' .$warn .'</div>';
}
if($success){
  echo '<div class="alert alert-success" role="alert">
  Your username and Password is save you can login now
</div>';
}
   ?>
    <h1 class="text-center">Signup to out website</h1>
    <form action="/Login system/signup.php" method="post" style="width:50%; display: block;margin: auto;">
      <div class="mb-3">
        <label for="Username" class="form-label">Username</label>
        <input type="text" maxlength="11" class="form-control" id="Username" name="Username" aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="text" class="form-control" maxlength="23" id="password" name="password">
      </div>
      <div class="mb-3">
        <label for="cpassword" class="form-label">confirm password</label>
        <input type="text" maxlength="23" class="form-control" id="cpassword" name="cpassword">
        <div id="emailHelp" class="form-text">Please Re-type password.</div>
      </div>
      <button type="submit" class="btn btn-primary mb-3">sign up</button>
    </form>
  </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
</body>

</html>