const express = require('express');
const jobRouter = express.Router();
const {getAllJobs, getJob, createJob, updateJob, deleteJob} = require('../controllers/jobs')

jobRouter.route('/').post(createJob).get(getAllJobs);
jobRouter.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)

module.exports = jobRouter;

