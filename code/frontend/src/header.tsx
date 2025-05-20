import "./Header.css";
import React, { useState } from "react";


// TODO: Dinge so umstrukturieren, dass der State für das offene menü in Header ist und das Menü auch in Header, sodass es mit width 100% die volle breite einnehmen kann

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(isOpen? false : true);
  };

  return (
    <>
      <header className="base-header">
        <div className="base-header-icon"> <img src='/assets/icons/feather_black.svg' alt="featherIcon" /> </div>
        <p className="base-header-title">
          Feather Feed
        </p>
        <div className="base-header-icon"> <img src='/assets/icons/three_menu_stripes_black.svg' alt="x" onClick={toggleMenu}/> </div>
      </header>
      <MenuButton isOpen={isOpen}/> 
    </>
  );
}


function MenuButton({isOpen}: any) {
  
  return (
    <div style={{ position: "relative", display: "inline-block", width: "100vw"}}>

      {isOpen && (
        <div className="menu">
          <div style={{ padding: "8px", cursor: "pointer" }}>🔧 Einstellung</div>
          <div style={{ padding: "8px", cursor: "pointer" }}>📁 Öffnen</div>
          <div style={{ padding: "8px", cursor: "pointer" }}>❌ Schließen</div>
        </div>
      )}
    </div>
  );
};



// EXPORT VARIABLES
export default Header;