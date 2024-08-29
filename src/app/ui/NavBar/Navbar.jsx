'use client';
import Link from 'next/link';
import { TfiAgenda } from 'react-icons/tfi';
import { DropdownMenuDemo } from '../DropDown/DropDown';
import { Mobile } from './Mobile';

const Navbar = ({ user }) => {
  return (
    <div className={` ${open ? '' : 'shadow-sm'}  `}>
      <div className="flex justify-between items-center bg-blue-200 mb-0">
        {/* // DESKTOP */}
        <ul className="hidden md:px-4 md:flex items-center md:gap-4">
          <div className="flex justify-between text-sm py-3  items-center gap-2">
            <DropdownMenuDemo user={user} />
          </div>
          <Link
            className="flex justify-between text-sm py-3 items-center gap-2"
            href="/reservas"
          >
            <span>Reservas</span> <TfiAgenda size={20} />
          </Link>
        </ul>
      </div>
      {/* // DESKTOP */}

      {/* MOBILE */}
      <Mobile />
      {/* MOBILE */}
    </div>
  );
};

export default Navbar;
