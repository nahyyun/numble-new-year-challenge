import Component from "../../core/Component.js";
import Button from "../../components/Common/Button.js";
import { navigate } from "../../router.js";
import { $ } from "../../utils/dom.js";

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
      props: {
        position: "beforeend",
        type: "button",
        className: `btn-goto-main`,
        text: "메인으로 이동",
        handleClick: this.goToMainPage,
      },
    });
  }

  goToMainPage() {
    navigate("/");
  }
}

export default NotFoundPage;
