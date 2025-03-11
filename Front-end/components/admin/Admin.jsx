import { useState } from "react"
import './App.css'
import Center from "./Center.jsx"

function App() {
  const [page, setPage] = useState("profile")
  return (
    <>
      {page == "profile" && 
      <>
        <div>profile</div>    
        <button onClick={() => setPage("collection-center")}>collection center</button>
        <button  onClick={() => setPage("recycling-facility")}>recyclinig facilities</button>
      </>
      }
      { page === "collection-center" && <Center setPage={setPage} url="/api/collection_centers"  heading="Collection Centers List"/> }
      { page === "recycling-facility" && <Center setPage={setPage} url="/api/recycling_centers" heading="Recycling Centers List"/> }
    </>

  )
}

export default App
