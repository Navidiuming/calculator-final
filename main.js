const displayResult = document.getElementById("displayResult");
const btn_buttouns = document.querySelectorAll(".padBtn");


btn_buttouns.forEach(item => {
    item.addEventListener('click', event => {
        console.log(item);
    })
  })