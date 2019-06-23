import data from './data.js'
import View from './view.js'
import ScoreCalculator from './score-calculator.js'
import StickyHeader from './sticky-header.js'

const headerSelector = 'header';
const btnSelector = 'button';
const ulSelector = 'ul';
const textareaSelector = 'textarea';
const scoringCriteria = 10;

const stickyHeader = new StickyHeader(headerSelector);
const scoreCalculator = new ScoreCalculator(scoringCriteria);
const view = new View(ulSelector);

window.addEventListener('DOMContentLoaded', () => {
  view.display(data);
  scoreCalculator.addBtnEvent(btnSelector, textareaSelector);
})
