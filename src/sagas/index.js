import { all, call, takeEvery } from "redux-saga/effects"
import graphql from "../config/graphql"
import XlsxPopulate from "../../node_modules/xlsx-populate/browser/xlsx-populate"
import download from "downloadjs"



const downloadSpreadsheet = async spreadsheet => {
  const file = await spreadsheet.outputAsync()
  download(file, "Results.xlsx")
}



const fields = {
  standingVerticalLeap: { label: "Standing Vertical Leap",     width: 25 },
  maxVerticalLeap:      { label: "Max Vertical Leap",          width: 20 },
  agility:              { label: "Lane Agility Time (sec)",    width: 25 },
  speed:                { label: "Three Quarter Sprint (sec)", width: 30 },
  height:               { label: "Height w/o Shoes",           width: 20 },
  heightWithShoes:      { label: "Height w/ Shoes",            width: 20 },
  weight:               { label: "Weight",                     width: 10 },
  wingspan:             { label: "Wingspan",                   width: 15 },
  standingReach:        { label: "Standing Reach",             width: 20 },
  bodyFat:              { label: "Body Fat",                   width: 15, format: value => value !== null ? `${value}%` : '-' },
  handLength:           { label: "Hand Length",                width: 15 },
  handWidth:            { label: "Hand Width",                 width: 15 },
}



const getResults = () => graphql.query(`
    {
      allAthletesReports {
        athlete {
          firstName
          lastName
        }
        results {
          ${Object.keys(fields).join("\n")}
        }
      }
    }
`)



const generateReportSpreadsheet = async athletes => {
  const spreadsheet = await XlsxPopulate.fromBlankAsync()

  // Setup sheets
  spreadsheet.sheet(0).name("Athleticism")
  const athleticism = spreadsheet.sheet(0)
  const measurements = spreadsheet.addSheet("Measurements")



  const generateSheet = (sheet, fieldNames) => {
    const headers = ["Athlete", ...fieldNames.map(fieldName => fields[fieldName].label)]

    const data = athletes.map( ({ athlete, results }) => {
      const name = `${athlete.firstName} ${athlete.lastName}`
      const values = fieldNames.map(fieldName => {
        const { format } = fields[fieldName]
        const value = results[fieldName]
        return format ? format(value) : value
      })
      return [name, ...values]
    })

    sheet.cell("A1").value([headers, ...data])


    // Style
    sheet.usedRange().style("border", true)
    const usedCells = sheet.usedRange().cells()
    const headerCells = usedCells[0] 
    usedCells[0][0].column().width(25)
    fieldNames.forEach((fieldName, f) => usedCells[0][f + 1].column().width(fields[fieldName].width || 25))
    const headerRange = headerCells[0].rangeTo(headerCells[headerCells.length - 1])
    headerRange.style({ bold: true, fill: "888888" })
  }


  generateSheet(athleticism, Object.keys(fields).slice(0, 4))
  generateSheet(measurements, Object.keys(fields).slice(4))

  return spreadsheet
}




export function * downloadResults() {
  const results     = yield call(getResults)
  const spreadsheet = yield call(generateReportSpreadsheet, results.allAthletesReports)
  yield call(downloadSpreadsheet, spreadsheet)
}



export default function * rootSaga() {
  yield all([
    takeEvery("DOWNLOAD_RESULTS", downloadResults)
  ])
}
