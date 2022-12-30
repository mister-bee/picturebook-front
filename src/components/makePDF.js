import moment from 'moment'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const makePDF = (progressInput) => {

  const printableInput = progressInput.map(item => "PROMPT: " + item.prompt + "\nTEMPERATURE: " + item.temperature + "\nRESPONSE:" + item.text + "\n\n")

  const docDefinition = {
    content: [
      { text: "PictureBook Results: ", bold: true },
      { text: moment().format('MMMM Do YYYY, h:mm:ss a') },
      { text: "\n", fontSize: 10 },
      { text: printableInput, fontSize: 10, bold: true },
      { text: "  ", fontSize: 10 }]
  }

  pdfMake.createPdf(docDefinition).download("Geeps_Keeper.pdf").open();

}

export default makePDF