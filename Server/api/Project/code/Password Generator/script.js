const passwordBox = document.getElementById("Password");
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const number = "0123456789";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const symbol = "*/<>?,|-@#$%^&*()";
const allchar = symbol + number + lowercase + uppercase;
const length = 12;
function createpassword() {
  let password = "";
  while (password.length < length) {
    password += allchar[Math.floor(Math.random() * allchar.length)];
    passwordBox.value = password;
  }
}

function copypassword() {
  passwordBox.select();
  document.execCommand("copy");
}
