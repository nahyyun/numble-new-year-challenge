import Component from "../../core/Component.js";
import { $ } from "../../utils/dom.js";
import { navigate } from "../../router.js";

class Post extends Component {
  template() {
    const { postId, image, title, content } = this.props.post;

    return `
        <li class="post post-${postId}">
            <img alt="random image" src=${image}/>
            <div>
                <strong>${title}</strong>
                <span>${content}</span>
            </div>
        </li>
     `;
  }

  render() {
    this.$target.insertAdjacentHTML("afterbegin", this.template());
  }

  event() {
    const { postId } = this.props.post;

    const postElement = $(`.post-${postId}`);

    postElement.addEventListener("click", () => {
      navigate(`/post/${postId}`);
    });
  }
}

export default Post;
