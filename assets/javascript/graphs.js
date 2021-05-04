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




var temp_arr =  JSON.parse(localStorage.getItem("bg_grad_angle"));
alert(temp_arr);








var c = document.getElementById("trial");
var ctx = c.getContext("2d");

var chart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

});