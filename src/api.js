
export const countryHandler =  async (key) => {
    try{
        let response = await fetch(`https://restcountries.com/v3.1/name/${key}?fullText=true`, ['GET'])
        const data = await response.json() 
        if (!response.ok) {
            return cityHandler(key)
          } else {
            console.log(data.map( e => e.capital))
            return data.map( e => e.capital)
          }
    } catch (e) {
        console.log(e)
        throw e
    }
}


export const cityHandler =  async (key) => {
    try{
        const response = await fetch(`https://restcountries.com/v3.1/capital/${key}`, ['GET'])
        const data = await response.json() 
       // console.log( data.map( e => e.altSpellings[2]) )
        if (!response.ok) {
            throw new Error('Такой страны или города не существует')
          } else {
              console.log(data.map( e => e.altSpellings))
          return data.map( e => e.altSpellings)
          }
    } catch (e) {
       
        throw e
    }
}