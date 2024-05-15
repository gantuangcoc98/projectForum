import React from "react";
import Profileheader from "../components/Profileheader";
import avatar from "../images/logo.png";

export const Profile = () => {
  // const username = "John Doe";

  return (
    <>
      <Profileheader avatarUrl={avatar} />
      {/* username={username} */}
    </>
  );
};
