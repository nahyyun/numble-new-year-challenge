import Component from "../../core/Component.js";
import Header from "../../components/Common/Header.js";
import PostDetail from "../../components/Post/PostDetail.js";
import CommentList from "../../components/Comment/CommentList.js";
import fetchAPI from "../../api/index.js";
import { $ } from "../../utils/dom.js";

class PostDetailPage extends Component {
  template() {
    return `<main>
              <nav id="navbar-wrapperr"></nav>
              <section class="post-detail-container"></section>
              <section class="comments"></section>
            </main>`;
  }

  async mounted() {
    const { post, comments } = await this.getPostDetail();
    new Header({ target: $("#navbar-wrapperr"), props: { isMain: false } });

    new PostDetail({
      target: $(".post-detail-container"),
      props: { detailInfo: post },
    });

    new CommentList({
      target: $(".comments"),
      props: { postId: 189, comments },
    });
  }

  async getPostDetail() {
    try {
      const {
        success,
        data: { post, comments },
      } = await fetchAPI.GET(`post/${this.props.params}`);

      if (success) {
        return { post, comments };
      }
    } catch (error) {
      console.dir(error);
    }
  }
}

export default PostDetailPage;
