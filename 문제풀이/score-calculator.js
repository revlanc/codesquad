class ScoreCalculator {
  constructor(scoringCriteria) {
    this.scoringCriteria = scoringCriteria;
  }
  getAnswers(textareaSelector) {
    return document.querySelectorAll(textareaSelector);
  }
  calcScore(answers, scoringCriteria) {
    let score = 0;
    const len = answers.length;
    [...answers].forEach(el => {
      if (el.value.length > scoringCriteria) score += (100 / len);
    })
    return score;
  }
  showScore(score) {
    alert(`수고했어요! ${score}점이에요!🤣`);
  }
  addBtnEvent(btnSelector, textareaSelector) {
    const btn = document.querySelector(btnSelector);
    const answers = this.getAnswers(textareaSelector);

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const score = this.calcScore(answers, this.scoringCriteria);
      this.showScore(score);
    })
  }
}
export default ScoreCalculator;