function text() {
  var text = document.getElementById("press");
  var style = {
    color : "red",
  };

  style["background-color"] = "blue";
  

  Object.assign(text.style, style);
}