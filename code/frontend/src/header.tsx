import "./header.css";


function Header() {

  return (
      <header className="base-header">
        <div className="base-header-icon"> <img src='/assets/icons/feather_black.svg' alt="featherIcon" /> </div>
        <p className="header-title small-title">
          Feather Feed
        </p>
        <div className="base-header-icon"> <img src="/assets/icons/three_menu_stripes_black.svg" alt="menuIcon" /> </div>
      </header>
  );
}

export default Header;
