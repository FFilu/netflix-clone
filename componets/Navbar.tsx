import NavbarItem from "./NavbarItem";
import React from "react";

const Navbar = () => {
    return (
        <nav className="w-full fixed z-40">
            <div className="px-12 md:px-16 py-5  flex flex-row items-center transition duration-500 bg-zinc-900 bg-opacity-90">
                <img src="/images/logo.png" className="h-12 lg:h-7 md:h-10 sm:h-14" alt="Logo"/>
                <div className="flex-row ml-8 gap-7 hidden lg-flex md-flex">
                    <NavbarItem/>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;