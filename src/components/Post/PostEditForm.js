import Component from "../../core/Component.js";
import Button from "../Common/Button.js";
import { navigate } from "../../router.js";
import fetchAPI from "../../api/index.js";

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

      this.editPost(postEditForm, this.props.post);
    });
  }

  async editPost(formElement, { postId, image }) {
    try {
      const { code } = await fetchAPI.PATCH(`post/${postId}`, {
        image,
        title: formElement.formTitle.value,
        content: formElement.formContent.value,
      });
      if (code === 200) {
        navigate(`/post/${postId}`);
      }
    } catch (error) {
      console.dir(error);
    }
  }
}

export default PostEditForm;
