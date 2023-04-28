import Component from "../../core/Component";
import Post from "./Post";
import Loading from "../Common/Loading";
import Snackbar from "../Common/Snackbar";
import fetchAPI from "../../api/index";
import { $ } from "../../utils/dom";
import { ERROR_MESSAGE } from "../../utils/message";
import { Post as PostType } from "../../types";

interface PostListState {
  isLoading: boolean;
  posts: PostType[];
  error: boolean;
}

class PostList extends Component<{}, PostListState> {
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
        message: ERROR_MESSAGE["loadPosts"],
      });
    }

    this.$target.innerHTML = this.template();

    this.state.posts.forEach(
      (post) => new Post({ target: $(".post-list"), post })
    );
  }

  mounted() {
    this.getPostList();
  }

  async getPostList() {
    try {
      this.setState({ posts: [], isLoading: true, error: false });

      const { code, data } = await fetchAPI.GET("posts");

      if (code === 200) {
        this.setState({ ...this.state, posts: data.posts, isLoading: false });
      }
    } catch (error) {
      this.setState({ ...this.state, isLoading: false, error: true });
    }
  }
}

export default PostList;
