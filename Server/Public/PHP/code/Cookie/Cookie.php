<?php
// Set the cookie
setcookie("category", "books", time() + 86400, "/");
?>
<!DOCTYPE html>
<html>
<head>
    <title>Set Cookie</title>
</head>
<body>
    <p>Cookie has been set. <a href="read_cookie.php">Go to next page to read the cookie.</a></p>
</body>
</html>


Content Inside read_cookie.php

<?php
// Check if the cookie is set
if(isset($_COOKIE["category"])) {
    $cat = $_COOKIE["category"];
    echo "Category: " . $cat;
} else {
    echo "Cookie is not set.";
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Read Cookie</title>
</head>
<body>
    <p><a href="Cookie.php">Back to set cookie page</a></p>
</body>
</html>
