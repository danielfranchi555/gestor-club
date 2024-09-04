'use client';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import logo from '../../../../public/logo-club.jpg';
import Image from 'next/image';
import { FiHome } from 'react-icons/fi';
import { CgNotes } from 'react-icons/cg';
import { LuUsers } from 'react-icons/lu';
import { GiTennisCourt } from 'react-icons/gi';
import { GoSignOut } from 'react-icons/go';
import { signOut } from '@/actions/users';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
const NavbarAdmin = () => {
  const [open, setOpen] = useState(false);
  const [pending, setTransition] = useTransition();
  const router = useRouter();

  const closeSession = async () => {
    setTransition(async () => {
      const { data, error } = await signOut();
      if (error) {
        console.log(error);
      }
      console.log({ message: data });

      router.refresh();
    });
  };

  const nav = [
    { name: 'Dashboard', link: '/admin', icon: <FiHome size={25} /> },
    { name: 'Users', link: '/admin/users', icon: <LuUsers size={25} /> },
    {
      name: 'Reservations',
      link: '/admin/reservations',
      icon: <CgNotes size={25} />,
    },
    {
      name: 'Canchas',
      link: '/admin/canchas',
      icon: <GiTennisCourt size={25} />,
    },
    {
      name: 'Sign out',
      link: '',
      icon: <GoSignOut onClick={() => closeSession()} size={25} />,
    },
  ];

  if (pending) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin text-white" />
          <p className="text-white text-md">Closing Session..</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" flex flex-col bg-muted/20 ">
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
        <ul className="hidden md:flex md:flex-col md:items-start md:gap-4  md:mt-10 md:h-screen">
          {nav.map((item) => (
            <Link key={item} href={item.link}>
              <li className="hover:scale-105 transition-transform duration-300 ease-in-out">
                {item.icon}
              </li>
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
