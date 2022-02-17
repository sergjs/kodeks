import React, { useEffect, useState } from 'react'
import ElemOutputText from './Components/ElemOutputText'
import { sortArr, isRepeat } from './validation/validate'

function App() {
  const [value, setValue] = useState({
    text: '', time: '', count: 1
  })
  const [stateNumber, setStateNumber] = useState([])
  const [stateString, setStateString] = useState([])
  const [stateAnother, setStateAnother] = useState([])
  const [stateSelect, setStateSelect] = useState('sortTime')

  useEffect(() => {
    localStorage.getItem('stateString') && setStateString(JSON.parse(localStorage.getItem('stateString')))
    localStorage.getItem('stateAnother') && setStateAnother(JSON.parse(localStorage.getItem('stateAnother')))
    localStorage.getItem('stateNumber') && setStateNumber(JSON.parse(localStorage.getItem('stateNumber')))
  }, [])

  const changeHandler = e => setValue({ text: e.target.value, time: new Date(), count: 1 })

  useEffect(() => {
    stateString.length !== 0 && localStorage.setItem('stateString', JSON.stringify(stateString))
    stateAnother.length !== 0 && localStorage.setItem('stateAnother', JSON.stringify(stateAnother))
    stateNumber.length !== 0 && localStorage.setItem('stateNumber', JSON.stringify(stateNumber))
  }, [stateNumber, stateString, stateAnother])
  
  const changeState = e => {
    if (!value.text) return;
    if (e.key === 'Enter') {
      e.preventDefault()
      validateText(value)
      setValue({
        text: '', time: '', count: value.count
      })
    }
  }

  const validateText = value => {
    if (!value.text.match(/[0-9]/gi)) {
      return isRepeat(value, stateString, setStateString)
    } else if (!value.text.match(/[A-ZА-Я]/gi)) {
      return isRepeat(value, stateNumber, setStateNumber)
    } else {
      return isRepeat(value, stateAnother, setStateAnother)
    }
  }

  const changeSelect = e => {
    setStateSelect(e.target.value);
    sortArr(stateSelect, stateNumber, setStateNumber, false)
    sortArr(stateSelect, stateString, setStateString)
    sortArr(stateSelect, stateAnother, setStateAnother)
  }

  return <div className='container'>
    <select value={stateSelect} className='sort' onChange={changeSelect}>
      <option value='sortTime'>По времени добавления</option>
      <option value='sortAlphabetical'>По алфавиту</option>
    </select>

    <div className='elem' style={{ backgroundColor: 'white' }}>
      {<input className='input' value={value.text} type='text'
        onChange={changeHandler}
        onKeyPress={changeState}
      />}
    </div>
    <ElemOutputText state={stateNumber} backgroundColor='#ffe5b4' />
    <ElemOutputText state={stateString} backgroundColor='blue' />
    <ElemOutputText state={stateAnother} backgroundColor='black' color='white' />
  </div>
}

export default App;
