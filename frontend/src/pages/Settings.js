import React, { useState } from "react";
import Profileheader from "../components/Profileheader";
import SideNavbar from "../components/SideNavbar";

export const Settings = () => {
  // Hardcoded user data
  const initialData = {
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    password: "password123",
  };

  const [firstName, setFirstName] = useState(initialData.firstName);
  const [lastName, setLastName] = useState(initialData.lastName);
  const [username, setUsername] = useState(initialData.username);
  const [email, setEmail] = useState(initialData.email);
  const [password, setPassword] = useState(initialData.password);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    // Handle save logic here, such as sending the data to an API
    console.log({
      firstName,
      lastName,
      username,
      email,
      password,
    });
    setIsEditing(false); // Disable editing after save
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <>
      <div className="flex ">
        <div className="flex-col w-full ml-64">
          <Profileheader />
          {/* <ProfileContent /> */}
          <div className="main-content mt-10 px-4">
            <div className="max-w-xl p-5 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <form onSubmit={handleSave}>
                <div className="mb-4">
                  <label
                    htmlFor="firstName"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="lastName"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex justify-end">
                  {isEditing ? (
                    <button
                      type="submit"
                      className="bg-main-maroon text-white py-2 px-4 rounded"
                    >
                      Save Changes
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="bg-main-maroon text-white py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="fixed top-0 w-64 h-full bg-main-maroon text-white flex flex-col items-center py-4">
          <SideNavbar />
        </div>
      </div>
    </>
  );
};
