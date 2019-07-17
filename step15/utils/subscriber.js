export default class Subscriber {
  subscribe(name, publisher) {
    this.publisher = publisher;
    this.publisher.add(name, this);
  }
  render(state) {
    console.log(state);
  }

  // shouldRender(newValue, oldValue) {
  //   return newValue !== oldValue;
  // }
}