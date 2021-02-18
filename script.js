// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  $("#lengthModal").modal("show");
  alertMessage.style.display = "none";
}
var lengthNextButton = document.querySelector("#lengthNextButton");

function handleClick() {
  var minInput = document.querySelector("#minInput").value;
  var maxInput = document.querySelector("#maxInput").value;
  var numericInput = document.querySelector("#numericCheckbox").checked;
  var upperInput = document.querySelector("#upperCheckbox").checked;
  var lowerInput = document.querySelector("#lowerCheckbox").checked;
  var specialInput = document.querySelector("#specialCheckbox").checked;
  var alertMessage = document.querySelector("#alertMessage");

  // condition to display alert if user doesnt select a character2

  if (!numericInput && !upperInput && !lowerInput && !specialInput) {
    alertMessage.style.display = "block";

    return;
  }

  //returns valid numbers from min/max input
  var minNumber = parseInt(minInput, 10);

  var maxNumber = parseInt(maxInput, 10);
  // displays alert message and keep modal displayed if the min/max critera is not met
  if (!minNumber || !maxNumber) {
    alertMessage.style.display = "block";

    return;
  }
  if (minNumber > maxNumber) {
    alertMessage.style.display = "block";
    return;
  }

  if (minNumber < 8 || maxNumber > 128) {
    alertMessage.style.display = "block";
    return;
  }

  // add value to variable password based on chars specified
  var securePassword = generatePassword(
    minNumber,
    maxNumber,
    specialInput,
    numericInput,
    upperInput,
    lowerInput
  );

  var passwordText = document.querySelector("#password");
  passwordText.value = securePassword;

  $("#lengthModal").modal("hide");
}
// add event listener to next button
lengthNextButton.addEventListener("click", handleClick);

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// copied from mdn docs to create a number randomizer https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
// creats string values of characters
let lower = "abcdefghijklmnopqrstuvwxyz";
let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let special = "!@#$%^&*()_+|~`;'][";
let numeric = "1234567890";

// make a function that generates a random password based on specific requirements of user
function generatePassword(
  min,
  max,
  allowLower,
  allowUpper,
  allowSpecial,
  allowNumeric
) {
  let allowedChars = "";

  if (allowLower) {
    allowedChars += lower;
  }
  if (allowUpper) {
    allowedChars += upper;
  }
  if (allowNumeric) {
    allowedChars += numeric;
  }
  if (allowSpecial) {
    allowedChars += special;
  }

  //creates a password length
  let passwordLength = getRandomInt(max - min) + min;
  let result = "";
  for (let i = 0; i < passwordLength; i++) {
    let randomNumber = getRandomInt(allowedChars.length);
    let randomChar = allowedChars.charAt(randomNumber);

    result += randomChar;
  }
}
