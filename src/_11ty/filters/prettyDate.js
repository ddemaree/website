const _ = require('lodash')
const { DateTime } = require('luxon')

module.exports = date => {
  let dateObj;

  if(date instanceof DateTime) {
    dateObj = date;
  }
  else if(date instanceof Date) {
    dateObj = DateTime.fromJSDate(date)
  }
  else if(_.isString(date)) {
    dateObj = DateTime.fromISO(date)
  }
  else {
    return `Invalid date ${date}`
  }

  return dateObj.toLocaleString(DateTime.DATE_FULL).replace(',', '')
}