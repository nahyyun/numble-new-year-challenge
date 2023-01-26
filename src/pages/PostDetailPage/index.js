import Component from "../../core/Component.js";
import Header from "../../components/Common/Header.js";
import PostDetail from "../../components/Post/PostDetail.js";
import CommentList from "../../components/Comment/CommentList.js";
import Loading from "../../components/Common/Loading.js";
import fetchAPI from "../../api/index.js";
import { $ } from "../../utils/dom.js";

class PostDetailPage extends Component {
  init() {
    this.state = { post: {}, comments: [], isLoading: false, error: false };
  }

  template() {
    return `<main>
              <nav id="navbar-wrapper"></nav>
              <section class="post-detail-container"></section>
              <section class="comments"></section>
            </main>`;
  }

  render() {
    if (this.state.isLoading) {
      return new Loading({ target: $(".post-detail-container") });
    }

    this.$target.innerHTML = this.template();

    const { post, comments } = this.state;

    new Header({ target: $("#navbar-wrapper"), props: { isMain: false } });

    new PostDetail({
      target: $(".post-detail-container"),
      props: { detailInfo: post },
    });

    new CommentList({
      target: $(".comments"),
      props: { postId: this.props.params, comments },
    });
  }

  mounted() {
    this.getPostDetail();
  }

  async getPostDetail() {
    const postId = this.props.params;
    try {
      this.setState({ ...this.state, isLoading: true });
      const {
        success,
        data: { post, comments },
      } = await fetchAPI.GET(`post/${postId}`);

      if (success) {
        this.setState({ ...this.state, isLoading: false, post, comments });
      }
    } catch (error) {
      this.setState({ ...this.state, isLoading: false, error: error.message });
      console.dir(error);
    }
  }
}

export default PostDetailPage;
