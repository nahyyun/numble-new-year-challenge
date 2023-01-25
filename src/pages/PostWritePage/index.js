import Component from "../../core/Component.js";
import Header from "../../components/Common/Header.js";
import PostAddForm from "../../components/Post/PostAddForm.js";
import { $ } from "../../utils/dom.js";

class PostWritePage extends Component {
  template() {
    return `<main>
              <nav id="navbar-wrapper"></nav>
              <section class="post-add-form-container"></section>
            </main>`;
  }

  mounted() {
    new Header({ target: $("#navbar-wrapper"), props: { isMain: false } });

    new PostAddForm({
      target: $(".post-add-form-container"),
    });
  }
}

export default PostWritePage;
