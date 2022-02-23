export const countryHandler = async (key) => {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${key}?fullText=true`, ['GET'])
        const data = response.json()
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
        const data = response.json()
        if (response.status === 404) {
            throw new Error('Такой страны или города не существует')
        } else if (response.status === 200) {
            return data.map(e => e.altSpellings)
        } else {
            throw new Error(data.message || 'Что-то пошло не так')
        }
    } catch (e) {
        return e.message
    }
}