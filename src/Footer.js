import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons/";


import "./Footer.css";

function Footer() {
    return (
        <div className="footer">
            <p>Coded and Designed by <a href="https://imviharevankar.github.io/portfolio/" target="_blank">Vihar Revankar</a> &copy;2020</p>

            <a href="https://www.linkedin.com/in/vihar-revankar-0428081b8/" target="_blank">
            <FontAwesomeIcon icon={faLinkedinIn} size={"2x"} /></a>

            <a href="https://github.com/imviharevankar" target="_blank"> <FontAwesomeIcon icon={faGithub} size={"2x"}/></a>

            <a href="https://www.instagram.com/imviharevankar/" target="_blank"><FontAwesomeIcon icon={faInstagram} size={"2x"}/></a>

            <a href="https://twitter.com/imVihaRevankar" target="_blank"><FontAwesomeIcon icon={faTwitter} size={"2x"}/></a>

        </div>

    )
}

export default Footer;
