'use client';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/logo-club.jpg';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useState } from 'react';
import { RiAccountCircleFill } from 'react-icons/ri';
import { TfiAgenda } from 'react-icons/tfi';
import { DropdownMenuDemo } from '../DropDown/DropDown';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toogle = () => {
    setOpen(!open);
  };

  return (
    <div className={` ${open ? '' : 'shadow-sm'} mb-5`}>
      <div className=" flex justify-between items-center py-3 px-4  mb-5">
        <Link href={'/'}>
          <Image
            src={logo}
            width={45}
            height={100}
            alt="logo"
            className="rounded-full"
          />
        </Link>
        <ul className="hidden  md:px-4 md:flex md:gap-4 ">
          <div className="flex justify-between text-sm py-3 items-center gap-2 ">
            <DropdownMenuDemo />
          </div>
          <div className="flex justify-between text-sm py-3 items-center gap-2">
            <span>Reservas</span> <TfiAgenda size={20} />
          </div>
          <div className="flex justify-between text-sm py-3 items-center gap-2">
            <span>Reservas</span> <TfiAgenda size={20} />
          </div>
        </ul>
        <RxHamburgerMenu
          className="md:hidden"
          onClick={() => toogle()}
          size={35}
        />
      </div>

      {open ? (
        <ul className="md:hidden px-4 grid grid-cols-1 pb-4 divide-y">
          <div className="flex justify-between text-md py-3 ">
            <span>Account</span> <RiAccountCircleFill size={25} />
          </div>
          <div className="flex justify-between text-md py-3">
            <span>Reservas</span> <TfiAgenda size={25} />
          </div>
          <div className="flex justify-between text-md py-3">
            <span>Reservas</span> <TfiAgenda size={25} />
          </div>
        </ul>
      ) : (
        ''
      )}
    </div>
  );
};

export default Navbar;
