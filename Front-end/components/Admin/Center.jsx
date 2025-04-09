import { useEffect, useState, useMemo } from 'react'
import axios from "axios"
import { FaSpinner } from "react-icons/fa";
import "./Center.css"


const Center = ({ list, heading, url }) => {
  const [data, setData] = useState([])
  const [newCenter, setNewCenter] = useState({
    center_name: "",
    city: "",
    phone: "",
    admin_id: "",
  })
  const [showForm, setShowForm] = useState(false)
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(url);
        const transformedData = response.data.map((center) => ({
          ...center,
          center_id: list === "2" ? center.facility_id : center.center_id, // Rename key dynamically
          center_name: list === "2" ? center.facility_name : center.center_name, // Rename key dynamically
        }));
        setData(transformedData);
      } catch (err) {
        console.log(err.response?.data?.message);
      } finally{
        setLoading(false)
      }
    };
    getData();
  }, [list,url]);

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

  const createCenter = async (e) => {
    e.preventDefault();
    try {
      const modifiedData = {
        ...newCenter,
        center_name: list === "2" ? undefined : newCenter.center_name,
        facility_name: list === "2" ? newCenter.center_name : undefined,
      };

      const response = await axios.post(url, modifiedData);
      const { center } = response.data;
      setData((prev) => [
        ...prev,
        {
          ...center,
          center_id: list === "2" ? center.facility_id : center.center_id,
          center_name: list === "2" ? center.facility_name : center.center_name,
        },
      ]);
      window.alert(response.data.message);
      setShowForm(false);
    } catch (error) {
      window.alert(error.response?.data?.message);
    }
  };

  const filteredData = useMemo(() => {
     return data.filter((center) => 
        center.center_name.toLowerCase().includes(query.toLowerCase()) || center.city.toLowerCase().includes(query.toLowerCase()))
  },[data,query])

  if (loading) {
    return (
      <div className="profile_page_2090">
        <div className="loading_spinner_profile">
          <FaSpinner className="spinner_profile" />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="list-heading-01">{heading}</h1>
      <div className="center-top-section">
        <input  className="center-search-box" type="text" placeholder="enter name or city..." onChange={e => setQuery(e.target.value)} value={query}/>
        <button className="add-center-btn" onClick={() => setShowForm(!showForm)}>+</button>
      </div>
      <div className="center-list-container-01">
        <div className="center-list">
          {showForm && <form className="center-create-form" onSubmit={createCenter}>
                        <input type="text" name ="center_name" placeholder="center name" onChange={handleForm} value={newCenter.center_name} required/>
                        <input type="text" name ="city" placeholder="city" onChange={handleForm} value={newCenter.city} required/>
                        <input type="text" name ="phone" placeholder="phone" onChange={handleForm} value={newCenter.phone} required/>
                        <input type="text" name ="admin_id" placeholder="admin id" onChange={handleForm} value={newCenter.admin_id}/>
                        <button className="create-center-btn" type="submit">create new center</button>
                      </form> 
          }
          { filteredData.map( (center) => (
            <div  className="center-details-container" key={center.center_id}>
              <div className = "center-details" >
                <h1>{center.center_name}</h1>
                <p>phone: {center.phone}</p>
                <p>city: {center.city}</p>
              </div>
              <button className="delete-center" onClick={() => deleteCenter(center.center_id)}>x</button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Center