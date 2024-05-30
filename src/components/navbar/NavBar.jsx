import { ArrowLeftIcon, Battery100Icon } from "@heroicons/react/20/solid";
import React from "react";

const ProfileIcon = ({icon}) => {
    return (
        <div className="profile">
            {icon}
        </div>
    );
};

const NavBar = () => {
    return(
        <div className="
            fixed top-0 flex w-screen h-16 bg-primary_container text-primary
        ">
            <ProfileIcon icon={<Battery100Icon/>}/>
            <ProfileIcon icon={<ArrowLeftIcon/>}/>
        </div>
    );
};

export default NavBar;