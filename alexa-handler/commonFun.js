// const AWS = require('aws-sdk');
const csv = require('csvtojson');
var path = require('path');
const moment = require('moment-timezone')

// const SESConfig = {
//   accessKeyId: process.env.AWS_ACCESS_KEY, 
//   secretAccessKey: process.env.AWS_SECRET_KEY
// }

// AWS.config.update(SESConfig);

// const S3 = new AWS.S3();

// const params = {
//   Bucket: process.env.S3_BUCKET,
//   Key: process.env.S3_KEY
// };

// const getEventsFromBucket = async () => {
//   try {
//     const stream = S3.getObject(params).createReadStream();
//     const json = await csv().fromStream(stream);
//     console.log("JSON FILE: " + JSON.stringify(json));
//     return json;
//   }
//   catch(err){

//   }
// }

const getEventFromLocal = async () => {
  try {
    let csvFilePath = path.join(__dirname, 'hindoo_events.csv');
    const jsonArray = await csv().fromFile(csvFilePath);
    return jsonArray;
  }
  catch (err) {
    console.log('err', err);
  }
}

const getValueBySlot = (slot) => {
  let value = slot && slot.resolutions && slot.resolutions.resolutionsPerAuthority &&
    slot.resolutions.resolutionsPerAuthority[0] && slot.resolutions.resolutionsPerAuthority[0].values
    && slot.resolutions.resolutionsPerAuthority[0].values[0] && slot.resolutions.resolutionsPerAuthority[0].values[0].value
    && slot.resolutions.resolutionsPerAuthority[0].values[0].value.name
  return value
}

// const  generateDateString = (date) => {
//   let curDate = moment();
//   let givenDate = moment(date, "DD-MM-YYYY")
//   let years = curDate.diff(givenDate, 'year');
//   let months = curDate.diff(givenDate, 'months');
//   let days = curDate.diff(givenDate, 'days');
//   let hours = curDate.diff(givenDate, 'hours');
//   let minutes = curDate.diff(givenDate, 'minutes');
//   let seconds = curDate.diff(givenDate, 'seconds');
//   console.log(years + ' years ' + months + ' months ' + days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds');

//   let dateStr = '';

//   if(years) dateStr = `${years} year ago`;
//   else if(months) dateStr = `${months} months ago`;
//   else if(days) dateStr = `${days} days ago`;
//   else if(hours) dateStr = `${hours} hours ago`;
//   else if(minutes) dateStr = `${minutes} minutes ago`;
//   else if(seconds) dateStr = `${seconds} seconds ago`

//   return dateStr;
// }

module.exports = {
  getValueBySlot,
  // getEventsFromBucket,
  getEventFromLocal,
  // generateDateString
}

