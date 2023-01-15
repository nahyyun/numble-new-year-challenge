import Component from "../core/Component.js";
import PostItem from "./PostItem.js";
import { $ } from "../utils/dom.js";

class PostList extends Component {
  template() {
    return `<ul class="post-list"></ul>`;
  }

  async mounted() {
    if (this.state) return;

    const response = await fetch("http://43.201.103.199/posts", {
      method: "GET",
    });

    const { data } = await response.json();
    this.setState({ posts: data.posts });

    this.state.posts.forEach(
      (post) => new PostItem({ target: $(".post-list"), props: post })
    );
  }

  event() {}
}

export default PostList;
