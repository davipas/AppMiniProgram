Component({
  mixins: [],
  data: {},
  props: {
    onHandleClick: () => {},
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    handleClick(e) {
      const href = e.currentTarget.dataset.href;
      this.props.onHandleClick(href)
    }
  },
});