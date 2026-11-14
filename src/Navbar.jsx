import { useContext } from "react";
import { LocaleContext } from "./context/LocaleContext";

const navbar = [{ id: "Deteksi", en: "Detection" }];
const Navbar = ({ toggleLocale }) => {
  const locale = useContext(LocaleContext);
  const handleClick = (e) => {
    e.preventDefault();
    toggleLocale();
  };
  return (
    <nav className="mx-auto text-center cursor-pointer text-[#E22867] py-6 flex justify-between">
      <h1 className="font-bold">Karies</h1>
      <ul>
        {navbar.map((nav, i) => (
          <li key={i} className="border-b-2 inline p-2 font-bold">
            {locale === "id" ? nav.id : nav.en}
          </li>
        ))}
      </ul>
      <button onClick={handleClick} className="cursor-pointer">
        {locale === "id" ? "EN" : "ID"}
      </button>
    </nav>
  );
};

export default Navbar;
