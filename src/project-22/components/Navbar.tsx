import { NavLink } from "react-router-dom";

const Navabar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">My Logo</div>
      <ul className="navbar__links">
        <NavLink to="/food-recipes/" end className="navbar__link">Home</NavLink>
        <NavLink to="/food-recipes/favorites" className="navbar__link">Favorites</NavLink>
      </ul>
    </nav>
  );
}

export default Navabar;