let button = document.querySelector("#changeButton");
button.addEventListener("click", () => {
  // get randomColor
  let randomColor = getRandomColor();

  // update color text and background
  document.querySelector("#colorText").innerHTML = randomColor;
  document.querySelector("body").style.backgroundColor = randomColor;
});

function getRandomColor() {
  const MAX_VAL = 255;
  let r = Math.floor(Math.random() * MAX_VAL);
  let b = Math.floor(Math.random() * MAX_VAL);
  let g = Math.floor(Math.random() * MAX_VAL);
  return `rgb(${r},${g},${b})`;
}
