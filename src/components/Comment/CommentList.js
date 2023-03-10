import Component from "../../core/Component.js";
import Comment from "./Comment.js";
import CommentInput from "../../components/Comment/CommentInput.js";
import fetchAPI from "../../api/index.js";
import { $ } from "../../utils/dom.js";

class CommentList extends Component {
  init() {
    const { postId, comments } = this.props;
    this.state = { postId, comments };
  }

  template() {
    return `<ul class="comment-list"></ul>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();

    this.state.comments.forEach(
      (comment) =>
        new Comment({
          target: $(".comment-list"),
          props: { comment, deleteComment: (id) => this.deleteComment(id) },
        })
    );

    new CommentInput({
      target: this.$target,
      props: {
        postId: this.state.postId,
        addComment: (formElement) => this.addComment(formElement),
      },
    });
  }

  async addComment(commentValue) {
    try {
      const { code, data } = await fetchAPI.POST(
        `comment/${this.state.postId}`,
        {
          content: commentValue,
        }
      );

      if (code === 201) {
        this.setState({
          ...this.state,
          comments: [...this.state.comments, data],
        });
      }
    } catch (error) {
      console.dir(error);
    }
  }

  async deleteComment(id) {
    const { code } = await fetchAPI.DELETE(`comment/${id}`);

    if (code === 200) {
      this.setState({
        ...this.state,
        comments: this.state.comments.filter(
          (comment) => comment.commentId !== id
        ),
      });
    }
  }
}

export default CommentList;
