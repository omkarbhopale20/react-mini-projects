import  {useEffect, useState} from "react"

//Custom Hook

function useCurrencyInfo(currency) {
    const [data , setData] = useState({})
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`)
        .then((res) => res.json())
        .then((res) => setData(res[currency])) //get value 
    } , [currency])

    return data
}

export default useCurrencyInfo;