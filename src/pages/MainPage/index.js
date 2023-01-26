import Component from "../../core/Component.js";
import PostList from "../../components/Post/PostList.js";
import Button from "../../components/Common/Button.js";
import Header from "../../components/Common/Header.js";
import { navigate } from "../../router.js";
import { $ } from "../../utils/dom.js";

class MainPage extends Component {
  template() {
    return `<main>
        <nav id="navbar-wrapper"></nav>
        <div class="btn-add-post-wrapper"><div>
        <section class="post-list-container"></section>
      </main>`;
  }

  render() {
    this.$target.innerHTML = this.template();

    new Header({ target: $("#navbar-wrapper"), props: { isMain: true } });

    new Button({
      target: $(".btn-add-post-wrapper"),
      props: {
        position: "afterbegin",
        type: "button",
        className: "btn-add-post",
        text: "게시글 등록하기",
        handleClick: this.moveToAddPage,
      },
    });

    new PostList({ target: $(".post-list-container") });
  }

  moveToAddPage() {
    navigate("/write");
  }
}

export default MainPage;
