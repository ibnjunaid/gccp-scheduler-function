const scheduler = require('@google-cloud/scheduler');

const client = new scheduler.CloudSchedulerClient();

const PROJECT_ID = process.env.PROJECT_ID;
const LOCATION = process.env.LOCATION;
const TOPIC_NAME = process.env.TOPIC_NAME

/**
  *
  * main() will be run when you invoke this action
  *
  * @param {Object} params Functions actions accept a single parameter, which must be a JSON object.
  * @param {string} params.sheetId  sheetId for specific sheetId
  * @param {string} params.instituteId  Institute Id for the institution
  * @param {string} params.instituteName Name of the institute
  * @param {string} params.token Name of the institute
  * @return The output of this action, which must be a JSON object.
  *
*/
function Schedule(params) {
    const parent = client.locationPath(PROJECT_ID, LOCATION);
    const minute = getRandom(0, 50);

    const cron_pattern = `${minute} */2 * * *`;

    /**@type {scheduler.protos.google.cloud.scheduler.v1.IJob} */
    const job = {
        pubsubTarget: {
            topicName: TOPIC_NAME,
            data: Buffer.from(JSON.stringify(params))
        },
        name: `projects/${PROJECT_ID}/locations/${LOCATION}/jobs/schedule-${params.instituteId}-${minute}`,
        schedule: cron_pattern
    }

    return client.createJob({
        parent: parent,
        job: job
    })
}

function getRandom(min, max) {
    const floatRandom = Math.random()
    const difference = max - min
    const random = Math.round(difference * floatRandom)
    const randomWithinRange = random + min
    return randomWithinRange
}

module.exports = Schedule;