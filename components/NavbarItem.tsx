import React from 'react';

interface NavbarItemProps {
    label: string;
}

const NavbarItem: React.FC<NavbarItemProps>= (
    { label }
) => {
    return (
        <div className="text-white cursor-pointer hover:text-red-500 transition" style={{ marginLeft: '20px' }}>
            { label }
        </div>
    )
}

export default NavbarItem;