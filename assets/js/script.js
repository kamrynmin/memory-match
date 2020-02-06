$(document).ready(initializeApp);
var firstCardClicked = null;
var secondCardClicked = null;
var matches = 0;
var max_matches = 9;
var attempts = 0;
var games_played = 0;



function initializeApp() {
  displayStats();
  shuffleCards();
  $('.resetButton').on('click', resetStats);
  $('.card').on('click', handleCardClick);
}

function handleCardClick(event) {
  if ($(event.currentTarget).find('.back').hasClass('hidden')) {
    return;
  }

  $(event.currentTarget).find('.back').addClass('hidden');
  if (firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget);


  } else {
    secondCardClicked = $(event.currentTarget);
    var firstCardClickedBackground = firstCardClicked.find("div").css("background-image");
    var secondCardClickedBackground = secondCardClicked.find("div").css("background-image");
    lockCard();

    if (firstCardClickedBackground === secondCardClickedBackground) {
      firstCardClicked = null;
      secondCardClicked = null;
      matches++;
      attempts++;
      unlockCard();
      displayStats();



    } else {
      attempts++;
      setTimeout(function () {
        firstCardClicked.find('.back').removeClass("hidden");
        secondCardClicked.find('.back').removeClass("hidden");
        firstCardClicked = null;
        secondCardClicked = null;
        unlockCard();
        displayStats();
      }, 1000);
    }
  }
  if (matches === max_matches) {
    $('.modalContainer').removeClass('hidden');
  }

}


function calculateAccuracy() {
  if (matches === 0 && attempts === 0) {
    return 100 + "%";
  }
  return (Math.round((matches / attempts) * 100) + "%");

}

function displayStats() {
  var accuracy = calculateAccuracy();
  $('.attemptsCount').text(attempts);
  $('.accuracyScore').text(accuracy);
  $('.gamesPlayed').text(games_played);
}

function resetStats() {
  shuffleCards();
  var accuracy = calculateAccuracy();
  matches = 0;
  attempts = 0;
  games_played++;
  $('.attemptsCount').text(attempts);
  $('.accuracyScore').text(accuracy);
  $('.gamesPlayed').text(games_played);
  $('.modalContainer').addClass('hidden');
  $('.card').find('.back').removeClass('hidden');
  $('.card').on('click', handleCardClick);

}

function shuffleCards() {
  $('.card').remove();
  var frontOfCards = ['gene1', 'tina', 'louise1', 'linda', 'teddy', 'bob', 'mort', 'gene2', 'louise2', 'gene1', 'tina', 'louise1', 'linda', 'teddy', 'bob', 'mort', 'gene2', 'louise2'];


  while (frontOfCards.length > 0) {
    var addCard = $('<div>').addClass('card');
    var addFront = $('<div>').addClass('front');
    var addBack = $('<div>').addClass('back');

    var shuffleImages = Math.floor(Math.random() * frontOfCards.length);
    var takeOutCard = frontOfCards.splice(shuffleImages, 1);

    var putCard = addFront.addClass(takeOutCard);
    $('.game-area').append((addCard).append(addFront, addBack));

  }

}

function lockCard() {
  $('.card').off('click', handleCardClick);
}

function unlockCard() {
  $('.card').on('click', handleCardClick);
}
