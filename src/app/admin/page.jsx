import { CiUser } from 'react-icons/ci';
import { TfiAgenda } from 'react-icons/tfi';
import { GiTennisCourt } from 'react-icons/gi';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Reservation } from '@/app/ui/admin/Table/Reservation/Reservation';
import { Metrics } from '@/app/ui/admin/Metrics/Metrics';
import { Navigate } from '../ui/admin/Navigate/Navigate';

const Dashboard = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data, error } = await supabase.from('reservas').select(); // Selecciona todas las reservas y los perfiles relacionados
  if (error) {
    return console.log(error);
  }

  console.log(data);

  return (
    <div className="w-full flex flex-col gap-5">
      <div className=" py-4">
        <Navigate />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border px-2 shadow-md rounded-md py-4 flex items-center gap-4">
          <TfiAgenda className=" rounded-md  " size={40} />{' '}
          <div className="flex flex-col">
            <span className="text-gray-400">Reservas</span>
            <span className="font-bold text-2xl">120</span>
          </div>
        </div>
        <div className="border px-2 shadow-md rounded-md py-4 flex items-center gap-4">
          <CiUser size={50} />{' '}
          <div className="flex flex-col">
            <span className="text-gray-400">Users</span>
            <span className="font-bold text-2xl">20</span>
          </div>
        </div>
        <div className="border px-2 shadow-md rounded-md py-4 flex items-center gap-4">
          <GiTennisCourt size={50} />{' '}
          <div className="flex flex-col">
            <span className="text-gray-400">Canchas</span>
            <span className="font-bold text-2xl">3</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-5 gap-4">
        <div className="col-span-3  rounded-md">
          <Metrics />
        </div>
        <div className="col-span-2 border rounded-md ">
          <Reservation data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
