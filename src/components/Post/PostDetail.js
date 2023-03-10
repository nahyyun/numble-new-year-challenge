import Component from "../../core/Component.js";
import Button from "../Common/Button.js";
import Snackbar from "../Common/Snackbar.js";
import { $ } from "../../utils/dom.js";
import { navigate } from "../../router.js";
import fetchAPI from "../../api/index.js";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/message.js";

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
            <img src="${image}" width="200px" alt="random image"/>
        </div>
        <strong>${title}</strong>
        <span class="date">${updateDate}</span>
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
        text: "수정 📝",
        handleClick: () => this.goToEditPage(postId),
      },
    });

    new Button({
      target: $(".btns-post-detail"),
      props: {
        position: "beforeend",
        type: "button",
        className: "btn-post-delete",
        text: "삭제 🗑",
        handleClick: () => this.deletePost(postId),
      },
    });
  }

  goToEditPage(postId) {
    navigate(`/edit/${postId}`, this.props.detailInfo);
  }

  async deletePost(postId) {
    const { code } = await fetchAPI.DELETE(`post/${postId}`);

    if (code === 200) {
      new Snackbar({
        target: $("#snackbar"),
        props: { message: SUCCESS_MESSAGE["deletePost"] },
      });
      return navigate("/");
    }

    new Snackbar({
      target: $("#snackbar"),
      props: { message: ERROR_MESSAGE["deletePost"] },
    });
  }
}

export default PostDetail;
