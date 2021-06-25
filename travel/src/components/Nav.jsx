import React from 'react';
import { Link } from "react-router-dom";

function Nav( ) {

    return (
        <div>
        <nav>
            <ul className="navStyle">
                <Link to="/home">
                    <li>Home</li>
                </Link>
                <Link to="/newDestination">
                    <li>Add New Destination</li>
                </Link>
                <Link to="/futureDestinations">
                    <li>Future Destinations</li>
                </Link>
                {/* We dont need this here because we are gonne 
                get to it from a button on the list of dest, so 
                we know which one to edit. 
                <Link to="/editDestination">
                    <li>Edit Destinations</li>
                </Link> */}
            </ul>
            </nav>        
        </div>
    );
}

export default Nav;