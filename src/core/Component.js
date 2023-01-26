export default class Component {
  state;
  constructor({ target, props }) {
    this.$target = target;
    this.props = props;
    this.init();
    this.render();
    this.mounted();
    this.event();
  }

  init() {}

  template() {
    return "";
  }

  mounted() {}

  render() {
    this.$target.innerHTML = this.template();
  }

  event() {}

  setState(newState) {
    if (this.isSameState(newState)) return;

    this.state = newState;
    this.render();
  }

  isSameState(newState) {
    return JSON.stringify(this.state) === JSON.stringify(newState);
  }
}
