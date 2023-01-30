import Component from "../../core/Component.js";
import Button from "../Common/Button.js";
import Snackbar from "../Common/Snackbar.js";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/message.js";
import { $ } from "../../utils/dom.js";
import { navigate } from "../../router.js";
import fetchAPI from "../../api/index.js";
import { isValidForm } from "../../utils/validForm.js";

class PostAddForm extends Component {
  init() {
    this.imageUrl = "";
  }

  template() {
    return `
        <form id="postAddForm">
            <label for="formTitle">제목</label>
            <input
                id="formTitle"
                placeholder="제목을 입력하세요."
            />
            <label for="formContent">내용</label>
            <textarea
                id="formContent"
                row="6"
                placeholder="내용을 입력하세요."
            ></textarea>
        </form>
     `;
  }

  render() {
    this.$target.insertAdjacentHTML("afterbegin", this.template());

    const postAddForm = document.forms.postAddForm;

    new Button({
      target: $(".post-add-form-container"),
      props: {
        position: "afterbegin",
        type: "button",
        className: "btn-upload-image",
        text: "랜덤 이미지 추가하기",
        handleClick: () => this.getRandomImage(),
      },
    });

    new Button({
      target: postAddForm,
      props: {
        position: "beforeend",
        type: "submit",
        className: "btn-add-post",
        text: "작성 완료",
      },
    });
  }

  event() {
    const postAddForm = document.forms.postAddForm;

    postAddForm.addEventListener("submit", (e) => {
      e.preventDefault();

      this.submitHandler(postAddForm);
    });
  }

  submitHandler(postAddForm) {
    const { formTitle, formContent } = postAddForm.elements;

    const formValue = {
      image: this.imageUrl,
      title: formTitle.value,
      content: formContent.value,
    };

    if (isValidForm(formValue)) {
      this.addPost(formValue);
    }
  }

  async addPost({ image, title, content }) {
    try {
      const { code } = await fetchAPI.POST(`post`, {
        image,
        title,
        content,
      });

      if (code === 201) {
        new Snackbar({
          target: $("#snackbar"),
          props: { message: SUCCESS_MESSAGE["addPost"] },
        });
        navigate("/");
      }
    } catch (error) {
      new Snackbar({
        target: $("#snackbar"),
        props: { message: ERROR_MESSAGE["addPost"] },
      });
    }
  }

  async getRandomImage() {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_KEY}`,
      { method: "GET" }
    );
    const {
      urls: { regular },
    } = await response.json();

    this.imageUrl = regular;

    $(".btn-upload-image").disabled = true;
  }
}

export default PostAddForm;
