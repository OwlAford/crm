const fs = require('fs')

fs.readdir('./static', (err, files) => {
  let list = []
  files.forEach(filename => {
    if (filename.split('.')[1] === 'html') {
      list.push(filename)
    }
    console.log(filename)
  })
  fs.writeFileSync('./tests/list.json', JSON.stringify({ list }))
})