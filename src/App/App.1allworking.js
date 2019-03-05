import React, { Component } from 'react';
import FormSampleOptions from '../FormSampleOptions/FormSampleOptions'
import DisplaySample from '../DisplaySample/DisplaySample'
import './App.css';

function getSample(min, max, size) {
  let len = 0
  let rand = 0
  let digitsArr = []
  let sampleDigits = []

  // make an array of digits min to max
  for (let i = min; i <= max; i++) {
    digitsArr.push(i)
  }

  len = digitsArr.length

  // Cut digits from Array one-by-one
  for (let i = 0; i < size; i++) {
    // generate rand * len
    rand = Math.floor(Math.random() * len)
    // remove items from digits array
    let cutDigit = digitsArr.splice(rand, 1)[0]
    sampleDigits.push(cutDigit)
    len--
  }

  return sampleDigits
}

class App extends Component {
  constructor() {
    super()

    this.state = {
      type: 'range',
      rangeMin: 0,
      rangeMax: 0,
      sampleSize: 0,
      sampleArr: [],
      dataInput: {},
      dataMean: 0
    }

    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDataInput = this.handleDataInput.bind(this)
    this.handleDataCalculation = this.handleDataCalculation.bind(this)
  }

  handleDataCalculation(e) {
    e.preventDefault()
    const data = {...this.state.dataInput}
    // console.log(data)
    let keys = Object.keys(data)
    let sum = keys.reduce((acc, key) => {
      // console.log(acc, key, data[key])
      return acc + Number(data[key])
    }, 0)
    console.log('keys, sum, keysLength: ', keys, sum, keys.length)
    let mean = sum / keys.length
    // console.log('mean of the data is: ', mean)
    this.setState({dataMean: mean})
  }

  handleDataInput(e) {
    e.preventDefault()
    // console.log(e.target)
    const id = e.target.id
    const appendState = this.state.dataInput
    appendState[id] = e.target.value

    // Needs work to add to state object
    this.setState({
      dataInput: appendState
    })
    // console.log('id: and dataInput: ', id, this.state.dataInput)
  }

  handleFocus(e) {
    e.preventDefault()
    e.target.select()
  }

  handleTypeChange(e) {
    e.preventDefault()
    this.setState({type: e.target.value})
  }
  
  handleOptionChange(e) {
    e.preventDefault()
    const key = e.target.name
    const value = Number(e.target.value)
    this.setState({[key]: value})
  }

  handleSubmit(e) {
    e.preventDefault()
    const { rangeMin, rangeMax, sampleSize } = this.state
    const sampleArr = getSample(rangeMin, rangeMax, sampleSize)
    // console.log(sampleArr)
    this.setState({sampleArr: sampleArr})
  }

  render() {
    const sampleArr = this.state.sampleArr
    return (
      <div className="App">
        <h4>Sampler</h4>
        <form onSubmit={this.handleSubmit}>
          <FormSampleOptions/>
          <DisplaySample />
          
          <label >
            Min
            <input type="number" name="rangeMin" id="rangeMin" 
                   value={this.state.rangeMin}
                   onFocus={this.handleFocus}
                   onChange={this.handleOptionChange}/>
          </label>
          <label >
            Max
            <input type="number" name="rangeMax" id="rangeMax" 
                   value={this.state.rangeMax}
                   onFocus={this.handleFocus}
                   onChange={this.handleOptionChange}/>
          </label>
          <label >
            Sample size
            <input type="number" name="sampleSize" id="sampleSize" min='0' max={this.state.rangeMax - this.state.rangeMin} 
                   value={this.state.sampleSize}
                   onFocus={this.handleFocus}
                   onChange={this.handleOptionChange}/>
          </label>
          <input type="submit" value="Get Sample"/>
        </form>
        <div className="output">
          <table>
            <tbody>
              {
                sampleArr.map(item => {
                  let key = 'id' + item
                  // console.log('key in .map: ', key)
                  return (<tr key={key}>
                    <td>{item}</td>
                    <td>
                      <input type="number" 
                               id={key}
                               onChange={this.handleDataInput}
                               onFocus={this.handleFocus}
                               value={this.state.dataInput.key}/>
                    </td>
                  </tr>)
                })
              }
            </tbody>
          </table>
          <input type="button" 
                 value="Data Calculation"
                 onClick={this.handleDataCalculation}/>
          {
            this.state.dataMean !== 0 && (
              <p>The mean is {this.state.dataMean}</p>
            )
          }
          <p></p>
        </div>
      </div>
    );
  }
}

export default App;
