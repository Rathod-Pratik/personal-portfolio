<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <title>AJAX</title>
  <script>
    function fun(str) {
      console.log(str);
      let xhr;

      function change() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          document.getElementById('texthint').innerHTML = xhr.responseText;
        }
      }

      xhr = new XMLHttpRequest();
      xhr.open("GET", "AJAX DB.php?no=" + str, true);  <!-- Changed filename to avoid spaces -->
      xhr.onreadystatechange = change;
      xhr.send();
    }
  </script>
</head>

<body>
  <form style="display: flex;justify-content: center; margin-top:12px;">
    <label for="no">Select the data:</label>
    <select name="no" id="select" onchange="fun(this.value)">
      <?php
      $server = "localhost";
      $username = "root";
      $database = "Royal";
      $password = "";

      $connect = mysqli_connect($server, $username, $password, $database);
      if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
      }
      $sql = "SELECT * FROM `notes`";

      $result = mysqli_query($connect, $sql);

      while ($row = mysqli_fetch_array($result)) {
        echo "<option value='" . $row[0] . "'>" . $row[1] . "</option>";
      }
      mysqli_close($connect);
      ?>
    </select>
  </form>
  <div id="texthint"></div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>


Content inside AJAX DB.php
<?php 
$server = "localhost";
$username = "root";
$database = "Royal";
$password = "";

// Create connection
$connect = mysqli_connect($server, $username, $password, $database);

// Check connection
if (!$connect) {
    die("Connection failed: " . mysqli_connect_error());
}

// Check if the 'no' parameter is set
if (isset($_GET['no']) && !empty($_GET['no'])) {
    $n = $_GET['no'];

    // Use prepared statements to prevent SQL injection
    $stmt = $connect->prepare("SELECT * FROM `notes` WHERE `no` = ?");
    $stmt->bind_param("s", $n);  // "s" means the parameter is a string

    // Execute the statement
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    // Check if any row is returned
   if ($result && $result->num_rows > 0) {
    echo "<div class='container mt-4'>";
    echo "<table class='table table-bordered table-striped'>";
    echo "<thead class='thead-dark'>";
    echo "<tr><th>Sr. No</th><th>Name</th><th>Course</th><th>Mobile No</th></tr>";
    echo "</thead>";
    echo "<tbody>";
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . htmlspecialchars($row["no"]) . "</td>";
        echo "<td>" . htmlspecialchars($row["name"]) . "</td>";
        echo "<td>" . htmlspecialchars($row["course"]) . "</td>";
        echo "<td>" . htmlspecialchars($row["mo"]) . "</td>";
        echo "</tr>";
    }
    echo "</tbody>";
    echo "</table>";
    echo "</div>";
} else {
    echo "No data found for the given parameter.";
}

    // Close the statement
    $stmt->close();
} else {
    echo "No parameter provided.";
}

// Close the connection
mysqli_close($connect);
?>
