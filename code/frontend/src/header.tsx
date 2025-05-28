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
    <div className="" >
      <header className="flex flex-col justify-between h-64">
      <div className="header-icon"> {isOpen? <img src='/assets/icons/x.svg' alt="x" ref={iconRef} onClick={toggleMenu}/> : <img src='/assets/icons/three_menu_stripes_black.svg' alt="x" onClick={toggleMenu}  />} </div>
        <div className="header-icon"> <img src='/assets/icons/feather_black.svg' alt="featherIcon" /> </div>
        <p className="header-title rotate-90">
          Feather Feed
        </p>
        
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