const fs = require('fs')
const yaml = require('js-yaml')
const path = require('path')

const ttt = `
interface info {
  id: string
}`

function loadYamlFile(fileName) {
  const yamlData = fs.readFileSync(fileName,'utf8')
  return yaml.load(yamlData);
}

function makeFile() {
  let putCode = '';
  try {
    const data = loadYamlFile(path.join(__dirname,'shema.yaml'))

    for (const [key,value] of Object.entries(data)) {
      let setText = '';
      for (const [_key,_value] of Object.entries(value)) {
        setText += `${_key}: ${_value} \n`;
      }
      putCode += `
interface ${key} {
  ${setText}}\n`
    }
    putCode += 'export {}'
    console.log(putCode)

  } catch (error) {
    console.error(error)
  }
  fs.writeFile(path.join(__dirname,'../core/types.ts'),putCode, (err) => {
    if(err) {
      throw err;
    }
    console.log('conplate !!') 
  })
}

makeFile()
