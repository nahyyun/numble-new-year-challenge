import Component from "../../core/Component.js";
import PostEditForm from "../../components/Post/PostEditForm.js";
import fetchAPI from "../../api/index.js";
import { $ } from "../../utils/dom.js";

class PostEditPage extends Component {
  template() {
    return `<main>
              <section class="post-edit-form-container"></section>
           </main>`;
  }

  async mounted() {
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
