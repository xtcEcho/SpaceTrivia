'use strict';

//store the question sets and choices and answers
const STORE = [
  {question: "What has a gravitational pull so strong that even light cannot escape it?", choices:["Jupiter", "Sun", "Blackhole", "Pulsar"], answer: "Blackhole"},
  {question: "How many planets are in the Solar System?", choices:["9", "7", "11", "8"], answer: "8"},
  {question: "What is the largest type of star in the universe?", choices:["Red supergiant star", "Red dwarf", "White dwarf", "Neutron star"], answer: "Red supergiant star"},{question: "What percent of the universe is dark matter? (Plus or minus 2%.)", choices:["13%", "27%", "45%", "81%"], answer: "27%"},
  {question: "What is the largest planet in our solar system?", choices:["Pluto", "Jupiter", "Saturn", "Uranus"], answer: "Jupiter"},{question: "What is the most common type of star found in the Milky Way?", choices:["Yellow dwarf", "Red giant", "Red dwarf", "Double star"], answer: "Red dwarf"},{question: "How many moons are in our Solar System?", choices:["181", "94", "32", "1"], answer: "181"},
  {question: "How many moons does Jupiter have?", choices:["2", "14", "39", "67"], answer: "67"},
  {question: "What is the longest continuous time a human has spent in space? (Plus or minus 20 days.)", choices:["129 days", "675 days", "378 days", "437 days"], answer: "437 days"},
  {question: "Which NASA space flight was the last manned mission to the moon?", choices:["Voyager 1", "Apollo 11", "Apollo 17", "Kepler Mission"], answer: "Apollo 17"}
];

//Counter is used for tracking how many questions the user has gone thru and the results of each question
let questionCounter;
let rightCounter;
let wrongCounter;

//add question in form
function addQuestion(){
  //add question
  $('#js-question-form').html(`<div class="label"><label class = "questions center-text">${STORE[questionCounter].question}</label></div>`);
  //add choices
  for (let i = 0; i < 4; i++){
    $('#js-question-form').append( `<div class='center-text'><button class='answer' id='js-choice${i}' disabled><span class='answer_button'>${STORE[questionCounter].choices[i]}</span></button></div>`);
  }
  $('.answer').attr('disabled', false);
}
//add questionCount to the page
function addQuestionCount(){
 
  //add counting and scoring information in question count
  $('#js-questionCount').html(`<h3 class = "center-text">${questionCounter+1}/10</h2>    <h3 class = "center-text">${rightCounter} correct, ${wrongCounter} incorrect</h3>`);
  
  console.log('`addQuestionCount` ran');
 
}

//start the quiz by pressing launch
function handleLaunch(){
  //add questionCount to the page
  $('.js-container').on('click','.js-launch',function(event){
    questionCounter = 0;
    rightCounter = 0;
    wrongCounter = 0;
    //switch off hidden mode for question count
    $('#js-questionCount').toggleClass('count_hidden');
    addQuestionCount();
    addQuestion();
  });
  
  
  console.log('`handleLaunch` ran');
}

//make a right answer page
function handleRightAnswer(){
  $('#js-questionCount').html('<h2 class = "center-text">CORRECT!</h2>');
  rightCounter++;
  console.log('seleted right answer');
}

//make a wrong answer page
function handleWrongAnswer(){
  $('#js-questionCount').html('<h2 class = "center-text">INCORRECT!</h2>');
  wrongCounter++;
  console.log('seleted wrong answer');
}

//add answer styling class by taking in the real answer as argument and compare
function addAnswerStyling(tempAnswer){
  //add right/wrong answer class to choices for styling
  for (let i = 0; i<4; i++){
    let tempChoice = $(`#js-choice${i}`).find('span').html();
    //console.log(tempChoice);
    if (tempChoice === tempAnswer){
      $(`#js-choice${i}`).addClass('right-answer');
        //console.log('worked');
     } else {
      $(`#js-choice${i}`).addClass('wrong-answer');
    }
  }
      
}

//make a function to add in a next button
function addNext(){
  $('.js-container').append('<div class="center-text js-next-remove"><button class="next"><span class="next_button">NEXT</span></button>');
}

//make a function to add in a my score button
function addMyScore(){
  $('.js-container').append('<div class="center-text js-my-score-remove"><button class="my-score"><span class="my-score_button">MY SCORE</span></button>');
}

//select answer from the multiple choices
function handleMakeChoice(){
  $('#js-question-form').on('click', 'button', function(event){
    event.preventDefault();
    
    //let choice be the string of selected answer
    let choice = $(this).find('span').html();
    let answer = STORE[questionCounter].answer;
    //console.log(choice);
    //console.log(STORE[questionCounter].answer);
    
    //and compare it w right answer
    if (choice === answer){
      handleRightAnswer();
    }else {
      handleWrongAnswer();
       //add a class for selected wrong answer so that it can implemented w special style later
      $(this).addClass('selected-wrong-answer');
    }
    
    addAnswerStyling(answer);
    
    //after make choice for the first 9 questions, add next button, after make the 10th selection, add MY SCORE button
    if (questionCounter < 9){
      addNext();

      //console.log(('#js-question-form').html());
      questionCounter++;
    } else {
      addMyScore();
      questionCounter = null;
    }
    $('.answer').attr('disabled', true);
  });
  console.log('`handleMakeChoice` ran');
}

//a function to remove next button
function removeNext(){
  $('.js-next-remove').remove();
}

//show result and navigate to the next question
//if it's the last question next should be replaced by result
//click result, user should be directed to the result page
function handleNext(){
  $('.js-container').on('click', '.next', function(event){
    addQuestionCount();
    addQuestion();
    removeNext();
  });
  
}

//click my score button and navigate to the result page
function handleMyScore(){
  $('.js-container').on('click', '.my-score', function(event){
    $('#js-questionCount').empty();
    $('#js-questionCount').toggleClass('count_hidden');
    $('.js-my-score-remove').remove();
    $('#js-question-form').before(`<h2 class="center-text">Your Score:</h2><h2 class="center-text">${rightCounter}/10</h2>`)
    
    $('#js-question-form').html('<div class="center-text"><button class="relaunch js-relaunch"><span class="relaunch_button">RELAUNCH</span></button></div>');
    console.log($('.js-container').html());
  });
}

//click relaunch and restart from opening page
function handleRelaunch(){
  $('.js-container').on('click', '.relaunch', function(event){
    //console.log($('.js-container').html());
    $('h2').remove();
    questionCounter = 0;
    rightCounter = 0;
    wrongCounter = 0;
    //switch off hidden mode for question count
    $('#js-questionCount').toggleClass('count_hidden');
    addQuestionCount();
    addQuestion();
    console.log($('.js-container').html());
    console.log(questionCounter);
    console.log(rightCounter);
    console.log(wrongCounter);
  });
  console.log('`handleRelaunch` ran');
}

function playQuiz(){
  handleLaunch();
  handleMakeChoice();
  handleNext();
  handleMyScore();
  handleRelaunch();
  console.log('`playQuiz` ran');
}

$(playQuiz());