import JobService from "./JobsService.js";



let _jobService = new JobService()

export default class JobController {
  constructor() {
    _jobService.getJobs(this.showJobs)
  }
  changeBg() {
    document.getElementById('main-bg').style.backgroundImage = "linear-gradient(to bottom,  rgb(187, 8, 187), yellow)"
  }

  showJobs() {
    let jobs = _jobService.jobs
    let template = ""
    jobs.forEach(job => {
      template += `
       <div class="col-sm-4 my-1 card">
          <div class="">
            <div class="card-body">
              <h5 class="card-title">${job.jobTitle} - ${job.company} ${job.hours}</h5>
              <div class="card-text">
                <p>Pay(per Hour): ${job.rate}</p>
                <p>${job.description}</p>
                <div>
                  <i class="fa fa-fw fa-trash action muted" onclick="app.controllers.jobController.destroyJob('${job._id}')"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    })
    document.getElementById('formBox').innerHTML = `
     <form onsubmit="app.controllers.jobController.addJob(event)">
      <div class="form-group">
        <label for="jobTitle">Job Title</label>
        <input type="text" name="jobTitle" />
      </div>
      <div class="form-group">
        <label for="company">Company:</label>
        <input type="text" name="company" />
      </div>
      <div class="form-group">
        <label for="hours">Hours(per week):</label>
        <input type="number" name="hours" />
      </div>
      <div class="form-group">
        <label for="rate">Rate(per hour):</label>
        <input type="number" name="rate" />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea type="text" name="description"></textarea>
      </div>
      <button type="submit">Add Job</button>
    </form>
    `
    document.getElementById('main-content').innerHTML = template
  }

  addJob(event) {
    event.preventDefault()
    let form = event.target
    let formData = {
      jobTitle: form.jobTitle.value,
      company: form.company.value,
      hours: form.hours.value,
      rate: form.rate.value,
      description: form.description.value
    }
    _jobService.addJob(formData, this.showJobs)
    form.reset()
  }

  destroyJob(id) {
    _jobService.destroyJob(id, this.showJobs)
  }
}