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
    <div className="h-screen flex w-24 bg-opacity-10 bg-gray-950" >
      <header className="flex flex-col">
      <div className="flex flex-col justify-start"><p className="header-title text-center p-1">
          Feather Feed
        </p></div>
        <div className="header-icon cursor-pointer h-24 p-8" ref={iconRef} onClick={toggleMenu}> {isOpen? <img  src='/assets/icons/x_white.svg'  alt="x" /> : <img src='/assets/icons/menu30x25_white.svg' alt="x" onClick={toggleMenu}  />} </div>
        <div className="header-icon cursor-pointer p-8"> <img className="w-8" src='/assets/icons/feather_white.svg' alt="featherIcon" /> </div>
        
        <div className="header-icon cursor-pointer hover: p-8"> <img src='/assets/icons/plus_white.svg' alt="create post" /> </div>
        <div className="header-icon cursor-pointer p-8"> <img src='/assets/icons/account_white.svg' alt="manage account" /> </div>
        
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