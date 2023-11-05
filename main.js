const displayResult = document.getElementById("displayResult");
const btn_buttouns = document.querySelectorAll(".padBtn");

btn_buttouns.forEach(item => {
    item.addEventListener('click', event => {
      clickOnNumbers(item);

        
    })
  })


  function clickOnNumbers(el){
    if(el.classList.contains("digitBtn")){
        let numberInDisplayBeforeClick;
        let enterdNumber;

        numberInDisplayBeforeClick = displayResult.innerHTML;
        enterdNumber = el.innerHTML;
        enterdNumber = checkIsNumberDecimal(numberInDisplayBeforeClick) && enterdNumber == "." ? "" :enterdNumber;
        numberInDisplayBeforeClick = enterdNumber!="." && numberInDisplayBeforeClick=="0" ? "" : numberInDisplayBeforeClick;

        displayResult.innerHTML = numberInDisplayBeforeClick+enterdNumber;

    }
  }

  function checkIsNumberDecimal(num){
    return num.includes(".");
  }