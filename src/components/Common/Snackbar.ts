import Component from "../../core/Component";
import { createDom } from "../../utils/dom";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../utils/message";

interface SnackbarState {
  snackbar: Node;
}

interface SnackbarProps {
  message:
    | (typeof ERROR_MESSAGE)[keyof typeof ERROR_MESSAGE]
    | (typeof SUCCESS_MESSAGE)[keyof typeof SUCCESS_MESSAGE];
}

class Snackbar extends Component<SnackbarProps, SnackbarState> {
  render() {
    if (this.isChidrenCountMax()) return;

    const _snackbar = createDom(
      "div",
      createDom("span", this.props.message as string)
    );
    this.state.snackbar = _snackbar;

    this.$target.append(this.state.snackbar);
  }

  mounted() {
    this.state.snackbar &&
      setTimeout(() => this.$target.removeChild(this.state.snackbar), 3000);
  }

  isChidrenCountMax() {
    return this.$target.children.length > 2;
  }
}

export default Snackbar;
