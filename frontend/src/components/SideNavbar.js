import React from "react";

const SideNavbar = ({ setActiveSection }) => {
  return (
    <div className="fixed left-0 top-50 h-2/3 w-64 bg-dark-white text-main-maroon border-r-4 border-main-maroon flex flex-col items-center py-4">
      <button
        onClick={() => setActiveSection("posts")}
        className="py-2 px-4 w-full text-center hover:bg-light-gold mb-4"
      >
        Posts
      </button>
      <button
        onClick={() => setActiveSection("answers")}
        className="py-2 px-4 w-full text-center hover:bg-light-gold mb-4"
      >
        Answers
      </button>
      <button
        onClick={() => setActiveSection("tags")}
        className="py-2 px-4 w-full text-center hover:bg-light-gold"
      >
        Tags
      </button>
    </div>
  );
};

export default SideNavbar;
