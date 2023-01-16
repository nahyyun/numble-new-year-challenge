import Component from "../../core/Component.js";
import { $ } from "../../utils/dom.js";
import { navigate } from "../../router.js";

class Post extends Component {
  init() {
    this.state = { post: this.props };
  }

  template() {
    const { postId, title, content } = this.state.post;
    return `
        <li data-id=${postId} class="post-${postId}">
            <div>
                <span>${title}</span>
            </div>
            <div>
                <span>${content}</span>
            </div>
        </li>
     `;
  }

  render() {
    this.$target.insertAdjacentHTML("afterend", this.template());
  }

  async mounted() {}

  event() {
    const { postId } = this.state.post;

    const postElement = $(`.post-${postId}`);

    postElement.addEventListener("click", (e) => {
      navigate(`posts/${postId}`);
    });
  }
}

export default Post;
