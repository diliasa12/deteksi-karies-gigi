import React from "react";
const navbar = ["Deteksi"];
const Navbar = () => {
  return (
    <nav className="text-center cursor-pointer text-[#E22867] py-6">
      <ul>
        {navbar.map((nav, i) => (
          <li key={i} className="border-b-2 inline p-2 font-bold">
            {nav}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
