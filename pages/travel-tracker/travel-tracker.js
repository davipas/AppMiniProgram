Page({
  data: {
    showModal: false,
    placesList: [],
    selectedPlace: {}
  },
  onOpenAddNewPlace() {
    this.setData({
      showModal: true,
      selectedPlace: null
    })
  },
  onCloseModal() {
    this.setData({
      showModal: false
    })
  },
  onLoad() {
    this.loadPlaces();
  },
  onSelectPlace(e) {
    this.setData({
      selectedPlace: e.currentTarget.dataset.place,
      showModal: true
    })
  },
  onToggleVisited(e) {
    const id = e.currentTarget.dataset.id;
    const placesArray = this.data.placesList.map(place => {
      if (place.id === id) {
        return {
          ...place,
          visited: !place.visited
        };
      }
      return place;
    });
    this.savePlaces(placesArray);
  },
  onDeletePlace(e) {
    my.confirm({
      title: 'Eliminar lugar',
      content: 'Estas seguro de eliminar este lugar?',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Salir',
      success: (result) => {
        if (result.confirm) {
          const id = e.currentTarget.dataset.id;
          const placesArray = this.data.placesList.filter(place => place.id !== id);
          this.savePlaces(placesArray);
        }
      },
    });
  },
  onCreateOrEditPlace(createdOrEditedPlace) {
    let placesArray = [...this.data.placesList];
    const existingPlace = placesArray.find(place => place.id === createdOrEditedPlace.id)
    if (!existingPlace) {
      placesArray.push(createdOrEditedPlace)
    } else {
      placesArray = placesArray.map(place => {
        if (place.id === createdOrEditedPlace.id) {
          return {
            ...createdOrEditedPlace
          };
        }
        return place;
      });
    }
    this.savePlaces(placesArray);
  },
  savePlaces(placesArray) {
    my.setStorageSync({
      key: 'places',
      data: JSON.stringify(placesArray)
    });
    this.setData({
      placesList: placesArray.reverse()
    });
  },
  loadPlaces() {
    const placesStorage = my.getStorageSync({
      key: 'places'
    }).data;
    let placesArray = [];
    if (placesStorage) {
      try {
        placesArray = JSON.parse(placesStorage).reverse();
      } catch (error) {
        console.error("Error al parsear datos:", error);
      }
    }
    this.setData({
      placesList: placesArray
    });
  },
});