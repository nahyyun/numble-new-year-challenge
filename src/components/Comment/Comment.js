import Component from "../../core/Component.js";
import Button from "../Common/Button.js";
import { $ } from "../../utils/dom.js";

class Comment extends Component {
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
      props: {
        position: "beforeend",
        type: "button",
        className: `btn-comment-delete-${commentId}`,
        text: "삭제",
        handleClick: () => this.props.deleteComment(commentId),
      },
    });
  }
}

export default Comment;
