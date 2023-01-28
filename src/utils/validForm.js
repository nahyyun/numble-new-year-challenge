import { ERROR_MESSAGE } from "./message.js";
import Snackbar from "../components/Common/Snackbar.js";
import { $ } from "./dom.js";

export const isValidForm = (formValue) => {
  for (let key in formValue) {
    if (!formValue[key]) {
      new Snackbar({
        target: $("#snackbar"),
        props: { message: ERROR_MESSAGE[key] },
      });

      return false;
    }
  }
  return true;
};
