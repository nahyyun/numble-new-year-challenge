import Component from "../../core/Component.js";
import CommentList from "../../components/Comment/CommentList.js";
import { $ } from "../../utils/dom.js";

class PostDetailPage extends Component {
  template() {
    if (!this.state) return;

    const { title, content, image, updatedAt } = this.state.post;
    const [updateDate] = updatedAt.split("T");

    return `<main>
              <section class="post-detail-container">
                <div class="post-image">
                  <img src=${image} width="200px"/>
                </div>
                <strong>${title}</strong>
                <span>${updateDate}</span>
                <span>${content}</span>
                <div>
                  <button class="btn-edit-post">수정</button>
                  <button class="btn-delete-post">삭제</button>
                </div>
              </section>
              <section class="comments">
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

    new CommentList({ target: $(".comments"), props: { comments } });
  }
}

export default PostDetailPage;
