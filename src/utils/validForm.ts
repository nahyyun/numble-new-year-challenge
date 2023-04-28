export const isValidForm = <T>(formValue: T) => {
  let key: keyof typeof formValue;

  for (key in formValue) {
    if (formValue[key]) return true;

    return false;
  }
};
