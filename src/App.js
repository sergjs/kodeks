import React, { useEffect, useState } from 'react';
import './App.css';
import { filterNumb, isRepeat, filterString } from './validation/validate';

function App() {
  const [value, setValue] = useState({
    text: '', time: '', count: 1
  })
  const [stateNumber, setStateNumber] = useState([])
  const [stateString, setStateString] = useState([])
  const [stateAnother, setStateAnother] = useState([])
  const [stateSelect, setStateSelect] = useState('sortTime')

  useEffect( () =>{
    localStorage.getItem('stateString') && setStateString(JSON.parse(localStorage.getItem('stateString')))
    localStorage.getItem('stateAnother') && setStateAnother(JSON.parse(localStorage.getItem('stateAnother')))
    localStorage.getItem('stateNumber') && setStateNumber(JSON.parse(localStorage.getItem('stateNumber')))
  }, [] )

  const changeHandler = e => setValue({ text: e.target.value, time: new Date(), count: 1 })

  stateString.length !== 0 && localStorage.setItem('stateString', JSON.stringify(stateString))
  stateAnother.length !== 0 && localStorage.setItem('stateAnother', JSON.stringify(stateAnother))
  stateNumber.length !== 0 && localStorage.setItem('stateNumber', JSON.stringify(stateNumber))
 
  const changeState = (e) => {
    if (!value.text) return;
    if (e.key === 'Enter') {
      e.preventDefault()
      validateText(value)
      setValue({
        text: '', time: '', count: value.count
      })
    }
  }

  const validateText = (value) => {
    if (!value.text.match(/[0-9]/gi)) {
      return isRepeat(value, stateString, setStateString)
    } else if (!value.text.match(/[A-ZА-Я]/gi)) {
      return isRepeat(value, stateNumber, setStateNumber)
    } else {
      return isRepeat(value, stateAnother, setStateAnother)
    }
  }

  const chengeSelect = (e) => {   
    setStateSelect(e.target.value);
    filterNumb(stateSelect, stateNumber, setStateNumber)
    filterString(stateSelect, stateString, setStateString)
    filterString(stateSelect, stateAnother, setStateAnother)
  }

  return <div className='container'>
    <select value={stateSelect} className='sort' onChange={chengeSelect}>
      <option value='sortTime'>По времени добавления</option>
      <option value='sortAlphabetical'>По алфавиту</option>
    </select>

    <div className='elem' style={{ backgroundColor: 'white' }}>
      {<input className='input' value={value.text} type='text'
        onChange={changeHandler}
        onKeyPress={changeState}
      />}
    </div>
    <div className='elem' style={{ backgroundColor: '#ffe5b4' }}>
      <div className='centerBlogForText'>
        {stateNumber.length ? stateNumber.map((e, index) => <p key={index}>{e.text}  {e.count > 1 && ` x${e.count}`}  </p>)
          : <p>Нет введенных данных</p>}
      </div>
    </div>
    <div className='elem' style={{ backgroundColor: 'blue' }}>
      <div className='centerBlogForText'>
        {stateString.length ? stateString.map((e, index) => <p key={index}>{e.text}  {e.count > 1 && ` x${e.count}`} </p>)
          : <p>Нет введенных данных</p>}
      </div>
    </div>
    <div className='elem' style={{ backgroundColor: 'black', color: 'white' }}>
      <div className='centerBlogForText'>
        {stateAnother.length ? stateAnother.map((e, index) => <p key={index}>{e.text} {e.count > 1 && ` x${e.count}`} </p>)
          : <p>Нет введенных данных</p>}
      </div>
    </div>
  </div>
}

export default App;
