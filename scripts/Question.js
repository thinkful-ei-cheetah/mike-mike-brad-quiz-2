'use strict';

const Question = (function() {
  class Question {
    constructor(result) {
      this.text = result.question;
      this.correctAnswer = result.correct_answer;
      this.answers = this.buildAnswers(result.incorrect_answers, result.correct_answer);
      this.userAnswer = null;
    }
  
    buildAnswers(incorrectAnswers, correctAnswer) {
      let arr = [...incorrectAnswers];
      arr.push(correctAnswer);
      return this.shuffle(arr);
    }
  
    shuffle(array) {
      let currentIndex = array.length;
      let temporaryValue, randomIndex;
  
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
  
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
  }

  return Question;
}());