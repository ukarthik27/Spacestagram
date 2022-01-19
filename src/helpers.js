export const debounce = (func, delay = 0) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};
/*
Credit to : https://codepen.io/alex-hartan/pen/WNNaRxQ
 */
export function Stars(numberOfStars, divID) {
  var chosenDiv = document.getElementById(divID);
  chosenDiv.style.display = "none";
  chosenDiv.innerHTML = "";
  function randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  var text = "";
  var i;
  for (i = 0; i < numberOfStars; i++) {
    var bigRange = Array.apply(null, Array(100)).map(function (_, i) {
      return i;
    });
    var smallRange = Array.apply(null, Array(3)).map(function (_, i) {
      return i;
    });
    var tenRange = Array.apply(null, Array(5)).map(function (_, i) {
      return i;
    });
    var starTwinkleStage = randomFrom("9", "13");
    var top = randomFrom(bigRange);
    var right = randomFrom(bigRange);
    var width = randomFrom(smallRange);
    text += "<style></style>";
    text +=
      "<div class='stars' style='top:" +
      top +
      "%; right: " +
      right +
      "%; width:" +
      width +
      "px; height:" +
      width +
      "px;";
    text += "animation: twinkling " + starTwinkleStage + "s infinite";
    text += ";box-shadow: 0px 0px 1vw rgba(255, 255, 255, 0.2);'></div>";
    chosenDiv.innerHTML = text;
    chosenDiv.style.display = "block";
  }
}
