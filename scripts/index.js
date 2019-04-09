'use strict';

/* global $, Quiz, QuizDisplay, QuizStatus, TriviaApi */

// By putting these variables in global scope, you can experiment with them in
// the debug console.
let q, quizDisplay, quizStatus;     // eslint-disable-line no-unused-vars

//?amount=5&category=21&difficulty=easy&type=multiple

function main() {
  const trivia = new TriviaApi(5, 21, 'easy', 'multiple');
  trivia.generate()
    .then(response => response.json())
    .then(data => {
      q = new Quiz(data.results);
      quizDisplay = new QuizDisplay(q, '.display');
      quizStatus = new QuizStatus(q, '.status');
    });
}

$(main);
