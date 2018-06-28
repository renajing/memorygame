'use strict';
//import createArtistsAndShuffle  from './class.js';

let cardsChosen = 0;
let numMatching = 0;
let indexChosenCards = [];
let arrayArtists;
let numMoves = 0;
let startingTime = 60;
let changeTimer;


//TODO: move to another module 
let arrayChoices = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];

const djkhaled = "url('./img/djkhaled.png')";
const kanyewest = "url('./img/kanyewest.jpg')";
const drake = "url('./img/drake.jpg')";
const liljon = "url('./img/liljon.jpg')";
const bigsean = "url('./img/bigsean.jpg')";
const lilwayne = "url('./img/lilwayne.jpg')";
const _50cent = "url('./img/50cent.jpg')";
const jayz = "url('./img/jayz.jpg')";

let picChoices = [djkhaled, liljon, bigsean, kanyewest, lilwayne, _50cent, drake, jayz];

const djkhaledSong = new Audio('./sounds/another_one.mp3');
const lilJonSong = new Audio('./sounds/what.wav');
const bigseanSong = new Audio('./sounds/bigsean.mp3');
const kanyeSong = new Audio('./sounds/kanye.wav');
const lilwayneSong = new Audio('./sounds/lilwayne.mp3');
const _50centSong = new Audio('./sounds/50cent.mp3');
const jayzSong = new Audio('./sounds/jayz.mp3');
const drakeSong = new Audio('./sounds/drake.mp3');

let songChoices = [djkhaledSong, lilJonSong, bigseanSong, kanyeSong, lilwayneSong, _50centSong, drakeSong, jayzSong];


$(document).ready(function(){
	//randomize hidden cards
	randomizeCards();

	$('.card').click(function() {
		let element = $(this);
    	swapCard(element);
    	if(cardsChosen === 2){
    		isMatching();
    	}
	});
});



function startGame(){
	document.getElementById("start").style.display = "none";
	changeTimer = window.setInterval(updateTime, 1000);
}

function updateTime(){
	startingTime = startingTime - 1;
	document.getElementById("timer").innerHTML = "Time left: " + startingTime;
	if(startingTime == 0){
		window.clearInterval(changeTimer);
		surfaceModal("loseModal");
	}
}


function surfaceModal(idName){
	document.getElementById(idName).style.display = "block";
	document.body.style.backgroundColor = "#C8C8C8";
}


function closeModal(idName){
	document.getElementById(idName).style.display = "none";
	document.body.style.backgroundColor = "white";
}


function swapCard(element){
	let index = $('.card').index(element);
	//let index = element.index;
	element.css('z-index', 0);
	cardsChosen += 1;
	indexChosenCards.push(index);
	//TODO: switch back to z-index 2 
}

/* determines if cards are matching, animates cards based on results and resets cardChosen*/
function isMatching(){
	numMoves += 1;
	document.getElementById("moves").innerHTML = "Moves: " + numMoves;
	let card1 = $( ".hiddenCard").get(indexChosenCards[0]);
	let card2 = $( ".hiddenCard").get(indexChosenCards[1]);

	let blankCard1 = $( ".card").get(indexChosenCards[0]);
	let blankCard2 = $( ".card").get(indexChosenCards[1]);
	sleep(500).then(() => {
    	if(card1.textContent === card2.textContent ){
			//todo: animate match and keep cards flipped over, disable buttons, update scoreBoard and check if win
			let index = card1.textContent;
			songChoices[index].play();  				
			card1.disabled = true;
			card2.disabled = true;
			numMatching += 2;
			if(numMatching === 16){
				surfaceModal("winModal");
			}
			cardsChosen = 0;
			indexChosenCards = [];
		}
		else{
			console.log(indexChosenCards[0]);
			//Todo: flip over cards to blank state 
			pulsate(card1,card2, blankCard1, blankCard2).then(() => { 
				console.log("pulsate");
				blankCard1.style.zIndex = 2;
				blankCard2.style.zIndex = 2;
				cardsChosen = 0;
				indexChosenCards = [];
			});

		}

	});
}


function pulsate(card1, card2, blankCard1, blankCard2){
	let promise = new Promise(function(resolve, reject) {
  // the function is executed automatically when the promise is constructed
  	card1.style.webkitAnimationName = 'pulse';
	card1.style.webkitAnimationDuration = '1s';
	card2.style.webkitAnimationName = 'pulse';
	card2.style.webkitAnimationDuration = '1s';

    blankCard1.style.webkitAnimationName = 'pulse';
	blankCard1.style.webkitAnimationDuration = '1s';
	blankCard2.style.webkitAnimationName = 'pulse';
	blankCard2.style.webkitAnimationDuration = '1s';
  // after 1 second signal that the job is done with the result "done!"
 		setTimeout(() => resolve("done!"), 1000);
	});
    return promise;
}





//for all the different numbers [1..8], place 2 of each in random locations in hiddenCard
function randomizeCards(){
	arrayArtists = createArtistsAndShuffle();
	$('.hiddenCard').each(function(i, obj) {
		let artist = arrayArtists.pop();
    	$(obj).text(artist.number);
    	$(obj).css('background-image', artist.pic);
	});

}


function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


function Artist(number, pic, song){
	this.number = number;
	this.pic = pic;
	this.song = song;
}

function createArtistsAndShuffle() {
	arrayArtists = new Array();
	for(let i = 0; i < 8; i++){
		let artist = new Artist(i, picChoices[i], songChoices[i]);
		let artistDuplicate = new Artist(i, picChoices[i], songChoices[i]);
		arrayArtists.push(artist, artistDuplicate);
	}
	return arrayArtists.shuffle();
}

Array.prototype.shuffle = function() {
    var input = this;
     
    for (var i = input.length-1; i >=0; i--) {
     
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = input[randomIndex]; 
         
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;
}     

