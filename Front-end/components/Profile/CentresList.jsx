import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import "./CentresList.css"; // Import the CSS file for styling

const CentresList = () => {
  const [centres, setCentres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/collectionCentre")
      .then((response) => {
        let centresData = response.data;
        if (!Array.isArray(centresData)) {
          console.error("Expected an array but got:", centresData);
          centresData = [];
        }
        setCentres(centresData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching centres:", error);
        setLoading(false);
      });
  }, []);

  // Filter centres by centre name or city based on the search term.
  const filteredCentres = centres.filter(
    (centre) =>
      centre.center_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      centre.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (centre) => {
    // Navigate back to ItemsSection (assumed to be on /profile) with the full centre object as state.
    navigate("/profile", { state: { selectedCentre: centre } });
  };

  return (
    <div className="centres_list_container_2110">
      <h2 className="centres_list_heading_2110">All Collection Centres</h2>
      <div className="search_container_2110">
        <input
          type="text"
          className="search_input_2110"
          placeholder="Search by centre name or city"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="search_icon_2110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#4caf50"
            viewBox="0 0 24 24"
            width="20px"
            height="20px"
          >
            <path d="M9.5 2C5.364 2 2 5.364 2 9.5c0 4.136 3.364 7.5 7.5 7.5 1.885 0 3.621-.671 4.5-1.812L19.293 20 20 19.293l-4.812-4.812C16.329 13.121 17 11.385 17 9.5 17 5.364 13.636 2 9.5 2zm0 2c3.037 0 5.5 2.463 5.5 5.5S12.537 15 9.5 15 4 12.537 4 9.5 6.463 4 9.5 4z" />
          </svg>
        </span>
      </div>
      {loading ? (
        <div className="loading_spinner_2110">
          <FaSpinner className="spinner_2110" />
          <p className="loading_text_2110">Loading centres...</p>
        </div>
      ) : (
        <div className="centres_grid_2110">
          {filteredCentres.map((centre) => (
            <div key={centre.center_id} className="centre_card_2110">
              <img
                src="/assets/placeHolder.jpg"
                alt={centre.center_name}
                className="centre_image_2110"
              />
              <div className="centre_info_2110">
                <h3 className="centre_name_2110">
                  {centre.center_id} - {centre.center_name}
                </h3>
                <p className="centre_city_2110">{centre.city}</p>
                <p className="centre_phone_2110">{centre.phone}</p>
              </div>
              <button
                className="select_button_2110"
                onClick={() => handleSelect(centre)}
              >
                Select
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CentresList;
