import { useState, useTransition } from 'react';
import { RiAccountCircleFill } from 'react-icons/ri';
import { TfiAgenda } from 'react-icons/tfi';
import { IoIosLogOut } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoCloseSharp } from 'react-icons/io5';
import { signOut } from '@/actions/auth/actionsAuth';

export const Mobile = () => {
  const [open, setOpen] = useState(false);
  const [pending, setTransition] = useTransition();
  const router = useRouter();

  const toggle = () => {
    setOpen(!open);
  };

  const closeSession = async () => {
    setTransition(async () => {
      const { error } = await signOut();
      if (!error) {
        router.refresh();
      }
    });
  };

  return (
    <>
      <div className="md:hidden w-full relative">
        {open ? (
          <IoCloseSharp
            color="white"
            size={35}
            className="absolute top-[-15px] right-1 z-20"
            onClick={toggle}
          />
        ) : (
          <RxHamburgerMenu onClick={toggle} size={35} />
        )}

        <div
          className={`fixed inset-0 bg-black/95 z-10 transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <div
              className="flex  justify-between items-center gap-6 w-[160px]"
              onClick={toggle}
            >
              <span className="text-start text-white text-[25px]">Account</span>
              <RiAccountCircleFill size={30} className="text-white" />
            </div>
            <Link
              href="/reservas"
              className="flex justify-between items-center gap-6 w-[160px] "
              onClick={toggle}
            >
              <span className="text-start text-white text-[25px]">
                Reservas
              </span>
              <TfiAgenda size={30} className="text-white" />
            </Link>
            <div
              className="flex justify-between items-center gap-6 w-[160px] "
              onClick={() => {
                closeSession();
                toggle();
              }}
            >
              <span className="text-start text-white text-[25px]">Log Out</span>
              <IoIosLogOut size={30} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {pending && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
          <div className="flex flex-col items-center">
            <Loader2 className="animate-spin text-white" />
            <p className="text-white text-md">Closing Session..</p>
          </div>
        </div>
      )}
    </>
  );
};
