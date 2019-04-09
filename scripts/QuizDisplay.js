'use strict';

/* global Renderer */

class QuizDisplay extends Renderer {    // eslint-disable-line no-unused-vars
  getEvents() {
    return {
      'click .start': 'handleStart',
      'submit #js-answer-form': 'submitAnswerForm',
      'click .play-again': 'handlePlayAgain',
      'click .continue': 'callNextQuestion'
    };
  }

  _generateIntro() {
    return `
      <div>
        <p>
          Welcome to the Trivia Quiz
        </p>
      </div>
      <div>
        <button class="start">Start</button>
      </div>
    `;
  }


  _buildAnswers(answers) {
    let template = '';
    answers.forEach(answer => {
      template += `<label><input type='radio' name='answer' value='${answer}'>${answer}</label>`;
    });
    return template;
  }
  
  _buildAnswerForm(answers) {
    let form = `
      <form id='js-answer-form'>
        <fieldset>
          ${this._buildAnswers(answers)}
        </fieldset>
      <button class='submit-answer' type='submit'>Submit</button>
      </form>
    `;
    
    return form;
  }
  
  _generateQuestion() {
    const question = this.model.nextQuestion();
    return `
      <div class='question'>
        ${question.text}
      </div>

      ${this._buildAnswerForm(question.answers)}
    `;
  }

  _highScoreHtml() {
    return `
      <p>Congrats!  Your score of ${this.model.score} is new high score!</p>
    `;
  }

  _notHighScoreHtml() {
    return `
      <p>Your final score was ${this.model.score}</p>
      <p>Keep trying!  The current high score is ${this.model.highScore()}</p>
    `;
  }
  
  _generateCompletionScreen() {
    return `
      <div>
        <h2>Quiz Complete!</h2>
          ${this.model.isHighScore() ? this._highScoreHtml() : this._notHighScoreHtml()}
          <button class='play-again'>Play Again</button>
      </div>
    `;
  }

  _buildCorrectAnswerHtml(question) {
    return `
      <p>You got it!</p>
      <p>The correct answer was: </p>
      <h3 class='correct-answer'>${question.correctAnswer}</h3>
    `;
  }

  _buildIncorrectAnswerHtml(question) {
    return `
      <p>Sorry, that's incorrect.</p>
      <p>You answered: </p>
      <h3 class='incorrect-answer'>${question.userAnswer}</h3>

      <p>The correct answer was: </p>
      <h3 class='correct-answer'>${question.correctAnswer}</h3>
    `;
  }

  _generateQuestionResult() {
    const question = this.model.lastQuestion();
    return `
      <div class='question'>
        ${question.text}
      </div>

      <div class='result'>
        ${question.isCorrect() ? this._buildCorrectAnswerHtml(question) : this._buildIncorrectAnswerHtml(question)}
      </div>
      <button class='continue'>Continue</button>
    `;
  }

  template() {
    if (this.model.active && this.model.showResults) {
      return this._generateQuestionResult(); 
    } else if (this.model.active && this.model.isCompleted()) {
      return this._generateCompletionScreen();
    } else if (this.model.active) {
      return this._generateQuestion();
    } else {
      return this._generateIntro();
    }
  }

  handleStart() {
    this.model.startNewGame();
    this.model.update();
  }

  submitAnswerForm() {
    event.preventDefault();
    const userAnswer = $('input[name=answer]:checked', event.target).val();
    this.model.submitAnswer(userAnswer);
    this.model.update();

  }

  handlePlayAgain() {
    this.model.playAgain()
      .then(quiz => quiz.update());
    
  }

  callNextQuestion() {
    this.model.showResults = false;
    this.model.update();
  }

}