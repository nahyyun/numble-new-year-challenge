import Component from "../../core/Component";
import Button from "../Common/Button";
import { $ } from "../../utils/dom";
import { Comment as CommentType } from "../../types";

interface CommentProps {
  comment: CommentType;
  deleteComment: (id: number) => void;
}
class Comment extends Component<CommentProps> {
  template() {
    const { commentId, content } = this.props.comment;

    return `
        <li data-id="${commentId}" class="comment-${commentId}">
          <span>${content}</span>
        </li>
     `;
  }

  render() {
    this.$target.insertAdjacentHTML("beforeend", this.template());

    const { commentId } = this.props.comment;

    new Button({
      target: $(`.comment-${commentId}`),
      position: "beforeend",
      type: "button",
      className: `btn-comment-delete-${commentId}`,
      text: "삭제",
      handleClick: () => this.props.deleteComment(commentId),
    });
  }
}

export default Comment;
