import HouseService from "./HousesService.js";


let _houseService = new HouseService()

export default class HouseController {
  constructor() {
    _houseService.getHouses(this.showHouses)
  }

  showHouses() {
    document.getElementById('main-bg').style.backgroundImage = "linear-gradient(to bottom, red, orange)"
    let houses = _houseService.houses
    let template = ""
    houses.forEach(house => {
      template += `
      <div class="col-sm-4 my-1">
        <div class="card">
          <img class="card-img-top" src="${house.imgUrl}">
          <div class="card-body">
            <h5 class="card-title">${house.bedrooms}-bed ${house.bathrooms}-bath /${house.price}</h5>
              <div class="card-text">
                <p>${house.levels} levels - built in ${house.year}</p>
                <p>${house.description}</p>
                <div>
                  <i class="fa fa-fw fa-trash action muted" onclick="app.controllers.houseController.destroyHouse('${house._id}')"></i>
                </div>
              </div>
          </div>
        </div>
      </div>
      `
    })
    document.getElementById('formBox').innerHTML = `
    <form onsubmit="app.controllers.houseController.addHouse(event)">
      <div class="form-group">
        <label for="bedrooms">Bedrooms</label>
        <input type="text" name="bedrooms" />
      </div>
       <div class="form-group">
        <label for="bathrooms">Bathrooms</label>
        <input type="text" name="bathrooms" />
      </div>
       <div class="form-group">
        <label for="imgUrl">Image</label>
        <input type="URL" name="imgUrl" />
      </div>
       <div class="form-group">
        <label for="levels">Levels</label>
        <input type="number" name="levels" />
      </div>
       <div class="form-group">
        <label for="price">Price</label>
        <input type="number" name="price" />
      </div>
       <div class="form-group">
        <label for="description">Description</label>
        <input type="text" name="description" />
      </div>
       <div class="form-group">
        <label for="year">Year</label>
        <input type="number" name="year" />
      </div>
      <button type="submit">Add House</button>
    </form>
    `
    document.getElementById('main-content').innerHTML = template
  }

  addHouse(event) {
    event.preventDefault()
    let form = event.target
    let formData = {
      bedrooms: form.bedrooms.value,
      bathrooms: form.bathrooms.value,
      imgUrl: form.imgUrl.value,
      levels: form.levels.value,
      year: form.year.value,
      price: form.price.value,
      description: form.description.value
    }
    _houseService.addHouse(formData, this.showHouses)
    form.reset()
  }

  destroyHouse(id) {
    _houseService.destroyHouse(id, this.showHouses)
  }

}