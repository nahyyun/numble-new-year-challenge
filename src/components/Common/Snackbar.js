import Component from "../../core/Component.js";
import { createDom } from "../../utils/dom.js";

class Snackbar extends Component {
  init() {
    this.snackbar = null;
  }

  render() {
    if (this.isChidrenCountMax()) return;

    const _snackbar = createDom("div", createDom("span", this.props.message));
    this.snackbar = _snackbar;

    this.$target.append(this.snackbar);
  }

  mounted() {
    this.snackbar &&
      setTimeout(() => this.$target.removeChild(this.snackbar), 3000);
  }

  isChidrenCountMax() {
    return this.$target.children.length > 2;
  }
}

export default Snackbar;
