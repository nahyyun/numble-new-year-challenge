import Component from "../../core/Component.js";
import { $ } from "../../utils/dom.js";

class Button extends Component {
  template() {
    const { className, text } = this.props;

    return `<button class="${className}">${text}</button>`;
  }

  render() {
    this.$target.insertAdjacentHTML("beforeend", this.template());
  }

  event() {
    this.$target.addEventListener("click", (e) => {
      if (this.props.className !== e.target.className) return;

      this.props.handleClick();
    });
  }
}

export default Button;
