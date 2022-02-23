import React, { useCallback, useEffect, useState } from 'react'
import { countryHandler } from './api'
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
  const [nameCountry, setNameCountry] = useState('')
  
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
      fetchCountry(value.text)
      validateText(value)
      setValue({
        text: '', time: '', count: value.count
      })
    }
  }

  const fetchCountry = useCallback(async (key) => { 
    try {
        const fetched = await countryHandler(key)
        setNameCountry(fetched)
    } catch (e) { }
}, [countryHandler])

useEffect(() => {
  fetchCountry()
}, [fetchCountry])



  const validateText = value => {
    if (value.text.match(/^\d+$/gi)) {
      return isRepeat(value, 'number', setStateMap, stateMap)
    } else if (value.text.match(/^[A-ZА-ЯЁ]+$/gi)) {
      return isRepeat(value, 'string', setStateMap, stateMap)
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
      {nameCountry && nameCountry.map( (elem, index) => <p key = {index}> {elem[elem.length - 1]} </p>)}
    </div>
    <ElemOutputText state={stateMap.number} backgroundColor='#ffe5b4' />
    <ElemOutputText state={stateMap.string} backgroundColor='blue' />
    <ElemOutputText state={stateMap.another} backgroundColor='black' color='white' />
  </div>
}

export default App;
