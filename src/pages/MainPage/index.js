import Component from "../../core/Component.js";
import PostList from "../../components/Post/PostList.js";
import { $ } from "../../utils/dom.js";

class MainPage extends Component {
  template() {
    return `<main>
        <div>
          <button class="btn-add-post">새 글 등록하기</button>
        <div>
        <section class="post-list-container"></section>
      </main>`;
  }

  mounted() {
    new PostList({ target: $(".post-list-container") });
  }

  event() {}
}

export default MainPage;
