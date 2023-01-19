import Component from "../../core/Component.js";
import Button from "../Common/Button.js";
import { $ } from "../../utils/dom.js";
import { navigate } from "../../router.js";
import { UNSPLASH_API_KEY } from "../../../apiKey.js";

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
    new Button({
      target: $(".post-add-form-container"),
      props: {
        position: "afterbegin",
        type: "click",
        className: "btn-upload-image",
        text: "랜덤 이미지 추가하기",
        handleClick: () => this.getRandomImage(),
      },
    });

    new Button({
      target: document.forms.postAddForm,
      props: {
        position: "beforeend",
        type: "click",
        className: "btn-add-post",
        text: "작성 완료",
      },
    });
  }

  event() {
    const formElement = document.forms.postAddForm;

    formElement.addEventListener("submit", async (e) => {
      e.preventDefault();

      try {
        const response = await fetch(`http://43.201.103.199/post`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: formElement.image.src,
            title: formElement.formTitle.value,
            content: formElement.formContent.value,
          }),
        });

        const { code: statusCode } = await response.json();

        if (statusCode === 200 || statusCode === 201) {
          navigate(`/`);
        }
      } catch (error) {
        console.dir(error);
      }
    });
  }

  async getRandomImage() {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_KEY}`,
      { method: "GET" }
    );
    const {
      urls: { regular },
    } = await response.json();

    const formElement = document.forms.postAddForm;
    formElement.image.src = regular;

    $(".btn-upload-image").disabled = true;
  }
}

export default PostAddForm;
