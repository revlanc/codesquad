class View {
  constructor(data) {
    this.data = data;
  }
  createDOM(data) {
    let node = '';
    for (let i of data) {
      node += `<li><div>${i.subject}</div><textarea placeholder='답을 적어봅시당'></textarea></li>`;
    }
    return node;
  }
  display() {
    const ul = document.querySelector('ul');
    const dom = this.createDOM(this.data);
    ul.insertAdjacentHTML('beforeend', dom);
  }
}
export default View;