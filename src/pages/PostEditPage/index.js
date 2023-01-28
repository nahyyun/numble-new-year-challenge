import Component from "../../core/Component.js";
import Header from "../../components/Common/Header.js";
import PostEditForm from "../../components/Post/PostEditForm.js";
import Loading from "../../components/Common/Loading.js";
import fetchAPI from "../../api/index.js";
import { navigate } from "../../router.js";
import { $ } from "../../utils/dom.js";

class PostEditPage extends Component {
  init() {
    const post = history.state ?? {};
    this.state = { post, isLoading: false };
  }

  template() {
    return `<main>
              <nav id="navbar-wrapper"></nav>
              <section class="post-edit-form-container"></section>
           </main>`;
  }

  render() {
    if (this.state.isLoading) {
      return new Loading({ target: this.$target });
    }

    this.$target.innerHTML = this.template();

    new Header({ target: $("#navbar-wrapper"), props: { isMain: false } });

    new PostEditForm({
      target: $(".post-edit-form-container"),
      props: { post: this.state.post },
    });
  }

  mounted() {
    if (!this.state.post.postId) {
      const postId = location.pathname.split("/").pop();
      this.getPostDetail(postId);
    }
  }

  async getPostDetail(postId) {
    try {
      this.setState({ ...this.state, isLoading: true });

      const { success, data } = await fetchAPI.GET(`post/${postId}`);

      if (success) {
        this.setState({ post: data.post, isLoading: false });
      }
    } catch (error) {
      this.setState({ ...this.state, isLoading: false });
      navigate("/notfound");
    }
  }
}

export default PostEditPage;
