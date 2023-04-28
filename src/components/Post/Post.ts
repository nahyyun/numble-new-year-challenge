import Component from "../../core/Component";
import { $ } from "../../utils/dom";
import { navigate } from "../../router";
import { Post as PostType } from "../../types";

interface PostProps {
  post: PostType;
}

class Post extends Component<PostProps> {
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
