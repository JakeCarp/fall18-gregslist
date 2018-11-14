import AutosController from "./components/autos/autos-controller.js";
import HouseController from "./components/houses/HousesController.js";
import JobController from "./components/jobs/JobsController.js";

class App {
  constructor() {
    this.controllers = {
      autosController: new AutosController(),
      houseController: new HouseController(),
      jobController: new JobController()
    }
  }
}


window.app = new App()
