import "./header.css";
import React, { useState, useRef, useEffect } from "react";


// TODO: Dinge so umstrukturieren, dass der State für das offene menü in Header ist und das Menü auch in Header, sodass es mit width 100% die volle breite einnehmen kann

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const iconRef = useRef<HTMLImageElement>(null);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="outest-container" >
      <header className="base-header">
        <div className="header-icon"> <img src='/assets/icons/feather_orange.svg' alt="featherIcon" /> </div>
        <p className="header-title">
          Feather Feed
        </p>
        <div className="header-icon"> {isOpen? <img src='/assets/icons/close_orange.svg' alt="close menu" ref={iconRef} onClick={toggleMenu}/> : <img src='/assets/icons/menu_orange.svg' alt="menu" onClick={toggleMenu}  />} </div>
      </header>
      <Menu isOpen={isOpen} toggleMenu={toggleMenu} setIsOpen={setIsOpen} iconRef={iconRef}/> 
    </div>
  );
}


function Menu({isOpen, toggleMenu, setIsOpen, iconRef}: any) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && !iconRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="menu-container">
      {isOpen && (
        <div className="menu" ref={menuRef}>
          <div className="menu-item">Home</div>
          <div className="menu-item">Login</div>
          <div className="menu-item">Sign up</div>
          <div className="menu-item">Feed</div>
          <div className="menu-item">Create Post</div>
          <div className="menu-item">About</div>
        </div>
      )}
    </div>
  );
};



// EXPORT VARIABLES
export default Header;