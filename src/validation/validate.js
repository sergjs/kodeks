export const isRepeat = (value, arr, setObj) => {
    if (arr.length === 0 || !arr.find(item => item.text === value.text)) return setObj([...arr, { ...value }])
    
    setObj([...arr.map(elem => {
        if (elem.text === value.text) {
            return { ...elem, time: new Date(), count: elem.count + 1 }
        } else {
            return { ...elem }
        }
    })
    ])
}

export const filterNumb = (stateSelect, arr, setArr) =>{  
    stateSelect === 'sortTime' ? setArr(arr.sort( (a, b) => a.text > b.text  ? -1 : 1 ))
    : setArr(arr.sort( (a, b) => a.time > b.time  ? 1 : -1 ))
}

export const filterString = (stateSelect, arr, setArr) =>{
    stateSelect === 'sortTime' ? setArr(arr.sort( (a, b) => a.text > b.text ? 1 : -1))
    : setArr(arr.sort( (a, b) => a.time > b.time  ? 1 : -1))
}