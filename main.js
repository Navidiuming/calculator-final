const displayResult = document.getElementById("displayResult");
const btn_buttouns = document.querySelectorAll(".padBtn");
const btn_themeChanger = document.getElementById("btn_themeChanger");
const div_mainContainer = document.querySelector(".mainContainer")

for (let i = 0; i < btn_buttouns.length; i++) {
  btn_buttouns[i].addEventListener("click", clickOnBtnPad);
}

function clickOnBtnPad() {
  console.log(this.classList.contains("digitBtn"));
  if (this.classList.contains("digitBtn")) {
    let clickedBtn = this.innerHTML;
    let displayResultBeforeClick = displayResult.innerHTML;
    displayResultBeforeClick = displayResult.innerHTML == "0" && this.innerHTML != "." ? "" : displayResult.innerHTML;
    clickedBtn = displayResult.innerHTML.includes(".") && this.innerHTML == "." ? "" : this.innerHTML;
    displayResult.innerHTML = displayResultBeforeClick + clickedBtn;
  }

  if (this.classList.contains("mathBtn")) {

    // console.log(this.getAttribute("id"));

    let displayResultBeforeClick = displayResult.innerHTML;
    switch (this.getAttribute("id")) {
      case "divideRemaining":
        console.log("%");
        break;
      case "clear":
        console.log("clear");
        break;
      case "delet":
        console.log("delet");
        break;
      case "divide":
        console.log("/");
        break;
      case "root":
        console.log("root");
        break;
      case "multiply":
        console.log("*");
        break;
      case "power":
        console.log("power");
        break;
      case "minus":
        console.log("-");
        break;
      case "power3":
        console.log("3");
        break;
      case "plus":
        console.log("+");
        break;
      case "reverse":
        console.log("1/x");
        break;
      case "mark":
        console.log("-/+");
        break;
      case "equal":
        console.log("=");
        break;
      default:
        console.log("not found");
        break;
    }

  }
}

// change theme
const themes = {
  1 : "greenTheme",
  2 : "blueTheme",
  3 : "myTheme"
}

let themeCounter = 1;
function changeTheme(){
  console.log(themeCounter);
  console.log(themes[themeCounter]);
  themeCounter++;
  if(themeCounter > 4 ){
    themeCounter = 1;
  }
  switch(themeCounter){
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
btn_themeChanger.addEventListener('click' , changeTheme);