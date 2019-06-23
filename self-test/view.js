class View {
  constructor(ulSelector) {
    this.ul = ulSelector;
  }
  createDOM(data) {
    let node = '';
    for (let i of data) {
      node += `<li><div>${i.subject}</div><textarea placeholder='답을 적어봅시당'></textarea></li>`;
    }
    return node;
  }
  display(data) {
    const ul = document.querySelector(this.ul);
    const dom = this.createDOM(data);
    ul.insertAdjacentHTML('beforeend', dom);
  }
}
export default View;