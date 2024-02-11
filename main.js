const displayResult = document.getElementById("displayResult");
const btn_buttouns = document.querySelectorAll(".padBtn");
const btn_memeoryButtouns = document.querySelectorAll(".memoryBtn");
const btn_themeChanger = document.getElementById("btn_themeChanger");
const div_mainContainer = document.querySelector(".mainContainer");
const div_littleHistoy = document.getElementById("littleHistory");
const p_rightMenuItem = document.querySelectorAll(".historyAndMemoryBar *");
const div_historyTabs = document.querySelectorAll(".historyResultBar div");
const p_noHistoryP = document.getElementById("noHistoryP");
const btn_deletHistoryBar = document.getElementById("deletHistoryBar");
let isOperationAdded = false;
let isNumberAfterOperationAdded = false;
let numberAfterOperation = "";
let currentOperationSign = "";
let isResultBtnPushed = false;
let numberInMemory = "0";
for (let i = 0; i < btn_buttouns.length; i++) {
  btn_buttouns[i].addEventListener("click", clickOnBtnPad);
}

for (let i = 0; i < btn_memeoryButtouns.length; i++) {
  btn_memeoryButtouns[i].addEventListener("click", clickOnMemoryBtn);
}

for (let i = 0; i < p_rightMenuItem.length; i++) {
  p_rightMenuItem[i].addEventListener("click", changeRitghtMenu);
}

function changeRitghtMenu() {
  for (let i = 0; i < p_rightMenuItem.length; i++) {
    p_rightMenuItem[i].classList.remove("underLine");
  }
  this.classList.add("underLine");
  console.log(this.innerHTML);
  if (this.innerHTML == "History") {
    div_historyTabs[0].classList.add("flex");
    div_historyTabs[0].classList.remove("hidden");
    div_historyTabs[1].classList.add("hidden");
    div_historyTabs[1].classList.remove("flex");
    console.log(div_historyTabs[0]);
  } else {
    div_historyTabs[1].classList.add("flex");
    div_historyTabs[1].classList.remove("hidden");
    div_historyTabs[0].classList.add("hidden");
    div_historyTabs[0].classList.remove("flex");
    console.log(div_historyTabs[1]);
  }
}
function clickOnBtnPad() {
  if (this.classList.contains("digitBtn")) {
    if (isResultBtnPushed == true) {
      displayResult.innerHTML = "0";
      isResultBtnPushed = false;
    }
    if (isOperationAdded == true) {
      isNumberAfterOperationAdded = true;
    }
    checkDecimal(isNumberAfterOperationAdded, displayResult, this.innerHTML);

  }

  if (this.classList.contains("mathBtn")) {
    let lastResult = displayResult.innerHTML;
    switch (this.getAttribute("id")) {
      case "divideRemaining":
        if (isOperationAdded && isNumberAfterOperationAdded == false) {
          console.log("do nothing");
        } else {
          let result = displayResult.innerHTML + "/100";
          div_littleHistoy.innerHTML = result;
          let finalResult = eval(result);
          finalResult = parseFloat(finalResult.toFixed(5));
          displayResult.innerHTML = finalResult;

          addHistoryResult(result,finalResult,0);
        }
        break;
      case "clear":
        reset();
        break;
      case "delet":
        let result = displayResult.innerHTML;

        let lastChar = result.slice(-1);
        let beforeLastChar = result.slice(-2, -1);
        if (beforeLastChar == "") {
          displayResult.innerHTML = "0";
        }
        else {
          result = result.substring(0, result.length - 1);
          displayResult.innerHTML = result;
          if ((lastChar == "+" || lastChar == "-" || lastChar == "*" || lastChar == "/") && (beforeLastChar != "-" || beforeLastChar != "+" || beforeLastChar != "*" || beforeLastChar != "/")) {
            isOperationAdded = false;
          } else if ((lastChar != "+" || lastChar != "-" || lastChar != "*" || lastChar != "/") && (beforeLastChar == "-" || beforeLastChar == "+" || beforeLastChar == "*" || beforeLastChar == "/")) {
            isNumberAfterOperationAdded = false;
          }
        }
        break;
      case "divide":
        mainOperatorCompute("/", lastResult);
        break;
      case "root":
        if (isOperationAdded && isNumberAfterOperationAdded == false) {
          console.log("do nothing");
        } else if (isOperationAdded == false) {
          let result = "Math.sqrt(" + displayResult.innerHTML + ")";
          div_littleHistoy.innerHTML = "sqr(" + displayResult.innerHTML + ")";
          let finalResult = eval(result);
          finalResult = parseFloat(finalResult.toFixed(5));
          displayResult.innerHTML = finalResult;

          addHistoryResult(div_littleHistoy.innerHTML,finalResult,0)
        } else if (isNumberAfterOperationAdded) {
          let index = displayResult.innerHTML.indexOf(currentOperationSign);
          let partOne = displayResult.innerHTML.slice(0, index);
          let partTwo = displayResult.innerHTML.slice(index + 1);
          let result = partOne + currentOperationSign + "Math.sqrt(" + partTwo + ")";
          div_littleHistoy.innerHTML = partOne + currentOperationSign + "sqr(" + partTwo + ")";
          let finalResult = eval(result);
          finalResult = parseFloat(finalResult.toFixed(5));
          displayResult.innerHTML = finalResult;

          addHistoryResult(div_littleHistoy.innerHTML,finalResult , 0);
        }
        break;
      case "multiply":
        mainOperatorCompute("*", lastResult);
        break;
      case "power":
        if (isOperationAdded && isNumberAfterOperationAdded == false) {
          console.log("do nothing");
        } else if (isOperationAdded == false) {
          let result = "Math.pow(" + displayResult.innerHTML + ",2)";
          div_littleHistoy.innerHTML = "pow(" + displayResult.innerHTML + ")";
          let finalResult = eval(result);
          finalResult = parseFloat(finalResult.toFixed(5));
          displayResult.innerHTML = finalResult;

          addHistoryResult(div_littleHistoy.innerHTML,finalResult,0);
        } else if (isNumberAfterOperationAdded) {
          let index = displayResult.innerHTML.indexOf(currentOperationSign);
          let partOne = displayResult.innerHTML.slice(0, index);
          let partTwo = displayResult.innerHTML.slice(index + 1);
          let result = partOne + currentOperationSign + "Math.pow(" + partTwo + ",2)";
          div_littleHistoy.innerHTML = partOne + currentOperationSign + "pow(" + partTwo + ")";
          let finalResult = eval(result);
          finalResult = parseFloat(finalResult.toFixed(5));
          displayResult.innerHTML = finalResult;
          addHistoryResult(div_littleHistoy.innerHTML,finalResult,0);
        }
        break;
      case "minus":
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
        if (isOperationAdded && isNumberAfterOperationAdded == false) {
          console.log("do nothing");
        } else if (isOperationAdded == false) {
          let result = "Math.pow(" + displayResult.innerHTML + ",3)";
          div_littleHistoy.innerHTML = "cube(" + displayResult.innerHTML + ")";
          let finalResult = eval(result);
          finalResult = parseFloat(finalResult.toFixed(5));
          displayResult.innerHTML = finalResult;

          addHistoryResult(div_littleHistoy.innerHTML,finalResult,0);
        } else if (isNumberAfterOperationAdded) {
          let index = displayResult.innerHTML.indexOf(currentOperationSign);
          let partOne = displayResult.innerHTML.slice(0, index);
          let partTwo = displayResult.innerHTML.slice(index + 1);
          let result = partOne + currentOperationSign + "Math.pow(" + partTwo + ",3)";
          div_littleHistoy.innerHTML = partOne + currentOperationSign + "cube(" + partTwo + ")";
          let finalResult = eval(result);
          finalResult = parseFloat(finalResult.toFixed(5));
          displayResult.innerHTML = finalResult;

          addHistoryResult(div_littleHistoy.innerHTML,finalResult,0);
          
        }
        break;
      case "plus":
        mainOperatorCompute("+", lastResult);
        break;
      case "reverse":
        if (isOperationAdded && isNumberAfterOperationAdded == false) {
          console.log("do nothing");
        } else if (isOperationAdded == false) {
          let result = "1/" + displayResult.innerHTML;
          div_littleHistoy.innerHTML = result;
          let finalResult = eval(result);
          finalResult = parseFloat(finalResult.toFixed(5));
          displayResult.innerHTML = finalResult;

          addHistoryResult(div_littleHistoy.innerHTML,finalResult,0);
        } else if (isNumberAfterOperationAdded) {
          let index = displayResult.innerHTML.indexOf(currentOperationSign);
          let partOne = displayResult.innerHTML.slice(0, index);
          let partTwo = displayResult.innerHTML.slice(index + 1);
          let result = partOne + currentOperationSign + "1/" + partTwo;
          div_littleHistoy.innerHTML = result;
          let finalResult = eval(result);
          finalResult = parseFloat(finalResult.toFixed(5));
          displayResult.innerHTML = finalResult;

          addHistoryResult(div_littleHistoy.innerHTML,finalResult,0);
        }
        break;
      case "mark":
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
        mainOperatorCompute("=", lastResult);
        break;
      default:
        console.log("not found");
        break;
    }

  }
}
function clickOnMemoryBtn() {
  currenBtn = this.innerHTML;
  switch (currenBtn) {
    case "M+":
      if (isOperationAdded == false) {
        numberInMemory = eval(numberInMemory + "+" + displayResult.innerHTML);
        addHistoryResult("M" , numberInMemory , 1);
      } else if (numberAfterOperation) {
        let index = displayResult.innerHTML.indexOf(currentOperationSign);
        let partOne = displayResult.innerHTML.slice(0, index);
        let partTwo = displayResult.innerHTML.slice(index + 1);
        numberInMemory = eval(numberInMemory + "+" + partTwo);
        addHistoryResult("M", numberInMemory,1);
      }
      break;

    case "M-":
      if (isOperationAdded == false) {
        numberInMemory = eval(numberInMemory - displayResult.innerHTML);
        addHistoryResult("M" , numberInMemory , 1);
      } else if (numberAfterOperation) {
        let index = displayResult.innerHTML.indexOf(currentOperationSign);
        let partOne = displayResult.innerHTML.slice(0, index);
        let partTwo = displayResult.innerHTML.slice(index + 1);
        numberInMemory = eval(numberInMemory - partTwo);
        addHistoryResult("M" , numberInMemory , 1);
      }
      break;

    case "MC":
      numberInMemory = "0";
      addHistoryResult("M" , numberInMemory , 1);
      console.log(currenBtn);
      break;

    case "MR":
      console.log(isOperationAdded == false && numberInMemory != "0");
      if (isOperationAdded && numberInMemory != "0") {
        let index = displayResult.innerHTML.indexOf(currentOperationSign);
        let partOne = displayResult.innerHTML.slice(0, index);
        let partTwo = displayResult.innerHTML.slice(index + 1);
        displayResult.innerHTML = partOne + currentOperationSign + numberInMemory;
        isNumberAfterOperationAdded = true;
      } else if (isOperationAdded == false && numberInMemory != "0") {
        displayResult.innerHTML = numberInMemory;
      }
      break;

    case "MS":
      if (isNumberAfterOperationAdded) {
        numberInMemory = numberAfterOperation;
        addHistoryResult("M" , numberInMemory , 1);
      } else if (isOperationAdded == false) {
        numberInMemory = displayResult.innerHTML;
        addHistoryResult("M" , numberInMemory , 1);
      } else if (isNumberAfterOperationAdded == false && isOperationAdded == true) {
        numberInMemory = displayResult.innerHTML.slice(0, displayResult.innerHTML.length - 1);
        addHistoryResult("M" , numberInMemory , 1);
      }
      break;

  }
  console.log(numberInMemory);

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

  }
}
function mainOperatorCompute(operationSign, lastResult) {
  if (operationSign == "=") {
    if (isNumberAfterOperationAdded == true) {
      div_littleHistoy.innerHTML = lastResult;
      let result = eval(lastResult);
      result = parseFloat(result.toFixed(5));
      displayResult.innerHTML = result;
      isOperationAdded = false;
      isNumberAfterOperationAdded = false;
      numberAfterOperation = "";
      isResultBtnPushed = true;
      currentOperationSign = "";
      addHistoryResult(lastResult,result,0);
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
      result = parseFloat(result.toFixed(5));
      displayResult.innerHTML = result + operationSign;
      isOperationAdded = true;
      isNumberAfterOperationAdded = false;
      numberAfterOperation = "";

      addHistoryResult(lastResult,result,0);
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

function addHistoryResult(lastResult, result , i) {
  let historyItem = document.createElement("p");
  historyItem.innerHTML = lastResult + " = " + result;
  div_historyTabs[i].appendChild(historyItem);

  if( p_noHistoryP.style.display != "none" && div_historyTabs[0].children.length > 1){
    p_noHistoryP.style.display = "none";
  }
  
}

btn_deletHistoryBar.addEventListener("click",()=>{
  p_noHistoryP.style.display = "block";
  while (div_historyTabs[0].children.length > 1) {
    div_historyTabs[0].removeChild(div_historyTabs[0].lastChild);
  }
  while (div_historyTabs[1].children.length > 1) {
    div_historyTabs[1].removeChild(div_historyTabs[1].lastChild);
  }
})
// change theme
const themes = {
  1: "greenTheme",
  2: "blueTheme",
  3: "myTheme"
}

let themeCounter = 1;
function changeTheme() {
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