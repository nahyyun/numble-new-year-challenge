import Component from "../../core/Component.js";
import Post from "./Post.js";
import Loading from "../Common/Loading.js";
import Snackbar from "../Common/Snackbar.js";
import fetchAPI from "../../api/index.js";
import { $ } from "../../utils/dom.js";
import { ERROR_MESSAGE } from "../../utils/message.js";

class PostList extends Component {
  init() {
    this.state = { isLoading: false, posts: [], error: false };
  }

  template() {
    return `<ul class="post-list"></ul>`;
  }

  render() {
    if (this.state.isLoading) {
      return new Loading({ target: this.$target });
    }

    if (this.state.error) {
      return new Snackbar({
        target: $("#snackbar"),
        props: { message: ERROR_MESSAGE["loadPosts"] },
      });
    }

    this.$target.innerHTML = this.template();

    this.state.posts.forEach(
      (post) => new Post({ target: $(".post-list"), props: { post } })
    );
  }

  mounted() {
    this.getPostList();
  }

  async getPostList() {
    try {
      this.setState({ ...this.state, isLoading: true, error: false });

      const { code, data } = await fetchAPI.GET("posts");

      if (code === 200) {
        this.setState({ ...this.state, posts: data.posts, isLoading: false });
      }
    } catch (error) {
      this.setState({ ...this.state, isLoading: false, error: error.message });
    }
  }
}

export default PostList;
