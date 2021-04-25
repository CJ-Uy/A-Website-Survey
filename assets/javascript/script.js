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



//DO THISSS maybe
var color_styling = {
  body: {},
  card: {}
};



var survey_cards = document.getElementsByClassName("survey_card");
//Color styling functions
function solid_bg() {
  document.body.style = "background-color: white";
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

  if (grad_angle != 0) {
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

function cards_bg() {
  var card_bg = document.getElementById("card_bg").value;
  var survey_cards = document.getElementsByClassName("survey_card");

  for (let i = 0; i < survey_cards.length; i++) {
    survey_cards[i].style.backgroundColor = card_bg;
  }
}

function color_text() {
  var text_color = document.getElementById("text_color").value;
  document.body.style.color = text_color;
}

function color_border() {
  var border_color = document.getElementById("border_color").value;
  for (var i = 0; i < survey_cards.length; i++) {
    survey_cards[i].style.borderColor = border_color;
  }
}

function change_border_width() {
  var border_width = document.getElementById("border_width").value;
  for (var i = 0; i < survey_cards.length; i++) {
    survey_cards[i].style.borderWidth = border_width + "px";
  }
}

function color_card_clear() {
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = "white";
  document.body.style.color = "black";
  for (let i = 0; i < survey_cards.length; i++) {
    survey_cards[i].style.backgroundColor = "white";
    survey_cards[i].style.borderColor = "black";
    survey_cards[i].style.borderWidth = "2px";
  }
  for (let i = 0; i < document.getElementsByClassName("solid_bg_color").length; i++) {
    document.getElementsByClassName("solid_bg_color")[i].style.display = "none";
  }
  for (let i = 0; i < document.getElementsByClassName("grad_bg").length; i++) {
    document.getElementsByClassName("grad_bg")[i].style.display = "none";
  }
}





var h1_elements = document.getElementsByTagName("h1");
var h2_elements = document.getElementsByTagName("h2");
var h3_elements = document.getElementsByTagName("h3");
var label_elements = document.getElementsByTagName("label");
var form_elemetns = document.getElementsByTagName("form");
var p_elements = document.getElementsByTagName("p");
//Fonts styling functions
function h1_change_fontfam() {
  var head_font_family = document.getElementById("h1_font_family").value;
  for (let i = 0; i < h1_elements.length; i++) {
    h1_elements[i].style.fontFamily = head_font_family;
  }
}

function size_head_font() {
  var head_font_size = document.getElementById("h1_font_size").value;
  for (let i = 0; i < h1_elements.length; i++) {
    h1_elements[i].style.fontSize = head_font_size + "px";
  }
}

function letter_space_head() {
  var head_letter_space = document.getElementById("h1_letter_spacing").value;
  for (let i = 0; i < h1_elements.length; i++) {
    h1_elements[i].style.letterSpacing = head_letter_space + "px";
  }
}

function size_subhead_font() {
  var subhead_font_size = document.getElementById("h2_font_size").value;
  for (let i = 0; i < h2_elements.length; i++) {
    h2_elements[i].style.fontSize = subhead_font_size + "px";
  }
}

function content_change_fontfam() {
  var content_font_family = document.getElementById("content_font_family").value;
  for (let i = 0; i < h3_elements.length; i++) {
    h3_elements[i].style.fontFamily = content_font_family;
  }
  for (let i = 0; i < label_elements.length; i++) {
    label_elements[i].style.fontFamily = content_font_family;
  }
  for (let i = 0; i < form_elements.length; i++) {
    form_elements[i].style.fontFamily = content_font_family;
  }
}

function size_content_font() {
  var content_font_size = document.getElementById("content_font_size").value;
  for (let i = 0; i < h3_elements.length; i++) {
    h3_elements[i].style.fontSize = content_font_size + "px";
  }
  for (let i = 0; i < label_elements.length; i++) {
    label_elements[i].style.fontSize = content_font_size + "px";
  }
  for (let i = 0; i < form_elements.length; i++) {
    form_elements[i].style.fontSize = content_font_size + "px";
  }
}

function fonts_card_reset() {
  for (let i = 0; i < h1_elements.length; i++) {
    h1_elements[i].style.fontFamily = "serif";
    h1_elements[i].style.fontSize = "3.5vw";
    h1_elements[i].style.letterSpacing = "0px";
  }

  for (let i = 0; i < h2_elements.length; i++) {
    h2_elements[i].style.fontFamily = "serif";
    h2_elements[i].style.fontSize = "2vw";
  }

  for (let i = 0; i < h3_elements.length; i++) {
    h3_elements[i].style.fontFamily = "serif";
    h3_elements[i].style.fontSize = "1vw";
  }

  for (let i = 0; i < label_elements.length; i++)
    label_elements[i].style.fontFamily = "serif";

  for (let i = 0; i < form_elements.length; i++)
    form_elements[i].style.fontFamily = "serif";
}