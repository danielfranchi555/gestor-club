import Navbar from '../NavBar/Navbar';
import Image from 'next/image';
import logo from '../../../../public/logo-club.jpg';
import Link from 'next/link';
import { getUser } from '@/actions/serverSide/data';
const Header = async () => {
  const { user, error } = await getUser();
  if (error) {
    console.log(error);
  }

  return (
    <div className="flex items-center justify-between py-4 md:py-2 px-5 mb-10 shadow-md">
      <div className="flex items-center gap-4">
        <Link href={'/'}>
          <Image
            src={logo}
            width={50}
            height={100}
            alt="logo"
            className="rounded-full w-[40px]"
          />
        </Link>
        <span className="text-sm md:text-md ">
          <span>Bienvenido</span> {''}
          <span className="font-bold">
            {user?.user_metadata.username[0].toUpperCase() +
              user?.user_metadata.username?.slice(1)}
          </span>
        </span>
      </div>
      <Navbar user={user?.user_metadata} />
    </div>
  );
};

export default Header;
