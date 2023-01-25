import Component from "../../core/Component.js";
import { $ } from "../../utils/dom.js";
import { navigate } from "../../router.js";

class Header extends Component {
  template() {
    return `${
      this.props.isMain
        ? ""
        : `<a href="javascript:void(0)" id="btn-back">
            <img 
                id="back-icon"
                src="https://hpny-1.s3.ap-northeast-2.amazonaws.com/icon_chevron_left.svg"
            />
        </a>`
    }
        <a href="javascript:void(0)" id="logo">
            <strong>HPNY 2023</strong>
        </a>`;
  }

  event() {
    $("#logo").addEventListener("click", () => {
      navigate("/");
    });

    if (this.props.isMain) return;

    $("#btn-back")?.addEventListener("click", () => {
      history.go(-1);
    });
  }
}

export default Header;
