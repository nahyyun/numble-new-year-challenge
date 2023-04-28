import Component from "../../core/Component";
import { $ } from "../../utils/dom";

interface ButtonProps {
  position: "afterbegin" | "beforeend";
  type: "button" | "submit";
  className: string;
  text: string;
  handleClick?: () => void;
}

class Button extends Component<ButtonProps> {
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
