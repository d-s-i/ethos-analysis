import React from "react";

import Logo from "./Logo"

import styles from "./Header.module.css";

const Header = () => {
    return (
        <header className={styles.header} >
            <Logo className={`${styles["redirection-menu"]}`} logoClassName="header-logo" path="ethOS" href="http://localhost:3000/" text="DepthOS" />
            Just buildin'
        </header>
    );
}

export default Header;