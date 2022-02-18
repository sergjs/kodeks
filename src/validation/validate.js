export const isRepeat = (value, nameKey, setState, state) => {
    if (state[nameKey].length === 0 || !state[nameKey].find(item => item.text === value.text))
        return setState({ ...state, [nameKey]: [...state[nameKey], { ...value }] })

    setState({
        ...state, [nameKey]: [...state[nameKey].map(elem => {
            if (elem.text === value.text) {
                return { ...elem, time: new Date(), count: elem.count + 1 }
            } else {
                return { ...elem }
            }
        })]
    })
}

export const sortArr = (stateSelect, state, setState) => {
    let keysObj = Object.keys(state)
    Object.values(state).map((elem, index) =>
        setState(prev => {
            return {
                ...prev, [`${keysObj[index]}`]: elem.sort((a, b) =>
                    stateSelect === 'sortAlphabetical' ? a.time > b.time ? 1 : -1
                        : [`${keysObj[index]}`] !== 'number' ? a.text > b.text ? 1 : -1 :
                            a.text - b.text )
            }
        }))
}
