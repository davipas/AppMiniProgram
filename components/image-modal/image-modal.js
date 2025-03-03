Component({
  mixins: [],
  data: {
    clickedImage: "/assets/imgs/default.jpg/"
  },
  props: {
    onCloseImageModal: () => {},
    clickedImage: "",
  },
  didMount() {
    this.setData({
      clickedImage: this.props.clickedImage
    })
    console.log(this.data.clickedImage)
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    onCloseImageModal() {
      this.props.onCloseImageModal();
    }
  },
});