import Component from "../../core/Component.js";
import PostAddForm from "../../components/Post/PostAddForm.js";
import { $ } from "../../utils/dom.js";

class PostWritePage extends Component {
  template() {
    return `<main>
              <section class="post-add-form-container"></section>
            </main>`;
  }

  mounted() {
    new PostAddForm({
      target: $(".post-add-form-container"),
    });
  }
}

export default PostWritePage;
