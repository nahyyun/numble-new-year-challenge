import Component from "../core/Component";
import Header from "../components/Common/Header";
import PostAddForm from "../components/Post/PostAddForm";
import { $ } from "../utils/dom";

class PostWritePage extends Component {
  template() {
    return `<main>
              <nav id="navbar-wrapper"></nav>
              <section class="post-add-form-container"></section>
            </main>`;
  }

  render() {
    this.$target.innerHTML = this.template();

    new Header({ target: $("#navbar-wrapper"), isMain: false });

    new PostAddForm({
      target: $(".post-add-form-container"),
    });
  }
}

export default PostWritePage;
