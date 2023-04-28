import Component from "../core/Component";
import Button from "../components/Common/Button";
import { navigate } from "../router";
import { $ } from "../utils/dom";

class NotFoundPage extends Component {
  template() {
    return `<main id="notfound-page">
              <span>Page Not Found</span>
            </main>`;
  }

  render() {
    this.$target.innerHTML = this.template();

    new Button({
      target: $(`#notfound-page`),
      position: "beforeend",
      type: "button",
      className: `btn-goto-main`,
      text: "메인으로 이동",
      handleClick: this.goToMainPage,
    });
  }

  goToMainPage() {
    navigate("/");
  }
}

export default NotFoundPage;
