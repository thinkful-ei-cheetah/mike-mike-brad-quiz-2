'use strict';

/* global $, Quiz, QuizDisplay, QuizStatus, TriviaApi, Question */

// By putting these variables in global scope, you can experiment with them in
// the debug console.
let q, quizDisplay, quizStatus, trivia;     // eslint-disable-line no-unused-vars

//?amount=5&category=21&difficulty=easy&type=multiple
// 9 - 32

function main() {
  const randomCategory = Math.floor(Math.random() * 32) + 9;
  trivia = new TriviaApi();
  trivia.generate(5, randomCategory, 'easy', 'multiple')
    .then(response => response.json())
    .then(data => {
      console.log(data.results);
      const questions = data.results.map(result => new Question(result));
      q = new Quiz(questions);
      quizDisplay = new QuizDisplay(q, '.display');
      quizStatus = new QuizStatus(q, '.status');
    });
}

$(main);
