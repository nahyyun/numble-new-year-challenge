import Component from "../../core/Component";
import CommentInput from "./CommentInput";
import Comment from "./Comment";
import fetchAPI from "../../api/index";
import { $ } from "../../utils/dom";
import { Comment as CommentType } from "../../types";

interface CommentListState {
  postId: number;
  comments: CommentType[];
}

interface CommentListProps {
  postId: number;
  comments: CommentType[];
}

class CommentList extends Component<CommentListProps, CommentListState> {
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
          comment,
          deleteComment: (id) => this.deleteComment(id),
        })
    );

    new CommentInput({
      target: this.$target,
      addComment: (formElement) => this.addComment(formElement),
    });
  }

  async addComment(commentValue: string) {
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

  async deleteComment(id: number) {
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
