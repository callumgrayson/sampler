import React, { Component } from 'react';
import FormSampleOptions from '../FormSampleOptions/FormSampleOptions'
import EnterSampleData from '../EnterSampleData/EnterSampleData'
import CalculationDisplay from '../CalculationDisplay/CalculationDisplay'
import Sampler from '../Util/Sampler'
import './App.css';


const steps = [
  'FormSampleOptions',
  'EnterSampleData',
  'DisplayStatistics'
]

class App extends Component {
  constructor() {
    super()

    this.state = {
      rangeMin: '',
      rangeMax: '',
      sampleSize: '',
      sampleArr: [],
      dataInput: {},
      dataMean: '',
      requiredChecked: true,
      step: 'FormSampleOptions'
    }

    this.handleBackOne = this.handleBackOne.bind(this)
    this.handleForwardOne = this.handleForwardOne.bind(this)
    this.handleDataCalculation = this.handleDataCalculation.bind(this)
    this.handleDataInput = this.handleDataInput.bind(this)
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.handleOptionSubmit = this.handleOptionSubmit.bind(this)
    this.handleChangeInputsRequired = this.handleChangeInputsRequired.bind(this)
  }

  handleBackOne(e) {
    if (e) e.preventDefault()
    // let index = steps.indexOf(this.state.step)
    // let prev = steps[index - 1]
    this.setState({dataInput: {}})
    this.setState({dataMean: null})
    this.setState({step: 'FormSampleOptions'})
  }

  handleChangeInputsRequired(e) {
    const currentRequired = this.state.requiredChecked
    this.setState({requiredChecked: !currentRequired})
  }

  handleDataCalculation(e) {
    e.preventDefault()
    const data = {...this.state.dataInput}
    let keys = Object.keys(data)
    let valsArr = Object.values(data)
    valsArr = valsArr.filter(el => {
      return el !== undefined
    })
    const count = valsArr.length

    let sum = keys.reduce((acc, key) => {
      if (data[key] === undefined) {
        return acc
      }
      return acc + Number(data[key])
    }, 0)
    let mean = sum / count
    if (typeof mean === 'number' && mean.toString() !== 'NaN') {
      this.setState({dataMean: mean})
    } else {
      this.setState({dataMean: 'Calculation Error'})
    }
    this.setState({step: 'showCalculation'})
  }

  handleDataInput(e) {
    e.preventDefault()
    const id = e.target.id
    const appendState = this.state.dataInput
    let val = e.target.value
    if (val === '') {
      val = undefined
    }

    appendState[id] = val
    this.setState({dataInput: appendState})
  }

  handleFocus(e) {
    e.preventDefault()
    e.target.select()
  }

  handleForwardOne() {
    let step = this.state.step
    let index = steps.indexOf(step)
    let next = steps[index + 1]
    next && this.setState({step: next})
  }
  
  handleOptionChange(e) {
    e.preventDefault()
    const key = e.target.name
    const value = Number(e.target.value)
    this.setState({[key]: value})
  }

  handleOptionSubmit(e) {
    e.preventDefault()
    const { rangeMin, rangeMax, sampleSize } = this.state
    const sampleArr = Sampler.RangeSample(rangeMin, rangeMax, sampleSize)
    this.setState({sampleArr: sampleArr})
    this.handleForwardOne()
  }

  render() {

    let renderProps = {
      handleFocus: this.handleFocus,
      handleBackOne: this.handleBackOne,
      handleChangeInputsRequired: this.handleChangeInputsRequired,
      handleDataCalculation: this.handleDataCalculation,
      handleDataInput: this.handleDataInput,
      handleOptionChange: this.handleOptionChange,
      handleOptionSubmit: this.handleOptionSubmit,
    }

    return (
      <div className="App">
        <h2>Sampler</h2>
        <div className="intro">
          <ul>
            <li>Generate a simple random sample from a range</li>
            <li>Enter data for each sample</li>
            <li>Calculate the mean</li>
          </ul>
        </div>
        {
          this.state.step === 'FormSampleOptions' && 
          <FormSampleOptions renderProps={renderProps} stateProps={this.state}/>
        }
        {
          (this.state.step === 'EnterSampleData' || this.state.step === 'showCalculation') &&
          <EnterSampleData renderProps={renderProps} stateProps={this.state}/>
        }
        {
          this.state.step === 'showCalculation' && <CalculationDisplay renderProps={renderProps} stateProps={this.state} />
        }
      </div>
    );
  }
}

export default App;
