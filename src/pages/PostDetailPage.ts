import Component from "../core/Component";
import Header from "../components/Common/Header";
import PostDetail from "../components/Post/PostDetail";
import CommentList from "../components/Comment/CommentList";
import Loading from "../components/Common/Loading";
import fetchAPI from "../api/index";
import { navigate } from "../router";
import { $ } from "../utils/dom";
import { Comment, Post } from "../types";

interface PostDetailPageState {
  isLoading: boolean;
  post: Post;
  comments: Comment[];
}

interface PostDetailPageProps {
  params: number[];
}

class PostDetailPage extends Component<
  PostDetailPageProps,
  PostDetailPageState
> {
  init() {
    this.state = {
      isLoading: false,
      post: {
        postId: this.props.params[0],
        title: "",
        content: "",
        image: "",
        updatedAt: new Date(),
      },
      comments: [],
    };
  }
  template() {
    return `<main>
              <nav id="navbar-wrapper"></nav>
              <section class="post-detail-container"></section>
              <section class="comments-container"></section>
            </main>`;
  }

  render() {
    if (this.state.isLoading) {
      return new Loading({ target: $(".post-detail-container") });
    }
    this.$target.innerHTML = this.template();

    const { post, comments } = this.state;

    new Header({ target: $("#navbar-wrapper"), isMain: false });

    new PostDetail({
      target: $(".post-detail-container"),
      detailInfo: post,
    });

    new CommentList({
      target: $(".comments-container"),
      postId: post.postId,
      comments,
    });
  }

  mounted() {
    this.getPostDetail();
  }

  async getPostDetail() {
    const postId = this.state.post.postId;

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
      this.setState({ ...this.state, isLoading: false });
      navigate("/notfound");
    }
  }
}

export default PostDetailPage;
