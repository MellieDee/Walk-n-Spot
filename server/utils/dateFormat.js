const dayjs = require('dayjs');
const localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

const dateFormat = date => {
  // let createdDate = dayjs(date).format('MMM D, YYYY at h:mm A ')

  // console.log(`
  // dateFormat 8
  // CreatedAt date: ${date}`)

  let createdDate = dayjs(date).format('LLLL')
  return createdDate;

}


module.exports = dateFormat