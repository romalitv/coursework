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

const availQuests = [];
const availOpts = [];

let questCount = 0;
let currQuest = 0;


const setAvaliableQuestions = () => {
  const totalQuestions = quiz.length;
  for (let i = 0; i < totalQuestions; i++) {
    availQuests.push(quiz[i]);
  }
};

const getNewQuestion = () => {
  questNum.innerHTML = 'Питання ' + (questCount + 1) + ' з ' + quiz.length;

  const questIndx = availQuests[Math.floor(Math.random() * availQuests.length)];

  const numOfQstInd = availQuests.indexOf(questIndx);
  availQuests.splice(numOfQstInd, 1);

  currQuest = questIndx;

  questText.innerHTML = currQuest.question;
  optionData.innerHTML = '';

  const optionLen = currQuest.options.length;
  for (let i = 0; i < optionLen; i++) {
    availOpts.push(i);
  }
  questCount++;
};

window.onload = function() {
  setAvaliableQuestions();
  getNewQuestion();
};
