import Component from "../../core/Component.js";
import Header from "../../components/Common/Header.js";
import PostEditForm from "../../components/Post/PostEditForm.js";
import fetchAPI from "../../api/index.js";
import { $ } from "../../utils/dom.js";

class PostEditPage extends Component {
  template() {
    return `<main>
              <nav id="navbar-wrapper"></nav>
              <section class="post-edit-form-container"></section>
           </main>`;
  }

  async mounted() {
    new Header({ target: $("#navbar-wrapper"), props: { isMain: false } });

    const postId = location.pathname.split("/").pop();

    const post = await this.getPostDetail(postId);

    new PostEditForm({
      target: $(".post-edit-form-container"),
      props: { post },
    });
  }

  async getPostDetail(postId) {
    try {
      const { success, data } = await fetchAPI.GET(`post/${postId}`);

      if (success) {
        return data.post;
      }
    } catch (error) {
      console.dir(error);
    }
  }
}

export default PostEditPage;
