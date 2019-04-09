'use strict';

/* global Renderer */

class QuizStatus extends Renderer {    // eslint-disable-line no-unused-vars
  template() {
    return `
      <div>${this.model.progress()} Questions</div>
    `;
  }
}
