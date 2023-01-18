import Component from "../../core/Component.js";
import { $ } from "../../utils/dom.js";
import { navigate } from "../../router.js";

class PostForm extends Component {
  template() {
    const { postId, image, title, content } = this.props.post;

    return `
        <form class="post-form">
            <img src="${image}" width="200px"/>
            <label for="form-title">제목</label>
           <input 
                id="form-title"
                name="title"
                ${title ? `placeholder="${title}"` : ""} 
                ${title ? `value="${title}"` : ""}
            />
            <label for="form-content">내용</label>
            <textarea
                id="form-content"
                name="content"
                row="6"
                ${content ? `placeholder="${content}"` : ""} 
            >${content}</textarea>
            <button type="submit"/>
        </form>
     `;
  }

  render() {
    this.$target.insertAdjacentHTML("afterbegin", this.template());
  }

  event() {
    const { postId, image } = this.props.post;

    const postElement = $(`.post-form`);

    postElement.addEventListener("submit", async (e) => {
      e.preventDefault();

      const inputValue = $(`.post-form > input`).value;
      const textareaValue = $(`.post-form > textarea`).value;

      try {
        const response = await fetch(`http://43.201.103.199/post/${postId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image,
            title: inputValue,
            content: textareaValue,
          }),
        });

        const { code: statusCode } = await response.json();

        if (statusCode === 200) {
          navigate(`/post/${postId}`);
        }
      } catch (error) {
        console.dir(error);
      }
    });
  }
}

export default PostForm;
