//Card changeing
var card_index = 1;

function change_card(n) {
  show_card(card_index += n);
}

function current_card(n) {
  show_card(card_index = n);
}

function show_card(n) {
  var cards = document.getElementsByClassName("survey_card");

  if (n > cards.length) {
    alert("Insert Graphs");
  }
  if (n < 1) {
    card_index = 1;
  }

  for (var i = 0; i < cards.length; i++) {
    cards[i].style.display = "none";
  }
  cards[card_index - 1].style.display = "block";
}



show_card(card_index);


//Color card
function change_bg_solid() {
  document.body.style.backgroundColor = "white";
  for (let i = 0; i < document.getElementsByClassName("grad_bg").length; i++) {
    document.getElementsByClassName("grad_bg")[i].style.display = "none";
  }
  for (let i = 0; i < document.getElementsByClassName("solid_bg_color").length; i++) {
    document.getElementsByClassName("solid_bg_color")[i].style.display = "inline-block";
  }
  //color background
  var solid_bg = document.getElementById("solid_color").value;
  document.body.style.backgroundColor = solid_bg;
}

function grad_bg() {
  document.body.style.backgroundColor = "white";
  for (let i = 0; i < document.getElementsByClassName("grad_bg").length; i++) {
    document.getElementsByClassName("grad_bg")[i].style.display = "inline-block";
  }
  for (let i = 0; i < document.getElementsByClassName("solid_bg_color").length; i++) {
    document.getElementsByClassName("solid_bg_color")[i].style.display = "none";
  }
  //color background
  var grad_angle = parseInt(document.getElementById("grad_angle").value);
  var grad_bg = [grad_angle, document.getElementById("grad_color1").value, document.getElementById("grad_color2").value];

  if (grad_angle != 0){
    document.getElementById("grad_color1").disabled = false;
    document.getElementById("grad_color2").disabled = false;
  }

  switch (grad_angle) {
    case 0: 
      document.body.style = "background-color: white";
      document.getElementById("grad_color1").disabled = true;
      document.getElementById("grad_color2").disabled = true;
      break;
    case 1:
      document.body.style = "background-image: linear-gradient(180deg," + grad_bg[1] + "," + grad_bg[2] + ");";
      break;
    case 2:
      document.body.style = "background-image: linear-gradient(90deg," + grad_bg[1] + "," + grad_bg[2] + ");";
      break;
    case 3:
      document.body.style = "background-image: linear-gradient(45deg," + grad_bg[1] + "," + grad_bg[2] + ");";
      break;
    case 4:
      document.body.style = "background-image: linear-gradient(135deg," + grad_bg[1] + "," + grad_bg[2] + ");";
      break;
  }
}

//reference for local storage

function text() {
  var text = document.getElementById("press");
  var style = {
    color: "red",
  };

  style["background-color"] = "blue";


  Object.assign(text.style, style);
}