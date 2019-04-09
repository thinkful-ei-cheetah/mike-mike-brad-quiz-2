'use strict';

/* global Renderer */

class QuizDisplay extends Renderer {    // eslint-disable-line no-unused-vars
  getEvents() {
    return {
      'click .start': 'handleStart',
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
      template += `<label><input type='radio' name='answer' value=${answer}>${answer}</label>`;
    });
    return template;
  }
  
  _buildAnswerForm(answers) {
    let form = `
      <form id='js-answer-form'>
        <fieldset>
          ${this._buildAnswers(answers)}
        </fieldset>
      <button type='submit'>Submit</button>
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

  template() {
    if (this.model.active) {
      return this._generateQuestion();
    } else {
      return this._generateIntro();
    }
  }

  handleStart() {
    this.model.startNewGame();
    this.model.update();
  }

}