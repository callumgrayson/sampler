import React from 'react';
// import './FormSampleOptions.css'


const CalculationDisplay = (props) => {

  let { stateProps } = props
  let sp = stateProps
  // let rp = renderProps

  function formatNumber(num) {
    // num is 0
    // num is whole
    // num is decimal > 0
    // num is decimal < 0

    if (num === 0) {
      return 0
    } else if (Number.isInteger(num)) {
      return num
    } else if (Math.abs(num) > 1) {
      return `${num.toFixed(2)} (2dp)`
    } else if (Math.abs(num) < 1) {
      return `${num.toPrecision(4)} (4sf)`
    } else {
      return 'There is an error. Please report to admin.'
    }
  }

  return (
    <div>
      {
        (sp.dataMean && typeof sp.dataMean === 'number' && (
          <p>The mean is {formatNumber(sp.dataMean)}</p>
        )) || (sp.dataMean && (
          <p>Cannot calculate with given input</p>
        ))
      }
    </div>
  )
}

export default CalculationDisplay