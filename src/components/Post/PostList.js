import Component from "../../core/Component.js";
import Post from "./Post.js";
import fetchAPI from "../../api/index.js";
import { $ } from "../../utils/dom.js";
import Loading from "../Common/Loading.js";

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
      this.setState({ ...this.state, isLoading: true });

      const { code, data } = await fetchAPI.GET("posts");

      if (code === 200) {
        this.setState({ ...this.state, posts: data.posts, isLoading: false });
      }
    } catch (error) {
      this.setState({ ...this.state, isLoading: false, error: error.message });
      console.dir(error);
    }
  }
}

export default PostList;
