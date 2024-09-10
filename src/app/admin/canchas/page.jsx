'use client';
import { createSupabaseFrontendClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { AiTwotoneSafetyCertificate, AiTwotoneStop } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { EditCancha } from '@/app/ui/admin/EditCancha/EditCancha';

const canchas = async () => {
  const [canchas, setCanchas] = useState([]);
  const supabase = createSupabaseFrontendClient();

  const getCanchas = async () => {
    const { data, error } = await supabase.from('canchas').select();
    if (error) {
      console.log(error);
    }
    setCanchas(data);
  };
  useEffect(() => {
    getCanchas();
  }, []);

  return (
    <div className="grid grid-cols-1 w-full lg:grid-cols-3  gap-6  py-4">
      {canchas.map((cancha) => (
        <div key={cancha.id} className="bg-slate-300 flex flex-col gap-4">
          <Image
            src={cancha.image}
            width={600}
            height={100}
            alt="image-cancha"
            className="w-full"
          />
          <div className="px-1 grid gap-2">
            <ul className="flex text-gray-600 items-center gap-4 w-full md:text-sm ">
              <li className="bg-slate-100 p-1 rounded-md flex  items-center gap-1">
                <p>Surface:</p> <span className=""> {cancha.surface_type}</span>
              </li>
              <li className="bg-slate-100 p-1 rounded-md flex items-center gap-1">
                <p>Available: </p>
                <span className="">
                  {' '}
                  {cancha.available ? (
                    <AiTwotoneSafetyCertificate />
                  ) : (
                    <AiTwotoneStop />
                  )}
                </span>
              </li>
              <li className="bg-slate-100 p-1 rounded-md flex items-center gap-1">
                <p>Covered:</p>{' '}
                <span className="text-sm">
                  {cancha.covered ? (
                    <AiTwotoneSafetyCertificate />
                  ) : (
                    <AiTwotoneStop />
                  )}
                </span>
              </li>
            </ul>
            <p className="">{cancha.name}</p>
          </div>
          <EditCancha cancha={cancha} />
        </div>
      ))}
    </div>
  );
};

export default canchas;
