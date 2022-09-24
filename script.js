const startBtn = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const nextBtn = document.getElementById('next-btn');
const questionTextElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');

let shuffledQuestions;
let currentQuestionIndex;


startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})

function startGame() {
    startBtn.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    setNextQuestion();
}


function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question){
    questionTextElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct);
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
        button.disabled = true;
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide')
    } else {
        startBtn.innerText = 'Restart'
        startBtn.classList.remove('hide')
    } 
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    }else{
        element.classList.add('false')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('false');
}


function resetState(){
    clearStatusClass(document.body);
    nextBtn.classList.add('hide');
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

let questions = [
    {
        question: 'What is 2 * 4?',
        answers: [
            {text: '4', correct: false},
            {text: '8', correct: true},
            {text: '46', correct: false},
            {text: '6', correct: false}
        ]
    },
    {
        question: 'What is 2 * 2?',
        answers: [
            {text: '4', correct: true},
            {text: '8', correct: false},
            {text: '46', correct: false},
            {text: '6', correct: false}
        ]
    },
    {
        question: 'Is web development fun?',
        answers: [
          { text: 'Kinda', correct: false },
          { text: 'YES!!!', correct: true },
          { text: 'Um no', correct: false },
          { text: 'IDK', correct: false }
        ]
      },
      {
        question: 'Who is the best YouTuber?',
        answers: [
          { text: 'Web Dev Simplified', correct: true },
          { text: 'Traversy Media', correct: false },
          { text: 'Dev Ed', correct: false },
          { text: 'Fun Fun Function', correct: false }
        ]
      }
]
