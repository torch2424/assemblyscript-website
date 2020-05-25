const http = require('https')
const fs = require('fs')

module.exports = (options, ctx) => {
  // Update sponsors and backers data from OpenCollective
  http.get("https://opencollective.com/assemblyscript/members/all.json", response => {
    const buf = []
    response.on('data', data => {
      buf.push(data)
    })
    response.on('end', () => {
      const members = JSON.parse(Buffer.concat(buf).toString())
      fs.readdir(__dirname + '/../public/sponsors', (err, files) => {
        const logos = {}
        files.forEach(file => {
          if (/\.(svg|png)$/.test(file)) {
            const id = file.substring(0, file.lastIndexOf('.'))
            logos[id] = 'sponsors/' + file
          }
        })
        fs.writeFileSync(__dirname + '/../sponsors.json', JSON.stringify({
          members,
          logos
        }))
      })
    })
  })

  return {}
}
