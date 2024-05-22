import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('token'));

  const handleLogout = useCallback(() => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    navigate('/Login');
    window.location.reload();
  }, [navigate]);

  useEffect(() => {
    const paths = [
      { name: "Accueil", link: "/" },
      { name: "Profil", link: "/Profil" },
      !isLoggedIn ? { name: "Se connecter", link: "/Login" } : null,
      isLoggedIn ? { name: "Se déconnecter", link: "#", icon: "https://img.icons8.com/external-wanicon-lineal-wanicon/64/605ceb/external-dove-wedding-wanicon-lineal-wanicon.png" } : null,
    ].filter(Boolean); 

    const openBurgerMenuButton = document.getElementById("burger-menu-button");

    const linksContainer = document.getElementById("links");
    linksContainer.innerHTML = ''; 

    for (const [index, path] of paths.entries()) {
      const link = document.createElement("a");
      link.className = "py-4 text-3xl block transition-transform duration-500 ease-in-out translate-x-full link font-bold";
      link.id = path.name;
      link.href = path.link;
      link.style.transitionDelay = `${index * 100}ms`;
      link.style.display = "flex"; 
      link.style.alignItems = "center"; 

      if (path.icon) {
        const icon = document.createElement("img");
        icon.src = path.icon;
        icon.alt = path.name;
        icon.style.width = "60px";
        icon.style.height = "60px";
        icon.style.marginRight = "8px";
        icon.style.marginTop = "30px";
        link.appendChild(icon);
        link.appendChild(document.createElement("br")); 
      }

      link.appendChild(document.createTextNode(path.name));
      linksContainer.appendChild(link);
    }

    const dropdown = document.getElementById("dropdown");
    const links = document.querySelectorAll(".link");

    function openBurgerMenu() {
      openBurgerMenuButton.innerText = "Mon compte";
      openBurgerMenuButton.removeEventListener("click", openBurgerMenu);
      openBurgerMenuButton.addEventListener("click", closeBurgerMenu);
      dropdown.classList.remove("translate-x-full");
      dropdown.classList.add("translate-x-0", "open");
      links.forEach(link => {
        link.classList.remove("translate-x-full");
        link.classList.add("translate-x-0");
      });
    }

    function closeBurgerMenu() {
      openBurgerMenuButton.innerText = "Mon compte";
      openBurgerMenuButton.removeEventListener("click", closeBurgerMenu);
      openBurgerMenuButton.addEventListener("click", openBurgerMenu);
      links.forEach(link => {
        link.classList.remove("translate-x-0");
        link.classList.add("translate-x-full");
      });
      dropdown.classList.remove("translate-x-0", "open");
      dropdown.classList.add("translate-x-full");
    }

    openBurgerMenuButton.addEventListener("click", openBurgerMenu);
    document.getElementById("close-dropdown-button").addEventListener("click", closeBurgerMenu);

   
    if (isLoggedIn) {
      document.getElementById("Se déconnecter").addEventListener("click", handleLogout);
    }

    return () => {
      if (openBurgerMenuButton) {
        openBurgerMenuButton.removeEventListener("click", openBurgerMenu);
      }
      const closeDropdownButton = document.getElementById("close-dropdown-button");
      if (closeDropdownButton) {
        closeDropdownButton.removeEventListener("click", closeBurgerMenu);
      }
      if (isLoggedIn) {
        const logoutButton = document.getElementById("Se déconnecter");
        if (logoutButton) {
          logoutButton.removeEventListener("click", handleLogout);
        }
      }
    };
  }, [isLoggedIn, handleLogout]);

  return (
    <div className="bg-[#2C2E3A] relative h-24">
      <div id="navbar-container" className="w-full h-full">
        <img src="/src/assets/components/Navbar/logo1.png" alt="Logo" className="logo" />
        <button id="burger-menu-button" className="bg-[#605CEB] rounded-xl p-3 px-6 text-white font-bold hover:scale-105 transition-transform">Mon compte</button>
      </div>
      <div className="grid place-content-center w-screen h-screen">
        <div id="dropdown" className="fixed top-0 right-0 bg-[#1E1F26] text-white w-96 z-50 h-full translate-x-full transition-all duration-500 ease-in-out">
          <div className="mb-4 px-6 pt-6 flex items-center justify-between">
            <div className="gif-container">
              <img src="https://bernhard.ai/img/thumbnail.gif" alt="Logo" width="200" />
            </div>
            <button className="bg-[#605CEB] w-16 h-16 rounded-full grid place-content-center ml-auto" id="close-dropdown-button">
              <span className="block text-2xl font-extralight">✕</span>
            </button>
          </div>
          <h2 className="user-name opacity-60 text-xs uppercase mt-10 ml-6">pigeon voyageur</h2>
          <div className="h-[1px] w-full bg-gray-500 mt-4"></div>
          <div className="px-6" id="links">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

