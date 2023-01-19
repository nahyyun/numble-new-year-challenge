import Component from "../../core/Component.js";
import Post from "./Post.js";
import fetchAPI from "../../api/index.js";
import { $ } from "../../utils/dom.js";

class PostList extends Component {
  template() {
    return `<ul class="post-list"></ul>`;
  }

  mounted() {
    if (this.state) return;

    this.getPostList();
  }

  async getPostList() {
    try {
      const { code, data } = await fetchAPI.GET("posts");

      if (code === 200) {
        this.setState({ posts: data.posts });

        this.state.posts.forEach(
          (post) => new Post({ target: $(".post-list"), props: post })
        );
      }
    } catch (error) {
      console.dir(error);
    }
  }
}

export default PostList;
