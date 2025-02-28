Component({
  mixins: [],
  data: {
    filePath: "",
    errorName: "",
    errorDescription: "",
    place: null
  },
  props: {
    onHandleClose: () => {},
    onCreateOrEditPlace: () => {},
    place: {}
  },
  didMount() {
    if (this.props.place) {
      this.setData({
        place: this.props.place
      })
    }
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    selectImage() {
      my.chooseImage({
        success: (res) => {
          this.setData({
            filePath: res.apFilePaths[0]
          });
        }
      });
    },
    onHandleClose() {
      this.props.onHandleClose();
    },
    validateForm(name, description) {
      let hasError = false;

      if (name === "") {
        this.setData({
          errorName: "Debe introducir un nombre"
        });
        hasError = true;
      } else {
        this.setData({
          errorName: ""
        });
      }

      if (description === "") {
        this.setData({
          errorDescription: "Debe introducir una descripción"
        });
        hasError = true;
      } else {
        this.setData({
          errorDescription: ""
        });
      }
      return hasError;
    },

    generateUniqueId() {
      return Date.now() + "-" + Math.floor(Math.random() * 1000);
    },

    formSubmit(e) {
      const {
        name,
        description,
        checkbox
      } = e.detail.value;
      let id;
      if (this.validateForm(name, description)) {
        return;
      }
      const visited = Array.isArray(checkbox) && checkbox.length > 0;
      if (this.data.place) {
        id = this.data.place.id
      } else {
        id = this.generateUniqueId()
      }
      const createdOrEditedPlace = {
        id: id,
        name,
        description,
        image: this.data.filePath ? this.data.filePath : this.data.place ? this.data.place.image : "",
        visited
      };
      this.props.onCreateOrEditPlace(createdOrEditedPlace);
      this.resetForm();
      this.props.onHandleClose();
    },

    resetForm() {
      this.setData({
        filePath: "",
        errorName: "",
        errorDescription: "",
        place: null,
      });
    }
  }
});