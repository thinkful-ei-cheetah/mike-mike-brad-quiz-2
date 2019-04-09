'use strict';

/* global Renderer */

class QuizStatus extends Renderer {    // eslint-disable-line no-unused-vars
  template() {
    return `
      <div>Score: ${this.model.score}</div>
      <div>High Score: ${this.model.highScore()}</div>
      <div>Status: ${this.model.progress()}</div>
    `;
  }
}
