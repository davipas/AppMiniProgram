Component({
  mixins: [],
  data: {},
  props: {
    onHandleClick: () => {},
    onShowImageModal: () => {}
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    handleClick(e) {
      const href = e.currentTarget.dataset.href;
      this.props.onHandleClick(href)
    },
    showImageModal(e) {
      const clickedImage = e.currentTarget.dataset.image;
      console.log(clickedImage);
      this.props.onShowImageModal(clickedImage)
    }
  },
});