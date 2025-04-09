import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import ContributionCount from "./ContributionCount";
import "./ItemSection.css";
import { BASE_URL } from '../config';

const ItemsSection = () => {
  const [items, setItems] = useState([]);
  const [centres, setCentres] = useState([]);
  const [loadingCentres, setLoadingCentres] = useState(true);
  const [loadingItems, setLoadingItems] = useState(true);
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("");
  const [newItemCondition, setNewItemCondition] = useState("");
  const [newItemCentre, setNewItemCentre] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/collectionCentre`)
      .then((response) => {
        let centresData = response.data;
        if (!Array.isArray(centresData)) {
          console.error("Expected an array but got:", centresData);
          centresData = [];
        }
        let limitedCentres = centresData.slice(0, 3);
        if (location.state && location.state.selectedCentre) {
          const selectedCentre = location.state.selectedCentre;
          const found = limitedCentres.find(
            (centre) => centre.center_id === selectedCentre.center_id
          );
          if (!found) {
            const selectedCentreData = centresData.find(
              (centre) => centre.center_id === selectedCentre.center_id
            );
            if (selectedCentreData) {
              limitedCentres[0] = selectedCentreData;
            }
          }
          setNewItemCentre(String(selectedCentre.center_id));
        } else if (limitedCentres.length > 0) {
          setNewItemCentre(String(limitedCentres[0].center_id));
        }
        setCentres(limitedCentres);
        setLoadingCentres(false);
      })
      .catch((error) => {
        console.error("Error fetching centres:", error);
        setLoadingCentres(false);
      });
  }, [location.state]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    axios
      .get(`${BASE_URL}/ewaste-items`)
      .then((response) => {
        const allItems = response.data;
        const filteredItems = allItems.filter(
          (item) => item.users && item.users.email === email
        );
        setItems(filteredItems);
        setLoadingItems(false);
      })
      .catch((error) => {
        console.error("Error fetching e-waste items:", error);
        setLoadingItems(false);
      });
  }, []);

  const handleCentreChange = (e) => {
    const value = e.target.value;
    if (value === "find_more") {
      navigate("/centresList");
    } else {
      setNewItemCentre(value);
    }
  };

  const addItem = async () => {
    if (newItemName && newItemCategory && newItemCondition && newItemCentre) {
      try {
        setIsAdding(true);
        const email = localStorage.getItem("email");
        if (!email) {
          console.error("Email not found in localStorage");
          return;
        }

        const userResponse = await axios.get(`${BASE_URL}/users`, {
          params: { email }
        });
        
        const userData = userResponse.data;
        const user_id = userData.user_id;
        if (!user_id) {
          console.error("User ID not found in the response");
          return;
        }

        const payload = {
          item_name: newItemName,
          category: newItemCategory,
          item_condition: newItemCondition,
          user_id,
          center_id: parseInt(newItemCentre, 10)
        };

        const insertResponse = await axios.post(
          `${BASE_URL}/ewaste-items/insert`,
          payload
        );

        const insertedItems = insertResponse.data;
        setItems([...items, ...insertedItems]);

        setNewItemName("");
        setNewItemCategory("");
        setNewItemCondition("");
        if (centres.length > 0) {
          setNewItemCentre(String(centres[0].center_id));
        }
        window.location.reload();
      } catch (error) {
        console.error("Error adding item:", error);
      } finally {
        setIsAdding(false);
      }
    }
  };

  const deleteItem = async (item) => {
    try {
      setDeletingItemId(item.item_id || item.id);
      const email = localStorage.getItem("email");
      if (!email) {
        console.error("Email not found in localStorage");
        return;
      }

      const userResponse = await axios.get(`${BASE_URL}/users`, {
        params: { email }
      });
      
      const userData = userResponse.data;
      const user_id = userData.user_id;
      if (!user_id) {
        console.error("User ID not found in the response");
        return;
      }

      let center_id = item.center_id;
      if (!center_id && item.centre && item.centre.center_id) {
        center_id = item.centre.center_id;
      } else if (!center_id && item.collection_centers && item.collection_centers.center_id) {
        center_id = item.collection_centers.center_id;
      }
      
      const payload = {
        item_name: item.item_name || item.name,
        category: item.category,
        item_condition: item.item_condition || item.condition,
        user_id,
        center_id: parseInt(center_id, 10)
      };

      await axios.post(
        `${BASE_URL}/ewaste-items/delete`,
        payload
      );
      
      setItems((prevItems) =>
        prevItems.filter((i) => i.item_id !== item.item_id && i.id !== item.id)
      );
      window.location.reload();
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setDeletingItemId(null);
    }
  };

  return (
    <div className="items_section_2090">
    <ContributionCount />
      <h3 className="items_heading_2090">Manage Items</h3>
      <div className="add_item_form_2090">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Item Name"
        />
        <input
          type="text"
          value={newItemCategory}
          onChange={(e) => setNewItemCategory(e.target.value)}
          placeholder="Item Category"
        />
        <select
          value={newItemCondition}
          onChange={(e) => setNewItemCondition(e.target.value)}
          className="add_item_form_2090"
        >
          <option value="" disabled>
            Select Condition ▼
          </option>
          <option value="working" className="working_option_2110">
            Working
          </option>
          <option value="damaged" className="damaged_option_2110">
            Damaged
          </option>
        </select>
        <select
          value={newItemCentre}
          onChange={handleCentreChange}
          className="add_item_form_2090"
        >
          {loadingCentres ? (
            <option>Loading centres...</option>
          ) : (
            <>
              <option value="" disabled>
                Select Centre ▼
              </option>
              {centres.map((centre) => (
                <option key={centre.center_id} value={String(centre.center_id)}>
                  {centre.center_id} - {centre.center_name} - {centre.city}
                </option>
              ))}
              <option value="find_more" className="find_more_option_2110">
                Find More....
              </option>
            </>
          )}
        </select>
        <button 
          onClick={addItem} 
          className="add_item_button_2090"
          disabled={isAdding}
        >
          {isAdding ? (
            <span className="button-loading">
              <FaSpinner className="spinner button-spinner" />
              Adding...
            </span>
          ) : (
            "Add Item"
          )}
        </button>
      </div>
      <div className="items_list_2090">
        {loadingItems ? (
          <div className="loading-spinner">
            <FaSpinner className="spinner" />
            <p>Loading items...</p>
          </div>
        ) : (
          items.map((item) => {
            const centreObj = item.centre || item.collection_centers;
            const isDeleting = deletingItemId === (item.item_id || item.id);
            
            return (
              <div key={item.item_id || item.id} className="item_box_2090">
                <img src="/assets/gadgets.jpg" alt="Gadget" className="item_image_2090" />
                <div className="item_content_2090">
                  <p><strong>Name:</strong> {item.item_name || item.name}</p>
                  <p><strong>Category:</strong> {item.category}</p>
                  <p><strong>Condition:</strong> {item.item_condition || item.condition}</p>
                  <p>
                    <strong>Centre:</strong>{" "}
                    {centreObj
                      ? `${centreObj.center_id} - ${centreObj.center_name} - ${centreObj.city}`
                      : "No centre"}
                  </p>
                  <button 
                    onClick={() => deleteItem(item)} 
                    className="delete_item_button_2090"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <span className="button-loading">
                        <FaSpinner className="spinner button-spinner" />
                        Deleting...
                      </span>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ItemsSection;