import { observable, action, computed } from "mobx";
import axios from "axios";

export default class AppState {
  @observable models;
  @observable cities;
  @observable partners;
  @observable city;
  @observable model;
  @observable modelsSwipeEnabled;
  @observable sex;

  constructor() {
    this.models = [];
    this.cities = [];
    this.partners = [];
    this.city = 'moscow';
    this.model = '';
    this.modelsSwipeEnabled = true;
    this.sex = 'men';
  }

  async fetchData() {
    let { data } = await axios.get(
      `http://lumpen.agency/data.json`
    );
    this.setData(data);
  }

  @action setData(data) {
    this.models = data.models;
    this.cities = data.cities;
    this.partners = data.partners;
  }

  @action setCity(city) {
    this.city = city
  }

  @action setModel(model) {
    this.model = model
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
    return this.models.filter(
      model =>
        model.city && model.city.toUpperCase() == this.city.toUpperCase()
          && model.sex == this.sex
    )
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

  @action changeSex() {
    // console.log(this.sex);
    this.sex = this.sex == 'men' ? 'women' : 'men'
  }
}
