import Component from "../../core/Component";
import Button from "../Common/Button";
import { isValidForm } from "../../utils/validForm";
import Snackbar from "../Common/Snackbar";
import { $ } from "../../utils/dom";
import { ERROR_MESSAGE } from "../../utils/message";

interface CommentInputProps {
  addComment: (content: string) => void;
}

class CommentInput extends Component<CommentInputProps> {
  template() {
    return `
        <form id="addCommentForm">
            <input id="comment" type="text"/>
        </form>
     `;
  }

  render() {
    this.$target.insertAdjacentHTML("beforeend", this.template());

    const addCommentForm = document.forms.namedItem("addCommentForm")!;

    new Button({
      target: addCommentForm,
      position: "beforeend",
      type: "submit",
      className: "btn-add-comment",
      text: "✏️",
    });
  }

  event() {
    const addCommentForm = document.forms.namedItem("addCommentForm")!;

    addCommentForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const commentValue = addCommentForm.comment.value;

      if (isValidForm({ comment: commentValue })) {
        const { addComment } = this.props;
        addComment(commentValue);

        return;
      }

      new Snackbar({
        target: $("#snackbar"),
        message: ERROR_MESSAGE["invalidForm"],
      });
    });
  }
}

export default CommentInput;
