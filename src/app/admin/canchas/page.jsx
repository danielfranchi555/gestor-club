'use client';
import { createSupabaseFrontendClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { AiTwotoneSafetyCertificate, AiTwotoneStop } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { EditCancha } from '@/app/ui/admin/EditCancha/EditCancha';
import { Navigate } from '@/app/ui/admin/Navigate/Navigate';

const canchas = async () => {
  const [canchas, setCanchas] = useState([]);
  const supabase = createSupabaseFrontendClient();

  const getCanchas = async () => {
    const { data, error } = await supabase
      .from('canchas')
      .select()
      .order('id_cancha', { ascending: true });

    if (error) {
      console.log(error);
    }
    setCanchas(data);
  };

  useEffect(() => {
    getCanchas();
  }, []);

  return (
    <>
      <div className="py-10">
        <Navigate />
      </div>
      <div className=" grid grid-cols-1 w-full lg:grid-cols-3  gap-6  py-4">
        {canchas?.map((cancha) => (
          <div
            key={cancha.id}
            className="border flex flex-col gap-4 rounded-md p-4 bg-red-500"
          >
            <div className="relative rounded-md">
              <div className="w-full h-[290px]">
                <Image
                  src={cancha.image}
                  width={600}
                  height={700}
                  alt="image-cancha"
                  className=" w-full h-full rounded-md "
                />
              </div>
              <div className="w-full absolute bg-black/50 top-0 h-full"></div>
              <div
                className={`${cancha.available ? 'bg-blue-600' : 'bg-gray-400'} absolute top-2 w-[100px] py-2  right-2 px-2 rounded-md text-white`}
              >
                {cancha.available ? (
                  <div className="flex items-center gap-1">
                    <span className="text-sm">Available: </span>{' '}
                    <AiTwotoneSafetyCertificate />
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="text-sm">Available: </span>{' '}
                    <AiTwotoneStop />
                  </div>
                )}
              </div>
            </div>
            <div className="px-1 grid gap-2">
              <ul className="flex text-gray-600 items-center gap-4 w-full md:text-sm ">
                <li className="bg-slate-100 p-1 rounded-md flex  items-center gap-1">
                  <p>Surface:</p>{' '}
                  <span className=""> {cancha.surface_type}</span>
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
    </>
  );
};

export default canchas;
