var card_index = 1;

function change_card(n) {
  show_card(card_index += n);  
}
function current_card(n) {
  show_card(card_index = n);
}

function show_card(n) {
  var cards = document.getElementsByClassName("survey_card");

  if (n >  cards.length){
    alert("Insert Graphs");
  }
  if (n < 1){
    card_index = 1;
  }

  for (var i = 0; i < cards.length; i++){
    cards[i].style.display = "none";
  }
  cards[card_index - 1].style.display = "block";
}



show_card(card_index);






function text() {
  var text = document.getElementById("press");
  var style = {
    color : "red",
  };

  style["background-color"] = "blue";
  

  Object.assign(text.style, style);
}