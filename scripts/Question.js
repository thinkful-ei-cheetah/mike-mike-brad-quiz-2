'use strict';

const Question = (function() {
  class Question {
    constructor(question, incorrectAnswers, correctAnswer) {
      this.text = question;
      this.correctAnswer = correctAnswer;
      this.answers = this.buildAnswers(incorrectAnswers, correctAnswer);
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