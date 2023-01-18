import Component from "../../core/Component.js";
import Button from "../Common/Button.js";
import { $ } from "../../utils/dom.js";
import { navigate } from "../../router.js";

class PostDetail extends Component {
  init() {
    this.state = { detailInfo: this.props.detailInfo };
  }

  template() {
    if (!this.state) return;

    const { title, content, image, updatedAt } = this.state.detailInfo;
    const [updateDate] = updatedAt.split("T");

    return `
        <div class="post-image">
            <img src="${image}" width="200px"/>
        </div>
        <strong>${title}</strong>
        <span>${updateDate}</span>
        <span>${content}</span>
        <div class="btns-post-detail"></div>
     `;
  }

  render() {
    this.$target.insertAdjacentHTML("afterbegin", this.template());
    this.mounted();
  }

  mounted() {
    const { postId, title, content, image } = this.state.detailInfo;

    new Button({
      target: $(".btns-post-detail"),
      props: {
        type: "button",
        text: "수정",
        className: "btn-post-edit",
        handleClick: () => {
          navigate(`/edit/${postId}`, {
            detailInfo: this.state.detailInfo,
          });
        },
      },
    });
    new Button({
      target: $(".btns-post-detail"),
      props: {
        type: "button",
        text: "삭제",
        className: "btn-post-delete",
        handleClick: () => {
          navigate("/");
        },
      },
    });
  }

  event() {}
}

export default PostDetail;
