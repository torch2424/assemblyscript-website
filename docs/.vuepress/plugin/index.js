const http = require('https')
const fs = require('fs')

module.exports = (options, ctx) => {

  // Update sponsors and backers data from OpenCollective
  http.get("https://opencollective.com/assemblyscript/members/all.json", response => {
    const file = fs.createWriteStream(__dirname + '/../sponsors.json')
    file.on('finish', () => {
      file.close()
    })
    response.pipe(file)
  })

  return {}
}
