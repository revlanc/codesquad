class StickyHeader {
  constructor(headerSelector) {
    this.init(headerSelector);
  }
  init(headerSelector) {
    const header = document.querySelector(headerSelector);
    const child = header.firstElementChild;

    header.classList.add('sticky-header');
    child.classList.add('sticky-title');
    window.addEventListener("scroll", function () {
      if (window.scrollY >= 100) {
        header.classList.add("small-header");
        child.classList.add('small-title');
      } else {
        header.classList.remove("small-header");
        child.classList.remove('small-title');
      }
    });
  }
}
export default StickyHeader;