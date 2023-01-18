import Component from "../../core/Component.js";
import { $ } from "../../utils/dom.js";

class Comment extends Component {
  init() {
    this.state = { comment: this.props.comment };
  }

  template() {
    if (!this.state.comment) return "";

    const { commentId, content } = this.state.comment;
    return `
        <li data-id="${commentId}" class="post-${commentId}">
          <span>${content}</span>
          <button class="btn-delete-comment">삭제</button>
        </li>
     `;
  }

  render() {
    this.$target.insertAdjacentHTML("afterend", this.template());
  }
}

export default Comment;
