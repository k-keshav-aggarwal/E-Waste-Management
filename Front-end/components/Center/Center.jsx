import { useEffect, useState, useMemo } from 'react'
import axios from "axios"
import "./Center.css"
import { BiHomeAlt2 } from "react-icons/bi"

const Center = ({setPage, url, heading}) => {
  const [data, setData] = useState([])
  const [newCenter, setNewCenter] = useState({
    name: "",
    city: "",
    phone: "",
    admin_id: ""
  })
  const [showForm, setShowForm] = useState(false)
  const [query, setQuery] = useState("")

  useEffect(() => {
    const getData = async() => {
      try {
        const response = await axios.get(url)
        setData(response.data)        
      } catch (err) {
        console.log(err.response.data.message);
      }
    }

    getData()
  }, [])
  
  const deleteCenter = async(id) => {
    try {
      const response = await axios.delete(`${url}/${id}`)
      window.alert(response.data.message)
      setData((prev) => prev.filter((center) => ( center.center_id !== id)));
    } catch (error) {
      window.alert(error.response.data.message)
    }
  }

  const handleForm = (e) => {
    let { name,value } = e.target
    setNewCenter((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const createCenter = async(e) => {
    e.preventDefault()
    try {
      const response = await axios.post(url, newCenter)
      const { center } = response.data
      setData((prev) => (
        [...prev,center]
      ))
      window.alert(response.data.message)
      setShowForm(false)
    } catch (error) {
      window.alert(error.response.data.message)
    }
  }

  const filteredData = useMemo(() => {
     return data.filter((center) => 
        center.name.toLowerCase().includes(query.toLowerCase()) || center.city.toLowerCase().includes(query.toLowerCase()))
  },[data,query])

  return (
    <>
      <div className="center-top-section">
        <button className="back-to-profile-btn" onClick={() => setPage("profile")}><BiHomeAlt2 /></button>
        <input  className="center-search-box" type="text" placeholder="enter name or city..." onChange={e => setQuery(e.target.value)} value={query}/>
        <button className="add-center-btn" onClick={() => setShowForm(!showForm)}>+</button>
      </div>
      <h1 className="list-heading-01">{heading}</h1>
      <div className="center-list">
        {showForm && <form className="center-create-form" onSubmit={createCenter}>
                      <input type="text" name ="name" placeholder="center name" onChange={handleForm} value={newCenter.name} required/>
                      <input type="text" name ="city" placeholder="city" onChange={handleForm} value={newCenter.city} required/>
                      <input type="text" name ="phone" placeholder="phone" onChange={handleForm} value={newCenter.phone} required/>
                      <input type="text" name ="admin_id" placeholder="admin id" onChange={handleForm} value={newCenter.admin_id}/>
                      <button className="create-center-btn" type="submit">create new center</button>
                    </form> 
        }
        { filteredData.map( (center) => (
          <div  className="center-details-container" key={center.id}>
            <div className = "center-details" >
              <h1>{center.name}</h1>
              <p>phone: {center.phone}</p>
              <p>city: {center.city}</p>
            </div>
            <button className="delete-center" onClick={() => deleteCenter(center.center_id)}>x</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default Center