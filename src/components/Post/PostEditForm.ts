import Component from "../../core/Component";
import Button from "../Common/Button";
import Snackbar from "../Common/Snackbar";
import { navigate } from "../../router";
import fetchAPI from "../../api/index";
import { isValidForm } from "../../utils/validForm";
import { $ } from "../../utils/dom";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/message";
import { Post, editFormSubmitType } from "../../types";

interface PostEditFormProps {
  post: Post;
}

class PostEditForm extends Component<PostEditFormProps> {
  template() {
    const { title = "", content = "" } = this.props.post;

    return `
        <form id="postEditForm">
            <label for="formTitle">제목</label>
           <input 
                id="formTitle"
                value="${title}"
            />
            <label for="formContent">내용</label>
            <textarea
                id="formContent"
                row="6"
            >${content}</textarea>
        </form>
     `;
  }

  render() {
    this.$target.insertAdjacentHTML("afterbegin", this.template());

    new Button({
      target: document.forms.namedItem("postEditForm")!,
      position: "beforeend",
      type: "submit",
      className: "btn-edit-post",
      text: "수정 완료",
    });
  }

  event() {
    const postEditForm = document.forms.namedItem("postEditForm")!;

    postEditForm.addEventListener("submit", (e) => {
      e.preventDefault();

      this.submitHandler(postEditForm);
    });
  }

  submitHandler(postEditForm: HTMLFormElement) {
    const formTitle = postEditForm.elements.namedItem(
      "formTitle"
    )! as HTMLFormElement;
    const formContent = postEditForm.elements.namedItem(
      "formContent"
    )! as HTMLFormElement;

    const formValue: editFormSubmitType = {
      title: formTitle.value,
      content: formContent.value,
    };

    if (isValidForm(formValue)) {
      return this.editPost({
        post: this.props.post,
        formValue,
      });
    }
    new Snackbar({
      target: $("#snackbar"),
      message: ERROR_MESSAGE["invalidForm"],
    });
  }

  async editPost({
    post: { postId, image },
    formValue: { title, content },
  }: {
    post: Post;
    formValue: editFormSubmitType;
  }) {
    try {
      const { code } = await fetchAPI.PATCH(`post/${postId}`, {
        image,
        title,
        content,
      });
      if (code === 200) {
        new Snackbar({
          target: $("#snackbar"),
          message: SUCCESS_MESSAGE["editPost"],
        });
        navigate(`/post/${postId}`);
      }
    } catch (error) {
      new Snackbar({
        target: $("#snackbar"),
        message: ERROR_MESSAGE["editPost"],
      });
    }
  }
}

export default PostEditForm;
