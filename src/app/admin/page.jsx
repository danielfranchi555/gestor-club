'use client';
import { CiUser } from 'react-icons/ci';
import { TfiAgenda } from 'react-icons/tfi';
import { GiTennisCourt } from 'react-icons/gi';
import { Reservation } from '@/app/ui/admin/Table/Reservation/Reservation';
import { Metrics } from '@/app/ui/admin/Metrics/Metrics';
import { Navigate } from '../ui/admin/Navigate/Navigate';
import { createSupabaseFrontendClient } from '@/utils/supabase/client';
import { useEffect, useState, useTransition } from 'react';
import useRealtime from '../Hooks/useRealtime';
import { Loader2 } from 'lucide-react';
import { getCountUsers } from '@/actions/ClientSide/user';

const Dashboard = () => {
  const supabase = createSupabaseFrontendClient();
  const [profilesCount, setProfilesCount] = useState(0);
  const [data, setData] = useState([]);
  const [pending, setTransition] = useTransition();

  const { count, setCount } = useRealtime('insert', 'reservas');

  const fetchData = async () => {
    setTransition(async () => {
      const { data: reservationData, error: reservationError } = await supabase
        .from('reservas')
        .select();
      if (reservationError) {
        console.log(reservationError);
      } else {
        setData(reservationData);
        setCount(reservationData.length); // Set initial reservation count
      }

      const { data: profilesData, error: profilesError } =
        await getCountUsers();
      if (profilesError) {
        console.log(profilesError);
      } else {
        setProfilesCount(profilesData);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            <span className="font-bold text-2xl">
              {pending ? <Loader2 className="animate-spin" /> : count}
            </span>
          </div>
        </div>
        <div className="border px-2 shadow-md rounded-md py-4 flex items-center gap-4">
          <CiUser size={50} />{' '}
          <div className="flex flex-col">
            <span className="text-gray-400">Users</span>
            <span className="font-bold text-2xl">
              {pending ? <Loader2 className="animate-spin" /> : profilesCount}
            </span>
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
