import Job from "../../models/job.js";



let _api = axios.create({
  baseURL: "https://bcw-gregslist.herokuapp.com/api/jobs"
})


/**@type {Array<Job>} */
let _jobs = []

function handleError(err) {
  throw new Error(err)
}


export default class JobService {

  destroyJob(id, showJobs) {
    _api.delete(id)
      .then(res => {
        this.getJobs(showJobs)
      })
      .catch(handleError)
  }

  addJob(formData, successFn) {
    if (!formData) {
      throw new Error("You must supply form data")
    }
    if (typeof successFn != 'function') {
      throw new Error("You must supply a success function")
    }

    _api.post('', formData)
      .then(res => {
        this.getJobs(successFn)
      })
      .catch(handleError)
  }

  getJobs(successFn) {
    if (typeof successFn != 'function') {
      throw new Error("You must supply a success function")
    }

    _api.get('')
      .then(res => {
        _jobs = res.data.data.map(item => new Job(item))
        successFn()
      })
      .catch(handleError)
  }


  get jobs() {
    console.log("someone needs the jobs")
    return _jobs
  }
}