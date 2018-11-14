import AutosService from "./autos-service.js";

let _autosService = new AutosService()


export default class AutosController {

  constructor() {
    _autosService.getAutos(this.showAutos)
  }

  showAutos() {
    document.getElementById('main-bg').style.backgroundImage = "linear-gradient(to bottom, aqua, rgb(253, 87, 115))"
    console.log("autobots assemble")
    let autos = _autosService.autos
    let template = ""
    autos.forEach(auto => {
      template += `
        <div class="col-sm-4 my-1 card">
          <div class="">
            <img class="card-img-top" src="${auto.imgUrl}">
            <div class="card-body">
              <h5 class="card-title">${auto.make} - ${auto.model} ${auto.year}</h5>
              <div class="card-text">
                <p>Price: ${auto.price}</p>
                <p>${auto.description}</p>
                <div>
                  <i class="fa fa-fw fa-trash action muted" onclick="app.controllers.autosController.destroyAuto('${auto._id}')"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    })
    document.getElementById('formBox').innerHTML = `
    <form onsubmit="app.controllers.autosController.addAuto(event)">
      <div class="form-group">
        <label for="make">Make</label>
        <input type="text" name="make" />
      </div>
      <div class="form-group">
        <label for="model">Model:</label>
        <input type="text" name="model" />
      </div>
      <div class="form-group">
        <label for="year">Year:</label>
        <input type="number" name="year" />
      </div>
      <div class="form-group">
        <label for="PRICE">Price:</label>
        <input type="number" name="PRICE" />
      </div>
      <div class="form-group">
        <label for="imgUrl">Image:</label>
        <input type="url" name="imgUrl" />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea type="text" name="description"></textarea>
      </div>
      <button type="submit">Add Auto</button>
    </form>
    `
    document.getElementById('main-content').innerHTML = template
  }

  addAuto(event) {
    event.preventDefault(); //prevents the page from reloading
    let form = event.target // the element that triggers the event
    let formData = {
      make: form.make.value,
      model: form.model.value,
      year: form.year.value,
      price: form.PRICE.value,
      description: form.description.value,
      imgUrl: form.imgUrl.value
    }
    _autosService.addAuto(formData, this.showAutos)
    form.reset()
  }

  destroyAuto(id) {
    _autosService.destroyAuto(id, this.showAutos)
  }

}