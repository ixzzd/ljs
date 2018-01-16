import { observable, action, computed } from "mobx";
import axios from "axios";

export default class AppState {
  @observable models;
  @observable cities;
  @observable partners;
  @observable city;
  @observable model;
  @observable modelsSwipeEnabled;
  @observable search;

  constructor() {
    this.models = [];
    this.cities = [];
    this.partners = [];
    this.city = 'moscow';
    this.model = '';
    this.modelsSwipeEnabled = true;
  }

  loadData() {
    // if (localStorage.getItem('Data')) {
      // this.setData(JSON.parse(localStorage.getItem('Data')));
    // } else {
      this.fetchData()
    // }
  }

  async fetchData() {
    let { data } = await axios.get(
      `http://lumpen.agency/data.json`
    );
    this.setData(data);
    localStorage.setItem('Data', JSON.stringify(data));
  }

  @action setData(data) {
    this.models = data.models;
    this.cities = data.cities;
    this.partners = data.partners;
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

  @action setModelByIndex(index) {
    if (!this.modelsSwipeEnabled) return;
    this.model = this.filteredModels[index].name
    window.history.pushState(null, null, this.model);
  }

  @action nextModel() {
    var nextIndex = this.modelIndex + 1
    if (nextIndex >= this.filteredModels.length) {
      nextIndex = 0
    }
    this.setModelByIndex(nextIndex);
  }

  @action prevModel() {
    var prevIndex = this.modelIndex - 1
    if (prevIndex < 0) {
      prevIndex = this.filteredModels.length - 1
    }
    this.setModelByIndex(prevIndex);
  }

  @computed get filteredModels() {
    return this.models.filter(model =>
              this.modelInCity(model, this.city)
              && this.searchMatched(model)
            ).sort(this.sortBySexAndPosition)
  }

  @computed get currentModel() {
    if (this.modelIndex >= 0) {
      return this.filteredModels[this.modelIndex]
    }
    else {
      return null
    }
  }

  @computed get sex() {
    if (this.currentModel) {
      return this.currentModel.sex
    }
    else {
      return 'men'
    }
  }

  sortBySexAndPosition(a, b) {
    if (a.sex == b.sex) {
      return a.position - b.position
    }
    else if(a.sex == 'men'){
      return -1
    }
    else{
      return 1
    }
  }

  searchMatched(model) {
    if (!this.search) {
      return true
    }
    else {
      return model.name.toUpperCase().includes(this.search.toUpperCase())
    }
  }

  modelInCity(model, city){
    return model.cities.map(city => (city.name)).includes(city)
  }

  @computed get modelIndex() {
    return this.filteredModels.findIndex(m => m.name.toUpperCase() == this.model.toUpperCase())
  }

  @action enableModelsSwipe() {
    this.modelsSwipeEnabled = true
  }

  @action disableModelsSwipe() {
    this.modelsSwipeEnabled = false
  }

  @action setSex(sex) {
    this.sex = sex
  }

  @computed get displayedCities() {
    var cities = this.cities.filter(city =>
                                this.models.filter(model => this.modelInCity(model, city.name)).length > 0
                            )
                            .sort((a, b) => a.position - b.position)
                            .map(city => (city.name.toUpperCase()))

    return cities
    // .splice(cities.indexOf(this.city), 1);
  }
}
