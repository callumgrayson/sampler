import React from 'react';
import './FormSampleOptions.css'


const FormSampleOptions = (props) => {

  let {stateProps, renderProps} = props
  let rp = renderProps
  let sp = stateProps

  return (
    <form onSubmit={rp.handleOptionSubmit} className="form-sample-options">
      <div className="center-half">
        <label className="half-left" >Min</label>
        <input type="number" name="rangeMin"
              className="half-right"
              value={sp.rangeMin}
              onFocus={rp.handleFocus}
              onChange={rp.handleOptionChange}/>
      </div>
      <div className="center-half">
        <label className="half-left" >Max</label>
        <input type="number" name="rangeMax"
              className="half-right"
              value={sp.rangeMax}
              onFocus={rp.handleFocus}
              onChange={rp.handleOptionChange}/>
      </div>    
      <div className="center-half">
        <label className="half-left" >Sample size</label>
        <input type="number" name="sampleSize" 
              className="half-right"
              min='0' 
              max={Math.min(sp.rangeMax - sp.rangeMin, 1000)} 
              value={sp.sampleSize}
              onFocus={rp.handleFocus}
              onChange={rp.handleOptionChange}/>
      </div>    
      <input type="submit"
             className="btn-submit"
             value="Get Sample"/>
    </form>
  )
}

export default FormSampleOptions