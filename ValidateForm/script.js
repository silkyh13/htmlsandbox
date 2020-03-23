const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");

//show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}
//show input success message
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

//check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return re.test(String(input).toLowerCase());
  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}
//get the label
function getFieldName(input) {
  //input == <input type="text" id="email" placeholder="Enter email">
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//function check length of input
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}
//function check passwords match
function checkPasswords(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Password do not match");
  } else if (input2.value == "") {
    showError(input2, "Password is required");
  } else {
    showSuccess(input2);
  }
}
//Event Listener
form.addEventListener("submit", function(e) {
  e.preventDefault();

  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
});
// //username
// validateInput(username, "Username");
// //email
// validateInput(email, "Email");

// //password
// validateInput(password, "Password");
// //confirm password
// validateInput(password2, "Password2");

// function validateInput(input, message) {
//   if (input.value === "") {
//     showError(input, `${message} is required`);
//   } else if (message == "Username" && input.value.length < 8) {
//     showError(input, "Username needs to be at least 8 characters");
//   } else if (message == "Email" && !validateEmail(input.value)) {
//     showError(input, "Email is not valid");
//   } else if (
//     (message == "Password" || message == "Password2") &&
//     input.value.length < 8
//   ) {
//     showError(input, "Password needs to be at least 8 characters");
//   } else if (message == "Password2" && input.value !== password.value) {
//     showError(password2, "Password needs to match");
//   } else {
//     showSuccess(input);
//   }
// }
