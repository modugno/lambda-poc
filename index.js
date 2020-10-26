const pdf = require('html-pdf')
const renderTemplate = require('./templates/renderTemplate')

process.env.PATH = `${process.env.PATH}:/opt`
process.env.FONTCONFIG_PATH = '/opt'
process.env.LD_LIBRARY_PATH = '/opt'

const convertPDF = (filename, component) => {
    return new Promise((resolve, reject) => {
      const html = component
  
      const options = {
        format: 'A4',
        orientation: 'portrait',
        border: '10mm',
        footer: {
          height: '10mm',
        },
        type: 'pdf',
        timeout: 30000,
        // phantomPath: './opt/phantomjs_linux-x86_64'
      };
  
      pdf.create(html, options).toFile(`${filename}.pdf`, (err) => {
        if (err) {
          return reject(err);
        }
      
        return resolve();
      });
    })
}

exports.handler = async (event, context, callback) => {

  try  {
    const { themeKey, ...data } = event

    const themes = {
      yellow: {
        colors: {
          primary: "#f7df1e"
        }
      },
      red: {
        colors: {
          primary: "#f00"
        }
      }
    }

    const html = renderTemplate(data, themes[themeKey], 'template')
    await convertPDF(`fatura-${themeKey}`, html)
    callback(null, 'Sucesso na conversão')

    return {
      message: 'Sucesso na conversão',
    }
    
  } catch(e) {
    callback(null, `Erro na conversão: ${e}`)
  }

}
