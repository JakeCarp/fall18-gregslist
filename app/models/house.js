export default class House {
  constructor(data) {
    if (!data.hasOwnProperty('_id') || !data.hasOwnProperty('bedrooms') || !data.hasOwnProperty('bathrooms') || !data.imgUrl || !data.levels || !data.year || !data.price) {
      throw new Error("Invalid Home Creation")
    }
    this._id = data._id
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.imgUrl = data.imgUrl
    this.levels = data.levels
    this.year = data.year
    this.price = data.price
    this.description = data.description || "No Description Found"
  }
}