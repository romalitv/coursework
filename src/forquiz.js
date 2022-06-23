'use strict';

const quiz = [
  {
    question: 'ln(e) = ',
    options: [
      '3',
      '1',
      '25',
      '2'
    ],
    answer: 1,
  },

  {
    question: '4ln( e^(1/2) ) = ',
    options: [
      '2',
      '0',
      '2ln(e)',
      '-'
    ],
    answer: 0,
  },

  {
    question: 'Який з дробів є неправильним',
    options: [
      '1/3',
      '8/5',
      '16/4',
      '-'
    ],
    answer: 1,
  },

  {
    question: '2 + 2 =',
    options: [
      '4',
      '6',
      '14',
      '0'
    ],
    answer: 0,
  }
];

const questNum = document.querySelector('.question-number');
const questText = document.querySelector('.question-text');
const optionData = document.querySelector('.option-container');
const homeCont = document.querySelector('.home');
const quizCont = document.querySelector('.quiz');
const resCont = document.querySelector('.result');

const availQuests = [];
const availOpts = [];

let questCount = 0;
let corrAnsw = 0;
let attempt = 0;
let currQuest = 0;

const setAvaliableQuestions = () => {
  const totalQuestions = quiz.length;
  for (let i = 0; i < totalQuestions; i++) {
    availQuests.push(quiz[i]);
  }
};

const minus = (index, available, init) => {
  init = available.indexOf(index);
  available.splice(init, 1);
};

const getNewQuestion = () => {
  questNum.innerHTML = 'Питання ' + (questCount + 1) + ' з ' + quiz.length;

  const questIndx = availQuests[Math.floor(Math.random() * availQuests.length)];

  currQuest = questIndx;

  const numOfQstInd = 0;
  minus(questIndx, availQuests, numOfQstInd);

  questText.innerHTML = currQuest.question;
  optionData.innerHTML = '';

  const optionLen = currQuest.options.length;
  for (let i = 0; i < optionLen; i++) {
    availOpts.push(i);
  }

  for (let i = 0; i < optionLen; i++) {
    const optIndx = availOpts[Math.floor(Math.random() * availOpts.length)];

    const numOfOptInd = 0;
    minus(optIndx, availOpts, numOfOptInd);

    const option = document.createElement('div');
    option.innerHTML = currQuest.options[optIndx];
    option.id = optIndx;
    option.className = 'option';
    optionData.appendChild(option);
    option.setAttribute('onclick', 'getResult(this)');
  }
  questCount++;
};

// eslint-disable-next-line no-unused-vars
function getResult(element) {
  const id = parseInt(element.id);
  if (id === currQuest.answer) {
    element.classList.add('correct');
    corrAnsw++;

  } else {
    element.classList.add('wrong');
    const leng = optionData.children.length;
    for (let i = 0; i < leng; i++) {
      if (parseInt(optionData.children[i].id) === currQuest.answer) {
        optionData.children[i].classList.add('correct');
      }
    }
  }
  attempt++;
  unclickableOption();
}

function unclickableOption() {
  const optionLen = optionData.children.length;
  for (let i = 0; i < optionLen; i++) {
    optionData.children[i].classList.add('already-answered');
  }
}

const quizOver = () => {
  quizCont.classList.add('hide');
  resCont.classList.remove('hide');
  quizResult();
};

// eslint-disable-next-line no-unused-vars
function next() {
  if (questCount === quiz.length) {
    quizOver();
  } else {
    getNewQuestion();
  }
}

const resetQuiz = () => {
  questCount = 0;
  corrAnsw = 0;
  attempt = 0;

};

// eslint-disable-next-line no-unused-vars
const tryAgain = () => {
  resCont.classList.add('hide');
  quizCont.classList.remove('hide');
  resetQuiz();
  start();
};


function quizResult() {
  const percentage = (corrAnsw / quiz.length) * 100;
  resCont.querySelector('.total-questions').innerHTML = quiz.length;
  resCont.querySelector('.total-attempt').innerHTML = attempt;
  resCont.querySelector('.total-correct').innerHTML = corrAnsw;
  resCont.querySelector('.total-wrong').innerHTML = attempt - corrAnsw;
  resCont.querySelector('.percentage').innerHTML = Math.ceil(percentage) + '%';
  resCont.querySelector('.score').innerHTML = corrAnsw + '/' + quiz.length;
}

function start() {
  homeCont.classList.add('hide');
  quizCont.classList.remove('hide');
  setAvaliableQuestions();
  getNewQuestion();
}

window.onload = function() {
  homeCont.querySelector('.total-question').innerHTML = quiz.length;
};
