import { observable, action, computed } from "mobx";
import axios from "axios";

export default class AppState {
  @observable cities = [];
  @observable partners = [];
  @observable models = [];
  @observable city = 'all';
  @observable sex = 'all';
  @observable model = '';
  @observable search = '';

  @action fetchData() {
    this.models = [];
    this.cities = [];
    this.partners = [];
    axios.get(
      `https://api.lumpen.agency/data.json`
    ).then(
      data => {
        console.log("data fetched");
        this.models = data.data.models;
        this.cities = data.data.cities;
        this.partners = data.data.partners;
      },
      error => {
        console.log(error);
      }
    )
  }

  @action setCity(city) {
    this.city = city.toLowerCase()
  }

  @action setSearch(searchString) {
    this.search = searchString
  }

  @action setModel(model) {
    this.model = model.toLowerCase()
  }

  @action setSex(sex) {
    this.sex = sex.toLowerCase();
  }

  @action setModelByIndex(index) {
    if (this.filteredModels[index]) {
      this.model = this.filteredModels[index].name;
      window.history.pushState(null, null, this.model.toLowerCase());
    }
  }

  @action nextModel() {
    var nextIndex = this.currentModelIndex + 1
    if (!this.filteredModels[nextIndex]) {
      nextIndex = this.currentModelIndex;
    }
    this.setModelByIndex(nextIndex);
  }

  @action prevModel() {
    var prevIndex = this.currentModelIndex - 1
    if (prevIndex < 0) {
      prevIndex = this.filteredModels.length - 1
    }
    this.setModelByIndex(prevIndex);
  }

  @computed get filteredModels() {
    return this.models.filter(model =>
              this.cityMatched(model)
              && this.sexMatched(model)
              && this.searchMatched(model)
              && model.face
            ).sort(this.sortByPosition)
  }

  @computed get currentModel() {
    if (this.currentModelIndex >= 0) {
      return this.filteredModels[this.currentModelIndex]
    }
    else {
      return null
    }
  }

  sortByPosition(a, b) {
      return a.position - b.position
  }

  sexMatched(model) {
    if (this.sex == 'all') {
      return true
    }
    else {
      return model.sex == this.sex
    }
  }

  cityMatched(model) {
    if (this.city == 'all') {
      return true
    }
    else {
      return model.cities.map(city => (city.name)).includes(this.city)
    }
  }

  searchMatched(model) {
    if (!this.search) {
      return true
    }
    else {
      return model.name.toUpperCase().includes(this.search.toUpperCase())
        || model.height && model.height.toString().includes(this.search)

    }
  }

  modelInCity(model, city){
    return model.cities.map(city => (city.name)).includes(city)
  }

  @computed get currentModelIndex() {
    return this.filteredModels.findIndex(m => m.name.toUpperCase() == this.model.toUpperCase())
  }

  @computed get displayedCities() {
    var cities = this.cities.filter(city =>
                                this.models.filter(model => this.modelInCity(model, city.name)).length > 0
                            )
                            .sort((a, b) => a.position - b.position)
                            .map(city => (city.name.toUpperCase()))

    return ['ALL'].concat(cities);
    // .splice(cities.indexOf(this.city), 1);
  }
}
