import Component from "../../core/Component.js";
import Button from "../Common/Button.js";

class CommentInput extends Component {
  template() {
    return `
        <form id="addCommentForm">
            <input id="comment" type="text"/>
        </form>
     `;
  }

  render() {
    this.$target.insertAdjacentHTML("beforeend", this.template());

    const addCommentForm = document.forms.addCommentForm;

    new Button({
      target: addCommentForm,
      props: {
        position: "beforeend",
        type: "submit",
        className: "btn-add-comment",
        text: "게시",
      },
    });
  }

  event() {
    const addCommentForm = document.forms.addCommentForm;

    addCommentForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const { addComment } = this.props;
      addComment(addCommentForm);
    });
  }
}

export default CommentInput;
