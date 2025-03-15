import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import "../Profile/Profile.css";

const Admin = () => {
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [designation, setDesignation] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [role, setRole] = useState("");

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userEmail = localStorage.getItem("email"); // Get email from local storage
        const userRole = localStorage.getItem("role"); // Get role from local storage

        if (!userEmail || !userRole) {
          console.error("Email or role not found in local storage");
          setLoadingProfile(false);
          return;
        }

        setRole(userRole); // Set role in state

        // Fetch profile data
        const response = await axios.post("http://localhost:3000/profile", {
          email: userEmail,
          role: userRole,
        });

        const profileData = response.data;
        setName(profileData.name);
        setEmail(profileData.email);
        setPhone(profileData.phone);
        if (userRole === "user") {
          setCity(profileData.city);
        } else if (userRole === "admin") {
          setDesignation(profileData.designation);
        }
        setLoadingProfile(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const userEmail = localStorage.getItem("email"); // Get email from local storage
      const userRole = localStorage.getItem("role"); // Get role from local storage

      if (!userEmail || !userRole) {
        console.error("Email or role not found in local storage");
        return;
      }

      // Prepare the data to be updated
      const updateData = {
        email: userEmail,
        name,
        phone,
        ...(userRole === "user" ? { city } : { designation }),
      };

      // Send the update request to the backend
      const response = await axios.post("http://localhost:3000/update-profile", {
        ...updateData,
        role: userRole,
      });

      console.log("Profile updated successfully:", response.data);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Error updating profile. Please try again.");
    }
  };

  // Show loading spinner until profile data is loaded.
  if (loadingProfile) {
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
    <div className="profile_page_2090">
      <div className="profile_container_2090">
        <h2 className="profile_heading_2090">Profile</h2>
        <div className="profile_content_2090">
          {/* Profile Photo Section */}
          <div className="profile_photo_section_2090">
            <div className="profile_photo_2090">
              <img
                src={profilePhoto || "/assets/profile.jpg"}
                alt="Profile"
                className="profile_image_2090"
              />
            </div>
            <input
              id="photo_upload_input_2090"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="photo_upload_input_2090"
            />
            <label
              htmlFor="photo_upload_input_2090"
              className="photo_upload_label_2090"
            >
              Choose Photo
            </label>
          </div>

          {/* Profile Details Section */}
          <div className="profile_details_2090">
            <div className="profile_field_2090">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="profile_field_2090">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled
              />
            </div>
            <div className="profile_field_2090">
              <label>Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
            {role === "user" ? (
              <div className="profile_field_2090">
                <label>City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter your city"
                />
              </div>
            ) : (
              <div className="profile_field_2090">
                <label>Designation</label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="Enter your designation"
                />
              </div>
            )}
            {/* Submit Button */}
            <button onClick={handleSubmit} className="submit_button_2090">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin




