module.exports = function generateAPIClassFromRAML() {
  const parser = require('raml-1-parser');
  const generator = require('raml-javascript-generator/dist/index');

  let api = parser.loadApiSync(this.resourcePath).expand().toJSON();
  return generator.client(api).files['index.js'];
}
