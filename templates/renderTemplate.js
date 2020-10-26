const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const { create } = require('jss')
const preset = require('jss-preset-default')
const withStyles = require('./styles')

const jss = create(preset.default)

module.exports = function(data, theme, templateName) {
    
    const styles = withStyles(theme)
    const sheets = jss.createStyleSheet(styles)

    const file = fs.readFileSync(path.resolve(__dirname, `${templateName}.hbs`), 'utf8')

    const template = handlebars.compile(file)({
        ...data,
        styleSheet: sheets.toString(),
        classes: sheets.classes,
    })

    return template
}