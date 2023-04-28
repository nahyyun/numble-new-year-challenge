import Component from "../../core/Component";
import Button from "../Common/Button";
import Snackbar from "../Common/Snackbar";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/message";
import { $ } from "../../utils/dom";
import { navigate } from "../../router";
import fetchAPI from "../../api/index";
import { isValidForm } from "../../utils/validForm";
import { addFormSubmitType } from "../../types";
import { fetchRandomImage } from "../../api/unsplash";

class PostAddForm extends Component {
  imageUrl: string = "";

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

    const postAddForm = document.forms.namedItem(
      "postAddForm"
    ) as HTMLFormElement;

    new Button({
      target: $(".post-add-form-container"),
      position: "afterbegin",
      type: "button",
      className: "btn-upload-image",
      text: "랜덤 이미지 추가하기",
      handleClick: () => this.getRandomImage(),
    });

    new Button({
      target: postAddForm,
      position: "beforeend",
      type: "submit",
      className: "btn-add-post",
      text: "작성 완료",
    });
  }

  event() {
    const postAddForm = document.forms.namedItem(
      "postAddForm"
    ) as HTMLFormElement;

    postAddForm.addEventListener("submit", (e) => {
      e.preventDefault();

      this.submitHandler(postAddForm);
    });
  }

  submitHandler(postAddForm: HTMLFormElement) {
    const formTitle = postAddForm.elements.namedItem(
      "formTitle"
    ) as HTMLFormElement;
    const formContent = postAddForm.elements.namedItem(
      "formContent"
    ) as HTMLFormElement;

    const formValue: addFormSubmitType = {
      image: this.imageUrl,
      title: formTitle.value,
      content: formContent.value,
    };

    if (isValidForm(formValue)) {
      return this.addPost(formValue);
    }

    new Snackbar({
      target: $("#snackbar"),
      message: ERROR_MESSAGE["invalidForm"],
    });
  }

  async addPost({ ...addPostData }: addFormSubmitType) {
    try {
      const { code } = await fetchAPI.POST(`post`, {
        ...addPostData,
      });

      if (code === 201) {
        new Snackbar({
          target: $("#snackbar"),
          message: SUCCESS_MESSAGE["addPost"],
        });
        navigate("/");
      }
    } catch (error) {
      new Snackbar({
        target: $("#snackbar"),
        message: ERROR_MESSAGE["addPost"],
      });
    }
  }

  async getRandomImage() {
    const regular = await fetchRandomImage();
    this.imageUrl = regular;

    ($(".btn-upload-image") as HTMLButtonElement).disabled = true;
  }
}

export default PostAddForm;
