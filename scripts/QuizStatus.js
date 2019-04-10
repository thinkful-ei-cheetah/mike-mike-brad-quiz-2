'use strict';

/* global Renderer */

class QuizStatus extends Renderer {    // eslint-disable-line no-unused-vars
  template() {
    return `
      <div>Score: <span>${this.model.score}</span></div>
      <div>High Score: <span>${this.model.highScore()}</span></div>
      <div>Status: <span>${this.model.progress()}</span></div>
    `;
  }
}
