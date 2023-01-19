import Component from "../../core/Component.js";
import { $ } from "../../utils/dom.js";

class Button extends Component {
  template() {
    const { type, className, text } = this.props;

    return `<button 
              type="${type}" 
              class="${className}" 
            >${text}
            </button>`;
  }

  render() {
    this.$target.insertAdjacentHTML(this.props.position, this.template());
  }

  event() {
    $(`.${this.props.className}`).addEventListener("click", () => {
      if (this.props.handleClick) {
        this.props.handleClick();
      }
    });
  }
}

export default Button;
