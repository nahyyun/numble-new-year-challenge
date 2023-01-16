import Component from "../../core/Component.js";
import Comment from "./Comment.js";
import { $ } from "../../utils/dom.js";

class CommentList extends Component {
  template() {
    return `<ul class="comment-list"></ul>`;
  }

  async mounted() {
    this.props.comments.forEach(
      (comment) =>
        new Comment({
          target: $(".comment-list"),
          props: { comment },
        })
    );
  }
}

export default CommentList;
