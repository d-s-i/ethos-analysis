import React from "react";

import buidl from "./buidl.png";
import arte from "./arte.png";
import unifi from "./unifi.png";
import ethOS from "./ethOS-logo.png";
import externalLinkLogo from "./external-link.svg"
import styles from "./Logo.module.css";

const Logo = (props) => {
    let src;
    const isDisplay = props.displayExternalLink;

    if(props.path === "Buidl") src = buidl;
    if(props.path === "Arte") src = arte;
    if(props.path === "Unifi") src = unifi;
    if(props.path === "ethOS") src = ethOS;
    
    return (
        <a href={props.href} className={`${props.className}`} >
            <img src={src} alt="logo" className={styles[`${props.logoClassName}`]} />
            <div className={styles["external-link"]} >
                {props.text}
                {isDisplay && <img src={externalLinkLogo} alt="external link" />}
            </div>
        </a>
    );
}

export default Logo;