import data from './data.js'
import View from './view.js'
import ScoreCalculator from './score-calculator.js'

const btnSelector = 'button';
const ulSelector = 'ul';
const textareaSelector = 'textarea';
const scoringCriteria = 10;

const scoreCalculator = new ScoreCalculator(scoringCriteria);
const view = new View(ulSelector);

window.addEventListener('DOMContentLoaded', () => {
  view.display(data);
  scoreCalculator.addBtnEvent(btnSelector, textareaSelector);
})
