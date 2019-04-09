'use strict';

/* global Model */

/**
 * You can replace this Quiz with the version you worked on yesterday. It's just
 * provided as an example.
 */

class Quiz extends Model {          // eslint-disable-line no-unused-vars
  

  // This class property could be used to determine the no. of quiz questions
  // In later implementations, the user could provide a quiz length and override
  static DEFAULT_QUIZ_LENGTH = 5;

  constructor(questions) {
    super();

    this.unasked = [...questions];
    this.asked = [];
    this.score = 0;
    this.scoreHistory = [];
    this.active = false;
    this.totalQuestions = questions.length;

  }

  startNewGame() {
    this.active = true;
  }

  nextQuestion() {
    if (!this.unasked.length) {
      console.log('error: no more question');
      return;
    }
    
    const question = this.unasked.pop();
    this.asked.push(question);
    return question;
  }

  submitAnswer(answer) {
    const question = this.asked[this.asked.length - 1];
    question.userAnswer = answer;

    if (answer === question.correctAnswer) {
      this.score++
    }
  }

  progress() {
    return `
      ${this.asked.length} of ${this.totalQuestions}
    `;
  }

  isCompleted() {
    return this.totalQuestions === this.asked.length;
  }

}
