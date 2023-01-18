import Component from "../../core/Component.js";
import PostDetail from "../../components/Post/PostDetail.js";
import CommentList from "../../components/Comment/CommentList.js";
import { $ } from "../../utils/dom.js";

class PostDetailPage extends Component {
  template() {
    return `<main>
              <section class="post-detail-container"></section>
              <section class="comments"></section>
            </main>`;
  }

  async mounted() {
    if (this.state) return;

    const response = await fetch(
      `http://43.201.103.199/post/${this.props.params}`,
      {
        method: "GET",
      }
    );

    const {
      data: { post, comments },
    } = await response.json();
    this.setState({ post, comments });

    new PostDetail({
      target: $(".post-detail-container"),
      props: { detailInfo: post },
    });

    new CommentList({ target: $(".comments"), props: { comments } });
  }

  event() {}
}

export default PostDetailPage;
