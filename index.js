// Click Start button from main page to start the quiz and go to questions page 
// Make sure question count starts at 1 to 10 and 0 correct to 0 incorrect 
// Make sure when the user clicks an answer they are not able to click multiple 
// when submit answer is clicked if wrong show correct answer and change correct and incorrect answer click next question to move on to next question
// can't click submit without choosing an answer
// can't click on next without choosing an answer
// don't show same question twice 
// when at the end of quiz be able to route back to the main page 
// clear out data and start over quiz 

const quizQuestions = [
    {
      question:"Beyoncé started out in what all girl group?",
        ans1:"Xscape",
        ans2:"TLC",
        ans3:"702",
        ans4:"Girls Tyme",
      correctAnswer:"Girls Tyme",
    },
    {
      question: "Beyoncé middle name is?",
        ans1: "Michelle",
        ans2: "Marie",
        ans3: "Giselle",
        ans4: "Beyoncé",
      correctAnswer: "Giselle",
    },
    {
      question: "In 1997 the group by the name of what signed to Columbia records?",
        ans1: "FizzBuzz",
        ans2: "Destiny's Child",
        ans3: "EnVogue",
        ans4: "Spicegirls",
      correctAnswer: "Destiny's Child",
    },
    {
      question: "Beyoncé first solo album was named?",
        ans1: "Dangerously in Love",
        ans2: "Single Ladies",
        ans3: "Start",
        ans4: "Beyoncé",
      correctAnswer: "Dangerously in Love",
    },
    {
      question: "Beyoncé has called her stage persona by this name?",
        ans1: "Star",
        ans2: "Queen",
        ans3: "Shakira",
        ans4: "Sasha",
      correctAnswer: "Sasha",
    },
    {
      question: "What word is now in the dictionary due to a popular Beyoncé song?",
        ans1: "Jellilicious",
        ans2: "Bootylicious",
        ans3: "Cravalicious",
        ans4: "Shakalicious",
      correctAnswer: "Bootylicious",
    },
    {
      question: "Beyoncé married what famous rapper in 2008?",
        ans1: "Nas",
        ans2: "Snoop Dog",
        ans3: "Jay-Z",
        ans4: "Drake",
      correctAnswer: "Jay-Z",
    },
    {
      question: "In 2012 Beyoncé gave birth to a baby girl whose name is synonymous with what color?",
        ans1: "Blue Ivy", 
        ans2: "Yellow Ivy",
        ans3: "Red Ivy",
        ans4: "Pink Ivy",
      correctAnswer: "Blue Ivy",
    },
    {
      question: "Beyoncé has a singer sister whose name is?",
        ans1: "Kelly",
        ans2: "Neana",
        ans3: "Solangé",
        ans4: "Ellen",
      correctAnswer: "Solangé",
    },
    {
      question: "In 2017 Beyoncé just gave birth to twins and named them what?",
        ans1: "North & West",
        ans2: "Paris & London",
        ans3: "Houston & New York",
        ans4: "Rumi & Sir",
    correctAnswer: "Rumi & Sir",
    }
];

let activeQuestionIndexNum = 0;
let totalCorrect = 0;
let totalIncorrect = 0; 

function renderQuestion() { 
$('.js-questions').html(`
    <h2>Question: ${activeQuestionIndexNum + 1} of 10</h2>
    <form>
    <fieldset class="question">
      <legend> ${quizQuestions[activeQuestionIndexNum].question}
      </legend>
      <input required class="button" type="radio" id="answer-1" name="answers" value="${quizQuestions[activeQuestionIndexNum].ans1}">
        <label class="label" for="answer-1">${quizQuestions[activeQuestionIndexNum].ans1}</label>
        <br>
      <input class="button" type="radio" id="answer-2" name="answers" value="${quizQuestions[activeQuestionIndexNum].ans2}">
        <label class="label" for="answer-2">${quizQuestions[activeQuestionIndexNum].ans2}</label>
        <br>
      <input class="button" type="radio" id="answer-3" name="answers" value="${quizQuestions[activeQuestionIndexNum].ans3}">
        <label class="label" for="answer-3">${quizQuestions[activeQuestionIndexNum].ans3}</label>
        <br>
      <input class="button" type="radio" id="answer-4" name="answers" value="${quizQuestions[activeQuestionIndexNum].ans4}">
        <label class="label" for="answer-4">${quizQuestions[activeQuestionIndexNum].ans4}</label>
        <br>
    </fieldset>
    </form>
    <button class="js-submitButton submitButton button" type="submit" name="submitAnswer" value= "submit">Submit Answer</button>
    <button class="js-nextButton submitButton button hidden" type="click" name="submitAnswer" value="next" >Next Question</button>
`);
}

function renderScore() {
  $('.js-score').find("h2").text(`Score: ${totalCorrect} correct, ${totalIncorrect} incorrect`);
}

function renderQuizOnStartClick () {
  $('.js-startButton').on('click', function(event) {
    renderQuestion();
    renderScore();
    $('.js-startPage').addClass('hidden');
    $('.js-score').removeClass('hidden');
  });
}

  $('.js-questions').on('click', 'input.button', function(event) {
    $('label').removeClass('active');
    $(this).next('label').addClass('active');
  });
  
  function answerChecker () {
  var checkReturn = $('input[name="answers"]:checked').val();
  var correctIndexAnswer = quizQuestions[activeQuestionIndexNum].correctAnswer;
  if (checkReturn === correctIndexAnswer) {
      $('.js-feedbackText').text('You betta Slayyyy, Yasss!');
      totalCorrect ++;
      renderScore();
      
    } else {
      $('.js-feedbackText').text(`To tha Left, To tha Left! Correct answer is '${correctIndexAnswer}'`);
      totalIncorrect ++;
      renderScore();
    }
    
    activeQuestionIndexNum ++;
}

function lastQuestionCheck () {
  let buttonText = $('.js-feedback').find("button").text();
   if (activeQuestionIndexNum === 10) {
      $('.js-nextButton').text('Shall We?');
      }
}

// Submit Answer Button Function

function handleSubmitAnswer () {
  $('.js-questions').on('submit', function(event) {
    event.preventDefault();
    answerChecker();
    lastQuestionCheck();
    $('.js-feedback').removeClass('hidden');
    $('.js-submitButton').addClass('hidden');
    $('.js-nextButton').removeClass('hidden');
    $("input[type=radio]").attr('disabled', true);
    });
  }
  
  function handleNextQuestionClick () {
  $('.js-questions').on('click', '.js-nextButton', function(event) {
    event.preventDefault();
    if (activeQuestionIndexNum < 10) {
    renderQuestion();
    $('.js-feedback').addClass('hidden');
    $('.js-submitButton').removeClass('hidden');
    $('js-nextButton').addClass('hidden');
    } else {
      $('.js-resultsPage').find("h2").text(`You scored ${totalCorrect} out of 10`);
      $('.js-resultsPage').removeClass('hidden');
      $('.js-feedback').addClass('hidden');
      $('.js-score').addClass('hidden');
      $('.js-questionPage').addClass('hidden');
    }
  });
}

// Restart Quiz Button Function

function restartQuiz () {
  $('.js-reStartButton').on('click', function(event) {
    activeQuestionIndexNum = 0;
    totalCorrect = 0;
    totalIncorrect = 0;
    $('.js-resultsPage').addClass('hidden');
    renderQuestion();
    renderScore();
    $('.js-questionPage').removeClass('hidden');
    $('.js-score').removeClass('hidden');
  });
}



function handleApp () {
  renderQuizOnStartClick ();
  handleSubmitAnswer ();
  handleNextQuestionClick ();
  restartQuiz();
}

$(handleApp);
















