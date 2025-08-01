// eslint-disable-next-line no-unused-vars
import React, { Children } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout =({children}) => {
    return (
    < >
        <Header />
        <div className="content"> {children} </div>
        <Footer/>
    </>
    );
};

export default Layout;