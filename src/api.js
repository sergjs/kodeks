export const countryHandler = async (key) => {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${key}?fullText=true`, ['GET'])
        const data = await response.json()
        console.log(data)
        if (response.status === 404) {
            return cityHandler(key)
        } else if (response.status === 200) {
            return  data[0].capital
        } else {
            throw new Error(data.message || 'Что-то пошло не так')
        }
    } catch (e) {
        return e.message
    }
}


const cityHandler = async (key) => {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/capital/${key}`, ['GET'])
        const data = await response.json()
        console.log(data)
        if (response.status === 200) {
            const arrCity = data.filter(e => e.capital[0].toLowerCase() === key.toLowerCase())
            if (arrCity.length) {
                return data[0].altSpellings[data[0].altSpellings.length-2]
            } else {
                throw new Error('Такой страны или города не существует')
            }
        } else if (response.status === 404) {
            throw new Error('Такой страны или города не существует')
        } else {
            throw new Error(data.message || 'Что-то пошло не так')
        }
    } catch (e) {
        return e.message
    }
}