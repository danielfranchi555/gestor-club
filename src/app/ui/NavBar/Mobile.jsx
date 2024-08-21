import { useState, useTransition } from 'react';
import { RiAccountCircleFill } from 'react-icons/ri';
import { TfiAgenda } from 'react-icons/tfi';
import { IoIosLogOut } from 'react-icons/io';
import { signOut } from '@/actions/users';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

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
      <ul className="md:hidden px-4 grid grid-cols-1 pb-4 divide-y">
        <div
          className="flex justify-between text-md py-3 flex-col gap-4"
          onClick={toggle}
        >
          <div className="flex items-center justify-between">
            <span className="text-[20px]">Account</span>{' '}
            <RiAccountCircleFill size={30} />
          </div>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              open ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div
              className="flex items-center justify-between"
              onClick={() => closeSession()}
            >
              <span>Log Out</span>
              <IoIosLogOut size={22} />
            </div>
          </div>
        </div>

        <div className="flex justify-between text-md py-3">
          <span className="text-[20px]">Reservas</span> <TfiAgenda size={30} />
        </div>
      </ul>
      {pending ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
          <div className="flex flex-col items-center">
            <Loader2 className="animate-spin text-white" />
            <p className="text-white text-md">Closing Session..</p>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};
