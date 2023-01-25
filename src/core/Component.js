export default class Component {
  state;
  constructor({ target, props }) {
    this.$target = target;
    this.props = props;
    this.init();
    this.render();
    this.event();
  }

  init() {}

  template() {
    return "";
  }

  mounted() {}

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  event() {}

  setState(newData) {
    this.state = { ...this.state, ...newData };
    this.render();
  }
}
