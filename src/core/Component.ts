class Component<Props = {}, State = {}> {
  state = {} as State;
  readonly $target: HTMLElement;
  readonly props;

  constructor({
    target,
    ...rest
  }: { target: HTMLElement } & Omit<Props, "target">) {
    if (!new.target) throw new Error("invalid component");

    this.$target = target;
    this.props = rest;

    this.init();
    this.render();
    this.mounted();
    this.event();
  }

  init() {}

  template() {
    return "";
  }

  mounted() {}

  render() {
    this.$target.innerHTML = this.template();
  }

  event() {}

  setState(newState: State) {
    if (this.isSameState(newState)) return;

    this.state = newState;
    this.render();
  }

  isSameState(newState: State) {
    return JSON.stringify(this.state) === JSON.stringify(newState);
  }
}

export default Component;
