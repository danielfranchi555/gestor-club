import { getUser } from '@/actions/data';
import Navbar from '../NavBar/Navbar';
import Image from 'next/image';
import logo from '../../../../public/logo-club.jpg';
import Link from 'next/link';
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
        <span className="text-sm">{user?.email}</span>
      </div>
      <Navbar user={user} />
    </div>
  );
};

export default Header;
