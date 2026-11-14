import Navbar from "./Navbar";
import InputContainer from "./InputContainer";
import { LocaleContext } from "./context/LocaleContext";
import { useState } from "react";

const App = () => {
  const [locale, setLocale] = useState("id");
  const toggleLocale = () =>
    setLocale((prevState) => (prevState === "id" ? "en" : "id"));
  return (
    <LocaleContext.Provider value={locale}>
      <div className="w-full max-w-9/10 mx-auto">
        <Navbar toggleLocale={toggleLocale} />
        <InputContainer />
      </div>
    </LocaleContext.Provider>
  );
};

export default App;
