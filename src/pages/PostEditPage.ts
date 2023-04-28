import Component from "../core/Component";
import Header from "../components/Common/Header";
import PostEditForm from "../components/Post/PostEditForm";
import Loading from "../components/Common/Loading";
import fetchAPI from "../api/index";
import { navigate } from "../router";
import { $ } from "../utils/dom";
import { Post } from "../types";

interface PostEditPageState {
  post: Post;
  isLoading: boolean;
}

class PostEditPage extends Component<{}, PostEditPageState> {
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

    new Header({ target: $("#navbar-wrapper"), isMain: false });

    new PostEditForm({
      target: $(".post-edit-form-container"),
      post: this.state.post,
    });
  }

  mounted() {
    if (!this.state.post.postId) {
      const postId = Number(location.pathname.split("/").pop());
      this.getPostDetail(postId);
    }
  }

  async getPostDetail(postId: number) {
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
