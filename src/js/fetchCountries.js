

const fetchCountries = (name) => {
    const BASE_URL = 'https://restcountries.com/v3.1'
    return fetch(`${BASE_URL}/name/${name}`).then(response => {
        // console.log(`response`, response)
        if (response.ok) {
        return response.json()
        }
        return Promise.reject(new Error("not found"))
}
    )
}
// fetchCountries()
export { fetchCountries };