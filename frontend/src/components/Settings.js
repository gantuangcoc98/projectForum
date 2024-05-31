import { useState } from "react";
import { updateUser } from "./Function";

export const Settings = ({profileData}) => {

  const [settingsButtonDesign, setSettingsButtonDesign] = useState("font-semibold w-full h-fit text-[20px] py-[5px] pl-[15px] rounded-[30px] bg-dark-white hover:cursor-pointer");

  const [firstName, setFirstName] = useState(profileData.firstName);
  const [lastName, setLastName] = useState(profileData.lastName);
  const [email, setEmail] = useState(profileData.email);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [firstNameEmpty, setFirstNameEmpty] = useState(false);
  const [lastNameEmpty, setLastNameEmpty] = useState(false);
  const [oldPasswordEmpty, setOldPasswordEmpty] = useState(false);
  const [oldPasswordIncorrect, setOldPasswordIncorrect] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const saveProfile = async () => {
    if (firstName === "") {
      setFirstNameEmpty(true);
    } else if (lastName === "") setLastNameEmpty(true);
    else if (oldPassword === "") setOldPasswordEmpty(true);
    else if (oldPassword !== profileData.password) setOldPasswordIncorrect(true);
    else if (newPassword !== "") {
      if (newPassword !== confirmNewPassword) setPasswordMismatch(true);
      else {
        const userData = {
          "userId": profileData.userId,
          "username": profileData.username,
          "firstName": firstName,
          "lastName": lastName,
          "email": email,
          "password": newPassword
        }

        const response = await updateUser(userData);

        if (response === 1) {
          console.log("Successfully updated profile.");
          window.location.reload();
        } else {
          console.log("Failed to update profile.");
        }
      }
    } else {
      const userData = {
        "userId": profileData.userId,
        "username": profileData.username,
        "password": profileData.password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email
      }

      const response = await updateUser(userData);

      if (response === 1) {
        console.log("Successfully updated profile.");
        window.location.reload();
      } else {
        console.log("Failed to update profile.");
      }
    }
  }

  return (
    <div className="flex h-fit w-full gap-[50px]">
      <div className="flex h-fit w-[20%]">
        <div className="flex w-full h-fit flex-col pr-[10px] border-r border-border-line">
          <span className={settingsButtonDesign}>Personal Info</span>
        </div>
      </div>

      <div className="flex flex-col gap-[10px] w-[60%] h-fit">
        <span className="text-[20px] font-semibold">Edit Profile</span>

        <div className="flex gap-[20px] h-fit w-full">
          <label htmlFor="firstName" className="flex flex-col gap-[5px] w-full h-fit">
            <div className="flex gap-[10px] w-fit h-fit">
              First Name
              {firstNameEmpty && <span className="text-[12px] text-red-500">Please input first name</span> }
            </div>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setFirstNameEmpty(false);
              }}
              className="p-[5px] bg-transparent focus:outline-none border border-black focus:border-main-maroon focus:border-2"
            />
          </label>

          <label htmlFor="lastName" className="flex flex-col gap-[5px] w-full h-fit">
            <div className="flex gap-[10px] w-fit h-fit">
              Last Name
              {lastNameEmpty && <span className="text-[12px] text-red-500">Please input last name</span> }
            </div>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setLastNameEmpty(false);
              }}
              className="p-[5px] bg-transparent focus:outline-none border border-black focus:border-main-maroon focus:border-2"
            />
          </label>
        </div>

        <label htmlFor="email" className="flex flex-col gap-[5px] w-full h-fit">
            Email
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="p-[5px] bg-transparent focus:outline-none border border-black focus:border-main-maroon focus:border-2"
            />
        </label>

        <label htmlFor="oldPassword" className="flex flex-col gap-[5px] w-full h-fit">
            <div className="flex gap-[10px] w-fit h-fit">
              Old Password
              {oldPasswordIncorrect && <span className="text-[12px] text-red-500">Incorrect old password</span> }
              {oldPasswordEmpty && <span className="text-[12px] text-red-500">Please input old password to save changes</span> }
            </div>
            <input
              id="oldPassword"
              type="password"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
                setOldPasswordEmpty(false);
                setOldPasswordIncorrect(false);
              }}
              className="p-[5px] bg-transparent focus:outline-none border border-black focus:border-main-maroon focus:border-2"
            />
        </label>

        <label htmlFor="newPassword" className="flex flex-col gap-[5px] w-full h-fit">
            New Password
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setPasswordMismatch(false);
              }}
              className="p-[5px] bg-transparent focus:outline-none border border-black focus:border-main-maroon focus:border-2"
            />
        </label>

        <label htmlFor="confirmNewPassword" className="flex flex-col gap-[5px] w-full h-fit">
            <div className="flex gap-[10px] w-fit h-fit">
              Confirm New Password
              {passwordMismatch && <span className="text-[12px] text-red-500">Password mismatch</span> }
            </div>
            <input
              id="confirmNewPassword"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => {
                setConfirmNewPassword(e.target.value);
                setPasswordMismatch(false);
              }}
              className="p-[5px] bg-transparent focus:outline-none border border-black focus:border-main-maroon focus:border-2"
            />
        </label>

        <div className="flex mt-[10px] items-center justify-end">
          <div className="flex gap-[20px] h-fit w-fit">
            <button className="py-[5px] px-[20px] text-[14px] font-semibold text-white rounded-[12px] bg-light-maroon hover:cursor-pointer hover:bg-main-maroon"
              onClick={() => saveProfile()}>
              Save Changes
            </button>

            <button className="text-[14px] font-semibold text-main-maroon hover:text-lighter-maroon hover:cursor-pointer"
              onClick={() => window.location.reload()}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}