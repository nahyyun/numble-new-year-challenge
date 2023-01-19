import Component from "../../core/Component.js";
import Button from "../Common/Button.js";
import { $ } from "../../utils/dom.js";
import { navigate } from "../../router.js";
import fetchAPI from "../../api/index.js";

class PostAddForm extends Component {
  template() {
    return `
        <form id="postAddForm">
            <img id="image" hidden/>
            <label for="form-title">제목</label>
            <input
                id="formTitle"
                required
                placeholder="제목을 입력하세요."
            />
            <label for="form-content">내용</label>
            <textarea
                id="formContent"
                row="6"
                required
                placeholder="내용을 입력하세요."
            ></textarea>
        </form>
     `;
  }

  render() {
    this.$target.insertAdjacentHTML("afterbegin", this.template());
    this.mounted();
  }

  mounted() {
    const postAddForm = document.forms.postAddForm;

    new Button({
      target: $(".post-add-form-container"),
      props: {
        position: "afterbegin",
        type: "button",
        className: "btn-upload-image",
        text: "랜덤 이미지 추가하기",
        handleClick: () => this.getRandomImage(postAddForm),
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

    postAddForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      this.addPost(postAddForm);
    });
  }

  async addPost(formElement) {
    try {
      const { code } = await fetchAPI.POST(`post`, {
        image: formElement.image.src,
        title: formElement.formTitle.value,
        content: formElement.formContent.value,
      });

      if (code === 200 || code === 201) {
        navigate("/");
      }
    } catch (error) {
      console.dir(error);
    }
  }

  async getRandomImage(formElement) {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_KEY}`,
      { method: "GET" }
    );
    const {
      urls: { regular },
    } = await response.json();

    formElement.image.src = regular;

    $(".btn-upload-image").disabled = true;
  }
}

export default PostAddForm;
