'use strict';

/* global Model, trivia, Question */

class Quiz extends Model {          // eslint-disable-line no-unused-vars
  
  constructor(questions) {
    super();

    this.unasked = [...questions];
    this.asked = [];
    this.score = 0;
    this.scoreHistory = [];
    this.active = false;
    this.totalQuestions = questions.length;

  }

  playAgain() {
    return trivia.generate()
      .then(response => response.json())
      .then(data => {
        const questions = data.results.map(result => new Question(result));
        this.unasked = [...questions];
        this.asked = [];
        this.score = 0;
        this.active = false;
        this.totalQuestions = questions.length;
        return Promise.resolve(this);
      });
  }

  startNewGame() {
    this.active = true;
  }

  nextQuestion() {
    const question = this.unasked.pop();
    this.asked.push(question);
    return question;
  }

  submitAnswer(answer) {
    const question = this.asked[this.asked.length - 1];
    question.userAnswer = answer;

    if (answer === question.correctAnswer) {
      this.score++;
    }

    if (this.isCompleted()) {
      this.scoreHistory.push(this.score);
    }
  }

  progress() {
    return `
      ${this.active ? `${this.asked.length} of ${this.totalQuestions} Questions` : 'Inactive'}
    `;
  }

  isCompleted() {
    return this.totalQuestions === this.asked.length;
  }

  highScore() {
    if (!this.scoreHistory.length) {
      return 0;
    }
    return Math.max(...this.scoreHistory);
  }

  isHighScore() {
    return this.score >= this.highScore();
  }

}
