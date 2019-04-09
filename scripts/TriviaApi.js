'use strict';

const TriviaApi = (function() {
  class TriviaApi {
    constructor() {
      this.baseUrl = 'https://opentdb.com/api.php';
    }
  
    generate(amount, category, difficulty, type) {
      const apiUrl = `${this.baseUrl}?${this.buildQueryParams(amount, category, difficulty, type)}`;
      return fetch(apiUrl);
    }
  
    buildQueryParams(amount, category, difficulty, type) {
      // ?amount=5&category=21&difficulty=easy&type=multiple
      return `amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    }
  } 

  return TriviaApi;
}());