console.log("I am a Javascript file");

var victorMass = 65.77;
var victorHeight = 1.80;
var johnMass = 62.14;
var johnHeight = 1.74;

var victorBMI = victorMass / (victorHeight * victorHeight);
var johnBMI = johnMass / (johnHeight * johnHeight);

console.log(victorBMI = Math.round(victorBMI * 100) / 100);
console.log(johnBMI = Math.round(johnBMI * 100) / 100);

var compareBMI = victorBMI > johnBMI;

function BMI(compareBMI) {
  if (compareBMI == true) {
    return console.log("Victor's BMI is higher than John's");
  } else {
    return console.log("John's BMI is higher than Victor's");
  }
}

BMI();
