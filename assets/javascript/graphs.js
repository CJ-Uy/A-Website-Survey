//Card changeing
var card_index = 1;

function change_card(n) {
  card_index += n;
  show_card(card_index);
}

function show_card(n) {
  var cards = document.getElementsByClassName("graphs_section");

  if (n > cards.length) {
    card_index = 3;
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



/*
var trial_data = [1,2,3,4,5];
localStorage.setItem("trial_data", JSON.stringify(trial_data));

var trial_data = JSON.parse(localStorage.getItem("trial_data"));
alert(trial_data[0]);

Local storage variables:

<color card>
bg_solid
bg_solid_color [10]

bg_grad 
bg_grad_angle [4]
bg_grad_color1 [10]
bg_grad_color2 [10]

card_bg_color [10]
text_color [10]
border_color [10]

border_width


<font card>
heading_fontfamily [8]
content_fontfamily [8]

main_heading_fontsize
sub_heading_fontsize

heading_letterspacing


<Satisfaction>
satisfaction [5]
*/

//Color card
var bg_solid = JSON.parse(localStorage.getItem("bg_solid"));
var bg_solid_color = JSON.parse(localStorage.getItem("bg_solid_color"));

var bg_grad = JSON.parse(localStorage.getItem("bg_grad"));
var bg_grad_angle = JSON.parse(localStorage.getItem("bg_grad_angle"));
var bg_grad_color1 = JSON.parse(localStorage.getItem("bg_grad_color1"));
var bg_grad_color2 = JSON.parse(localStorage.getItem("bg_grad_color2"));

var card_bg_color = JSON.parse(localStorage.getItem("card_bg_color"));
var text_color = JSON.parse(localStorage.getItem("text_color"));
var border_color = JSON.parse(localStorage.getItem("border_color"));

var border_width = JSON.parse(localStorage.getItem("border_width"));

//Font card
var heading_fontfamily = JSON.parse(localStorage.getItem("heading_fontfamily")); 
var content_fontfamily = JSON.parse(localStorage.getItem("content_fontfamily")); 

var main_heading_fontsize = JSON.parse(localStorage.getItem("main_heading_fontsize"));
var sub_heading_fontsize = JSON.parse(localStorage.getItem("sub_heading_fontsize"));

var heading_letterspacing = JSON.parse(localStorage.getItem("heading_letterspacing"));

//Satisfaction
var satisfaction = JSON.parse(localStorage.getItem("satisfaction"));

function get_2d_context(n) {
  return n.getContext("2d");
}

var ctx = get_2d_context(document.getElementById("bg_color"));

var chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Solid Background', 'Gradient Background'],
    datasets: [{
      label: "# of times picked",
      data: [bg_solid, bg_grad],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
      barPercentage: 0.3,
      categoryPercentage: 1.0,
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Solid and Gradient Backgrounds",
        padding: {
          top: 12,
          bottom: 10
        },
        font: {
          size: 25,
        },
      }
    },
  },


});