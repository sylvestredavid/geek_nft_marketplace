import React, {useState} from "react"
import {Link, useLocation} from "react-router-dom";

import './Header.css'

const Header = ({input}) => {
    const location = useLocation();
    const [showCreateSub, setShowCreateSub] = useState(false)
    return (
        <header className="header">
            <Link to={"/"} className="header_title">Geek nft</Link>
            {input}
            <nav>
                <ul className="header_nav">
                    <li className={location.pathname === "/explore" ? "currentRoute" : null}>
                        <Link to="/explore">Explorer</Link>
                    </li>
                    <li className={location.pathname === "/explore-categories" ? "currentRoute" : null}>
                        <Link to="/explore-categories">Catégories</Link>
                    </li>
                    <li onMouseEnter={() => setShowCreateSub(true)} onMouseLeave={() => setShowCreateSub(false)}>
                        <div className="createSubMenu">
                            <p>Créer</p>
                            {
                                showCreateSub && (
                                    <div className="createSubMenu_container">
                                        <Link to="/create">NFT</Link>
                                        <Link to="/create-category">Catégorie</Link>
                                    </div>
                                )
                            }
                        </div>
                    </li>
                    <li className={location.pathname === "/mes-nft" ? "currentRoute" : null}>
                        <Link to="/mes-nft">Mes nfts</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
