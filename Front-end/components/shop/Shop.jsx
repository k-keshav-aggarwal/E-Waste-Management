import { useState, useEffect, useMemo } from 'react'
import axios from "axios"
import { BiHomeAlt2, BiCartAlt } from "react-icons/bi"
import "./Shop.css"

const Shop = ({setPage}) => {
    
    const[data,setData] = useState([])
    const[query,setQuery] = useState("")
    const [sortOrder, setSortOrder] = useState('');
    const [itemsBought, setItemsBought] = useState(0);

    useEffect( () => {
        const getData = async() => {
            try {
                const response = await axios.get("/api/shop")
                setData(response.data)
            } catch (error) {
                window.alert(error.response.data.message)
            }
        }
        getData()
    }, [])

    const filteredData = useMemo(() => {
        let filtered = data.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
        if (sortOrder === 'lowToHigh') {
        return [...filtered].sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'highToLow') {
        return [...filtered].sort((a, b) => b.price - a.price);
        }
        return filtered;
    }, [data, query, sortOrder]);


    return (
        <>
        <div className="shop-top-section">
                <button className="back-to-profile-btn" onClick={() => setPage("profile")}><BiHomeAlt2 /></button>
                <input  className="shop-search-box" type="text" placeholder="what are you looking for?" onChange={e => setQuery(e.target.value)} value={query}/>
                <div className="shop-cart"><BiCartAlt/><div className="items-bought" style={{ display: itemsBought === 0 ? "none" : "block" }}
                >{itemsBought}</div></div>
        </div>
        <label htmlFor="sortby" className="sort-dropdown">
            SortBy :
            <select name="sortby" onChange={(e) => setSortOrder(e.target.value)}>
                <option value="">Default</option>
                <option value="lowToHigh">Price (low to high)</option>
                <option value="highToLow">Price (high to low)</option>
            </select>
        </label>
        <div className="item-list-container">
            { filteredData.map( item => (
                <div className="item-container" key={item.item_id}>
                    <h1>{item.name}</h1>
                    <p>Price: &#8377;{item.price}</p>
                    <button className="shop-buy-btn" onClick={() => setItemsBought(prev => prev+1)}>Add to Cart</button>
                </div>
            ))}
        </div>
        </>
    )
}

export  default Shop