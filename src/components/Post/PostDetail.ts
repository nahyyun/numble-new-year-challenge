import Component from "../../core/Component";
import Button from "../Common/Button";
import Snackbar from "../Common/Snackbar";
import { $ } from "../../utils/dom";
import { navigate } from "../../router";
import fetchAPI from "../../api/index";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/message";
import { Post } from "../../types/index";

interface PostDetailProps {
  detailInfo: Post;
}

class PostDetail extends Component<PostDetailProps> {
  template() {
    const { title, content, image, updatedAt } = this.props.detailInfo;

    const [updateDate] = updatedAt.toString().split("T");

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
      position: "beforeend",
      type: "button",
      className: "btn-post-edit",
      text: "수정 📝",
      handleClick: () => this.goToEditPage(postId),
    });

    new Button({
      target: $(".btns-post-detail"),
      position: "beforeend",
      type: "button",
      className: "btn-post-delete",
      text: "삭제 🗑",
      handleClick: () => this.deletePost(postId),
    });
  }

  goToEditPage(postId: number) {
    navigate(`/edit/${postId}`, this.props.detailInfo);
  }

  async deletePost(postId: number) {
    const { code } = await fetchAPI.DELETE(`post/${postId}`);

    if (code === 200) {
      new Snackbar({
        target: $("#snackbar"),
        message: SUCCESS_MESSAGE["deletePost"],
      });
      return navigate("/");
    }

    new Snackbar({
      target: $("#snackbar"),
      message: ERROR_MESSAGE["deletePost"],
    });
  }
}

export default PostDetail;
