import Component from "../core/Component.js";
import { $ } from "../utils/dom.js";

class PostItem extends Component {
  init() {
    this.state = { post: this.props };
    console.log(this.state);
  }

  template() {
    const { title, content } = this.state.post;
    return `
        <li class="post">
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

  event() {}
}

export default PostItem;
