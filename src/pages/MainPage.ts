import Component from "../core/Component";
import PostList from "../components/Post/PostList";
import Button from "../components/Common/Button";
import Header from "../components/Common/Header";
import { navigate } from "../router";
import { $ } from "../utils/dom";

class MainPage extends Component {
  template() {
    return `<main id="main-page">
              <nav id="navbar-wrapper"></nav>
              <div class="btn-add-post-wrapper"></div>
              <section class="post-list-container"></section>
            </main>`;
  }

  render() {
    this.$target.innerHTML = this.template();

    new Header({ target: $("#navbar-wrapper"), isMain: true });

    new Button({
      target: $(".btn-add-post-wrapper"),
      position: "afterbegin",
      type: "button",
      className: "btn-add-post",
      text: "게시글 등록하기",
      handleClick: this.moveToAddPage,
    });

    new PostList({ target: $(".post-list-container") });
  }

  moveToAddPage() {
    navigate("/write");
  }
}

export default MainPage;
