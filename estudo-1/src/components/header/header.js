import React from 'react';
import './header.css';

const Header = () => (

    <div className="container-fluid">
        
        <nav className="navbar navbar-light bg_header">
            <a className="navbar-brand" href="#">
                <i class="fas fa-database"></i>
                    Operações CRUD com MySQL e NodeJS
            </a>
        </nav>

    </div>
);

export default Header;