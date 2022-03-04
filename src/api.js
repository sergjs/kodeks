export const countryHandler = async (key) => {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${key}?fullText=true`, ['GET'])
        const data = await response.json()
        if (response.status === 404) {
            return cityHandler(key)
        } else if (response.status === 200) {
            return data.map(e => e.capital)
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
        const arrCity = data.filter( e => e.capital[0].toLowerCase() === key.toLowerCase())
        if (response.status === 200 && arrCity.length) {
            return data.map(e => e.altSpellings)
        } else if (response.status === 404 || response.status === 200) {
            throw new Error('Такой страны или города не существует')
        } else {
            throw new Error(data.message || 'Что-то пошло не так')
        }
    } catch (e) {
        return e.message
    }
}