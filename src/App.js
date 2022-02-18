import React, { useEffect, useState } from 'react'
import ElemOutputText from './Components/ElemOutputText'
import { sortArr, isRepeat } from './validation/validate'

function App() {
  const [value, setValue] = useState({
    text: '', time: '', count: 1
  })
  const [stateSelect, setStateSelect] = useState('sortTime')
  const [stateMap, setStateMap] = useState({
    string: [], number: [], another: []
  })
  
  useEffect(() => {
    Object.keys(stateMap).map(elem => {
      localStorage.getItem(`${elem}`) && setStateMap(prev => { 
        return { ...prev, [elem]: JSON.parse(localStorage.getItem(`${elem}`)) } })
    })
  }, [])

  useEffect(() => {
    Object.values(stateMap).map((elem, index) => {
      elem.length !== 0 && localStorage.setItem(`${Object.keys(stateMap)[index]}`, JSON.stringify(elem))
    })
  }, [stateMap])


  const changeHandler = e => setValue({ text: e.target.value, time: new Date(), count: 1 })

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
      return isRepeat(value, 'string', setStateMap, stateMap)
    } else if (!value.text.match(/[A-ZА-Я]/gi)) {
      return isRepeat(value, 'number', setStateMap, stateMap)
    } else {
      return isRepeat(value, 'another', setStateMap, stateMap)
    }
  }

  const changeSelect = e => {
    setStateSelect(e.target.value);
    sortArr(stateSelect, stateMap, setStateMap)
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
    <ElemOutputText state={stateMap.number} backgroundColor='#ffe5b4' />
    <ElemOutputText state={stateMap.string} backgroundColor='blue' />
    <ElemOutputText state={stateMap.another} backgroundColor='black' color='white' />
  </div>
}

export default App;
