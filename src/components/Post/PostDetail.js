import Component from "../../core/Component.js";
import Button from "../Common/Button.js";
import { $ } from "../../utils/dom.js";
import { navigate } from "../../router.js";
import fetchAPI from "../../api/index.js";

class PostDetail extends Component {
  template() {
    const {
      title = "",
      content = "",
      image = "",
      updatedAt = "",
    } = this.props.detailInfo;

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

    const { postId } = this.props.detailInfo;

    new Button({
      target: $(".btns-post-detail"),
      props: {
        position: "beforeend",
        type: "button",
        className: "btn-post-edit",
        text: "수정",
        handleClick: () => this.goToEditPage(postId),
      },
    });

    new Button({
      target: $(".btns-post-detail"),
      props: {
        position: "beforeend",
        type: "button",
        className: "btn-post-delete",
        text: "삭제",
        handleClick: () => this.deletePost(postId),
      },
    });
  }

  goToEditPage(postId) {
    navigate(`/edit/${postId}`, {
      detailInfo: this.props.detailInfo,
    });
  }

  async deletePost(postId) {
    const { code } = await fetchAPI.DELETE(`post/${postId}`);

    if (code === 200) {
      navigate("/");
    }
  }
}

export default PostDetail;
