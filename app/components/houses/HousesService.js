import House from "../../models/house.js";




let _api = axios.create({
  baseURL: "https://bcw-gregslist.herokuapp.com/api/houses"
})


/**@type {Array<House>} */
let _houses = []

function handelError(err) {
  throw new Error(err)
}


export default class HouseService {
  constructor() {
  }
  destroyHouse(id, showHouses) {
    _api.delete(id)
      .then(res => {
        this.getHouses(showHouses)
      })
      .catch(handelError)
  }

  addHouse(formData, successFn) {
    if (!formData) {
      throw new Error("You must supply form data")
    }
    if (typeof successFn != 'function') {
      throw new Error("You must supply a success function")
    }


    _api.post('', formData)
      .then(res => {
        this.getHouses(successFn)
      })
      .catch(handelError)
  }

  getHouses(successFn) {

    if (typeof successFn != 'function') {
      throw new Error("you must supply a success function")
    }
    _api.get('')
      .then(res => {
        _houses = res.data.data.map(item => new House(item))
        successFn()
      })
      .catch(handelError)
  }


  get houses() {
    console.log("someone needs the houses")
    return _houses
  }

}