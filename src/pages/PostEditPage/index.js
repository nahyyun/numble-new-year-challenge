import Component from "../../core/Component.js";
import PostForm from "../../components/Post/PostForm.js";
import { $ } from "../../utils/dom.js";

class PostEditPage extends Component {
  template() {
    return `<main>
              <section class="post-edit-form"></section>
           </main>`;
  }

  async mounted() {
    if (this.state) return;

    const postId = location.pathname.split("/").pop();

    const response = await fetch(`http://43.201.103.199/post/${postId}`, {
      method: "GET",
    });

    const { data } = await response.json();
    this.setState({ post: data.post });

    new PostForm({
      target: $(".post-edit-form"),
      props: { post: this.state.post },
    });
  }
}

export default PostEditPage;
