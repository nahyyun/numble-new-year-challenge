import Component from "../../core/Component.js";
import Button from "../Common/Button.js";
import Snackbar from "../Common/Snackbar.js";
import { navigate } from "../../router.js";
import fetchAPI from "../../api/index.js";
import { isValidForm } from "../../utils/validForm.js";
import { $ } from "../../utils/dom.js";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/message.js";

class PostEditForm extends Component {
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
      target: document.forms.postEditForm,
      props: {
        position: "beforeend",
        type: "submit",
        className: "btn-edit-post",
        text: "수정 완료",
      },
    });
  }

  event() {
    const postEditForm = document.forms.postEditForm;

    postEditForm.addEventListener("submit", (e) => {
      e.preventDefault();

      this.submitHandler(postEditForm);
    });
  }

  submitHandler(postEditForm) {
    const { formTitle, formContent } = postEditForm.elements;

    const formValue = {
      title: formTitle.value,
      content: formContent.value,
    };

    if (isValidForm(formValue)) {
      this.editPost({
        post: this.props.post,
        formValue,
      });
    }
  }

  async editPost({ post: { postId, image }, formValue: { title, content } }) {
    try {
      const { code } = await fetchAPI.PATCH(`post/${postId}`, {
        image,
        title,
        content,
      });
      if (code === 200) {
        new Snackbar({
          target: $("#snackbar"),
          props: { message: SUCCESS_MESSAGE["editPost"] },
        });
        navigate(`/post/${postId}`);
      }
    } catch (error) {
      new Snackbar({
        target: $("#snackbar"),
        props: { message: ERROR_MESSAGE["editPost"] },
      });
    }
  }
}

export default PostEditForm;
