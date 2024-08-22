'use client';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/logo-club.jpg';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useEffect, useState, useTransition } from 'react';
import { TfiAgenda } from 'react-icons/tfi';
import { DropdownMenuDemo } from '../DropDown/DropDown';
import { Mobile } from './Mobile';
import { getUser } from '@/actions/users';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [pending, setTransition] = useTransition();

  const toggle = () => {
    setOpen(!open);
  };
  const getInfoUser = async () => {
    setTransition(async () => {
      const user = await getUser();
      setUser(user?.data.user);
    });
  };

  useEffect(() => {
    getInfoUser();
  }, []);

  return (
    <div className={` ${open ? '' : 'shadow-sm'} mb-5 `}>
      <div className="flex justify-between items-center py-2 px-4 mb-0">
        <div className="flex items-center gap-4">
          <Link href={'/'}>
            <Image
              src={logo}
              width={45}
              height={100}
              alt="logo"
              className="rounded-full"
            />
          </Link>
          <p className="text-sm">{pending ? 'Loading' : user?.email}</p>
        </div>
        <ul className="hidden md:px-4 md:flex items-center md:gap-4">
          <div className="flex justify-between text-sm py-3 items-center gap-2">
            <DropdownMenuDemo user={user} />
          </div>
          <div className="flex justify-between text-sm py-3 items-center gap-2">
            <span>Reservas</span> <TfiAgenda size={20} />
          </div>
        </ul>
        <RxHamburgerMenu className="md:hidden" onClick={toggle} size={35} />
      </div>

      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
          open ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <Mobile />
      </div>
    </div>
  );
};

export default Navbar;
