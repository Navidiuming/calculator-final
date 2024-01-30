const displayResult = document.getElementById("displayResult");
const btn_buttouns = document.querySelectorAll(".padBtn");
const btn_themeChanger = document.getElementById("btn_themeChanger");
const div_mainContainer = document.querySelector(".mainContainer");
const div_littleHistoy = document.getElementById("littleHistory");
let isOperationAdded = false;
let isNumberAfterOperationAdded = false;
let numberAfterOperation = "";
let currentOperationSign = "";
let isResultBtnPushed = false;
for (let i = 0; i < btn_buttouns.length; i++) {
  btn_buttouns[i].addEventListener("click", clickOnBtnPad);
}

function clickOnBtnPad() {
  console.log(this.classList.contains("digitBtn"));
  if (this.classList.contains("digitBtn")) {
    if (isResultBtnPushed == true) {
      displayResult.innerHTML = "0";
      isResultBtnPushed = false;
    }
    // let clickedBtn = this.innerHTML;

    // let displayResultBeforeClick = displayResult.innerHTML;
    // displayResultBeforeClick = displayResult.innerHTML == "0" && this.innerHTML != "." ? "" : displayResult.innerHTML;
    // clickedBtn = displayResult.innerHTML.includes(".") && this.innerHTML == "." ? "" : this.innerHTML;
    // displayResult.innerHTML = displayResultBeforeClick + clickedBtn;
    if (isOperationAdded == true) {
      isNumberAfterOperationAdded = true;
    }
    checkDecimal(isNumberAfterOperationAdded, displayResult, this.innerHTML);

  }

  if (this.classList.contains("mathBtn")) {
    let lastResult = displayResult.innerHTML;
    console.log(lastResult);
    switch (this.getAttribute("id")) {
      case "divideRemaining":
        if (isOperationAdded && isNumberAfterOperationAdded == false) {
          console.log("do nothing");
        } else {
          let result = displayResult.innerHTML + "/100";
          div_littleHistoy.innerHTML = result;
          displayResult.innerHTML = eval(result);
        }
        console.log("%");
        break;
      case "clear":
        console.log("clear");
        reset();
        break;
      case "delet":
        console.log("delet");
        let result = displayResult.innerHTML;
        let lastChar = result.slice(-1);
        let beforeLastChar = result.slice(-2,-1);
        result = result.substring(0, result.length - 1);
        displayResult.innerHTML = result;
        if((lastChar == "+" || lastChar=="-" || lastChar == "*" || lastChar=="/") && (beforeLastChar != "-" || beforeLastChar != "+" || beforeLastChar != "*" || beforeLastChar != "/")){
          isOperationAdded = false;
        }else if((lastChar != "+" || lastChar!="-" || lastChar != "*" || lastChar!="/") && (beforeLastChar == "-" || beforeLastChar == "+" || beforeLastChar == "*" || beforeLastChar == "/")){
          isNumberAfterOperationAdded = false;
        }
        break;
      case "divide":
        console.log("/");
        mainOperatorCompute("/", lastResult);
        break;
      case "root":
        console.log("root");
        if (isOperationAdded && isNumberAfterOperationAdded == false) {
          console.log("do nothing");
        } else if (isOperationAdded == false) {
          let result = "Math.sqrt(" + displayResult.innerHTML + ")";
          div_littleHistoy.innerHTML = "sqr(" + displayResult.innerHTML + ")";
          displayResult.innerHTML = eval(result);
        } else if (isNumberAfterOperationAdded) {
          let index = displayResult.innerHTML.indexOf(currentOperationSign);
          let partOne = displayResult.innerHTML.slice(0, index);
          let partTwo = displayResult.innerHTML.slice(index + 1);
          let result = partOne + currentOperationSign + "Math.sqrt(" + partTwo + ")";
          div_littleHistoy.innerHTML = partOne + currentOperationSign + "sqr(" + partTwo + ")";
          displayResult.innerHTML = eval(result);
        }
        break;
      case "multiply":
        console.log("*");
        mainOperatorCompute("*", lastResult);
        break;
      case "power":
        console.log("power");
        if (isOperationAdded && isNumberAfterOperationAdded == false) {
          console.log("do nothing");
        } else if (isOperationAdded == false) {
          let result = "Math.pow(" + displayResult.innerHTML + ",2)";
          div_littleHistoy.innerHTML = "pow(" + displayResult.innerHTML + ")";
          displayResult.innerHTML = eval(result);
        } else if (isNumberAfterOperationAdded) {
          let index = displayResult.innerHTML.indexOf(currentOperationSign);
          let partOne = displayResult.innerHTML.slice(0, index);
          let partTwo = displayResult.innerHTML.slice(index + 1);
          let result = partOne + currentOperationSign + "Math.pow(" + partTwo + ",2)";
          div_littleHistoy.innerHTML = partOne + currentOperationSign + "pow(" + partTwo + ")";
          displayResult.innerHTML = eval(result);
        }
        break;
      case "minus":
        console.log("-");
        // if(isOperationAdded == false && isNumberAfterOperationAdded == false ){
        //   displayResult.innerHTML = lastResult + " -";
        //   isOperationAdded = true;
        // }else if(isOperationAdded == true && isNumberAfterOperationAdded == false){
        //   displayResult.innerHTML = lastResult.slice(0,-1) + " -";
        // }else if(isOperationAdded && isNumberAfterOperationAdded){
        //   let result = eval(lastResult);
        //   displayResult.innerHTML = result + " -";
        //   isOperationAdded = true;
        //   isNumberAfterOperationAdded = false;
        // }
        mainOperatorCompute("-", lastResult);

        break;
      case "power3":
        console.log("3");
        if (isOperationAdded && isNumberAfterOperationAdded == false) {
          console.log("do nothing");
        } else if (isOperationAdded == false) {
          let result = "Math.pow(" + displayResult.innerHTML + ",3)";
          div_littleHistoy.innerHTML = "cube(" + displayResult.innerHTML + ")";
          displayResult.innerHTML = eval(result);
        } else if (isNumberAfterOperationAdded) {
          let index = displayResult.innerHTML.indexOf(currentOperationSign);
          let partOne = displayResult.innerHTML.slice(0, index);
          let partTwo = displayResult.innerHTML.slice(index + 1);
          let result = partOne + currentOperationSign + "Math.pow(" + partTwo + ",3)";
          div_littleHistoy.innerHTML = partOne + currentOperationSign + "cube(" + partTwo + ")";
          displayResult.innerHTML = eval(result);
        }
        break;
      case "plus":
        mainOperatorCompute("+", lastResult);
        break;
      case "reverse":
        console.log("1/x");
        if (isOperationAdded && isNumberAfterOperationAdded == false) {
          console.log("do nothing");
        } else if (isOperationAdded == false) {
          let result = "1/" + displayResult.innerHTML;
          div_littleHistoy.innerHTML = result;
          displayResult.innerHTML = eval(result);
        } else if (isNumberAfterOperationAdded) {
          let index = displayResult.innerHTML.indexOf(currentOperationSign);
          let partOne = displayResult.innerHTML.slice(0, index);
          let partTwo = displayResult.innerHTML.slice(index + 1);
          let result = partOne + currentOperationSign + "1/" + partTwo;
          div_littleHistoy.innerHTML = result;
          displayResult.innerHTML = eval(result);
        }
        break;
      case "mark":
        console.log("-/+");
        if (isOperationAdded && isNumberAfterOperationAdded == false) {
          console.log("do nothing");
        } else if (isOperationAdded == false) {
          let result = displayResult.innerHTML;
          displayResult.innerHTML = result[0] == "-" ? result.substring(1) : "-" + result;
        } else if (isNumberAfterOperationAdded) {
          let index = displayResult.innerHTML.indexOf(currentOperationSign);
          let partOne = displayResult.innerHTML.slice(0, index);
          let partTwo = displayResult.innerHTML.slice(index + 1);
          if (partTwo[0] == "-") {
            partTwo = partTwo.substring(1);
            let result = partOne + currentOperationSign + partTwo;
            displayResult.innerHTML = result;
          } else {
            partTwo = "-" + partTwo + "";
            let result = partOne + currentOperationSign + partTwo;
            displayResult.innerHTML = result;
          }
        }
        break;
      case "equal":
        console.log("=");
        mainOperatorCompute("=", lastResult);
        break;
      default:
        console.log("not found");
        break;
    }

  }
}
function checkDecimal(checkCondition, displayResult, el) {
  let clickedBtn = el;
  if (checkCondition == false) {
    let displayResultBeforeClick = displayResult.innerHTML;
    displayResultBeforeClick = displayResult.innerHTML == "0" && el != "." ? "" : displayResult.innerHTML;
    clickedBtn = displayResult.innerHTML.includes(".") && el == "." ? "" : el;
    displayResult.innerHTML = displayResultBeforeClick + clickedBtn;
  } else {
    clickedBtn = numberAfterOperation.includes(".") && el == "." ? "" : el;
    displayResult.innerHTML = displayResult.innerHTML + clickedBtn;
    numberAfterOperation = numberAfterOperation + clickedBtn;

    console.log("clicked btn:" + clickedBtn);
  }
}
function mainOperatorCompute(operationSign, lastResult) {
  if (operationSign == "=") {
    if (isNumberAfterOperationAdded == true) {
      div_littleHistoy.innerHTML = lastResult;
      let result = eval(lastResult);
      displayResult.innerHTML = result;
      isOperationAdded = false;
      isNumberAfterOperationAdded = false;
      numberAfterOperation = "";
      isResultBtnPushed = true;
      currentOperationSign = "";
    }

  } else {
    if (isOperationAdded == false && isNumberAfterOperationAdded == false) {
      currentOperationSign = operationSign;
      displayResult.innerHTML = lastResult + operationSign;
      isOperationAdded = true;
    } else if (isOperationAdded == true && isNumberAfterOperationAdded == false) {
      currentOperationSign = operationSign;
      displayResult.innerHTML = lastResult.slice(0, -1) + operationSign;
    } else if (isOperationAdded && isNumberAfterOperationAdded) {
      currentOperationSign = operationSign;
      div_littleHistoy.innerHTML = lastResult;
      let result = eval(lastResult);
      displayResult.innerHTML = result + operationSign;
      isOperationAdded = true;
      isNumberAfterOperationAdded = false;
      numberAfterOperation = "";
    }
    isResultBtnPushed = false;
  }
}
function reset() {
  displayResult.innerHTML = "0";
  isOperationAdded = false;
  isNumberAfterOperationAdded = false;
  numberAfterOperation = "";
  currentOperationSign = "";
  isResultBtnPushed = false;
  div_littleHistoy.innerHTML = "";

}
// change theme
const themes = {
  1: "greenTheme",
  2: "blueTheme",
  3: "myTheme"
}

let themeCounter = 1;
function changeTheme() {
  console.log(themeCounter);
  console.log(themes[themeCounter]);
  themeCounter++;
  if (themeCounter > 4) {
    themeCounter = 1;
  }
  switch (themeCounter) {
    case 1:
      div_mainContainer.classList.add(themes[1]);
      div_mainContainer.classList.remove(themes[2]);
      div_mainContainer.classList.remove(themes[3]);
      break;
    case 2:
      div_mainContainer.classList.add(themes[2]);
      div_mainContainer.classList.remove(themes[1]);
      div_mainContainer.classList.remove(themes[3]);
      break;
    case 3:
      div_mainContainer.classList.add(themes[3]);
      div_mainContainer.classList.remove(themes[2]);
      div_mainContainer.classList.remove(themes[1]);
      break;
    case 4:
      div_mainContainer.classList.remove(themes[2]);
      div_mainContainer.classList.remove(themes[3]);
      div_mainContainer.classList.remove(themes[1]);
      break;
  }
}
btn_themeChanger.addEventListener('click', changeTheme);