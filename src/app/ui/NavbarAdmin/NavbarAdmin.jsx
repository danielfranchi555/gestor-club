'use client';
import Link from 'next/link';
import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import logo from '../../../../public/logo-club.jpg';
import Image from 'next/image';

const NavbarAdmin = () => {
  const [open, setOpen] = useState(false);

  const nav = [
    { name: 'Dashboard', link: '/admin/dashboard' },
    { name: 'Users', link: '/admin/users' },
    { name: 'Reservations', link: '/admin/reservations' },
    { name: 'Canchas', link: '/admin/canchas' },
  ];

  return (
    <div className="bg-slate-100 flex flex-col">
      <div className="py-4 px-4 flex items-center justify-between md:flex-col">
        <Image
          src={logo}
          width={45}
          height={100}
          alt="logo"
          className="rounded-full"
        />
        <RxHamburgerMenu
          className="md:hidden"
          size={30}
          onClick={() => setOpen(!open)}
        />
        <ul className="hidden md:flex md:flex-col md:items-start md:gap-10  md:mt-10 md:h-screen">
          {nav.map((item) => (
            <Link key={item} href={item.link}>
              <li>{item.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      {open ? (
        <ul className="flex flex-col px-4 gap-4 mt-4 md:hidden">
          {nav.map((item) => (
            <Link href={item.link} key={item}>
              <li>{item.name}</li>
            </Link>
          ))}
        </ul>
      ) : (
        ''
      )}
    </div>
  );
};

export default NavbarAdmin;
