'use strict';

const TriviaApi = (function() {
  class TriviaApi {
    constructor(amount, category, difficulty, type) {
      this.baseUrl = 'https://opentdb.com/api.php';
      this.amount = amount;
      this.category = category;
      this.difficulty = difficulty;
      this.type = type;
    }
  
    generate() {
      const apiUrl = `${this.baseUrl}?${this.buildQueryParams()}`;
      return fetch(apiUrl);
    }
  
    buildQueryParams() {
      // ?amount=5&category=21&difficulty=easy&type=multiple
      return `amount=${this.amount}&category=${this.category}&difficulty=${this.difficulty}&type=${this.type}`;
    }
  }

  return TriviaApi;
}());