import Image from 'next/image';
import imageCancha from '../../../../../public/imagen-cancha.jpg';
import { AiTwotoneSafetyCertificate, AiTwotoneStop } from 'react-icons/ai';
import { Alert } from '@/app/ui/Alert/Alert';
import { createSupabaseServerClient } from '@/utils/supabase/server';

const page = async ({ params }) => {
  const id = params.id;
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('canchas')
    .select(
      `
    id_cancha,
  name,
  surface_type,
  available,
  covered,
  horarios(
   id,
   horario_inicio,
   horario_final)
`,
    )
    .eq('id_cancha', id);

  if (error) throw error;

  console.log(data);

  return (
    <div className="w-[95%] mx-auto  md:grid md:grid-cols-2 gap-2">
      <Image
        className="rounded-md md:w-full h-full object-cover"
        src={imageCancha}
        width={500}
        height={500}
        alt="image"
      />
      <article className=" grid grid-cols-1 gap-2">
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <p className="bg-slate-100 font-light px-2 py-1 rounded-md">
            {data[0].surface_type}
          </p>
          <p className="bg-slate-100 font-light px-2 py-1 rounded-md flex items-center gap-1">
            Habilitada:
            {data[0].available === true ? (
              <AiTwotoneSafetyCertificate size={20} />
            ) : (
              'Deshabilitada'
            )}
          </p>
          <p className="bg-slate-100 font-light px-2 py-1 rounded-md flex items-center gap-1">
            Cubierta: {data[0].covered ? 'si' : <AiTwotoneStop />}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2 md:w-full">
          <h2 className="text-2xl">Turnos</h2>
          {/* <p>{formattedDate}</p> */}
          {data[0].horarios.map((item) => (
            <div className="flex w-full justify-between " key={item.id}>
              <div className="border flex items-center gap-6 justify-between w-[200px]">
                <p>{item.id}</p>
                <p>{item.horario_inicio}</p>
                <p>{item.horario_final}</p>
              </div>
              <Alert data={item} />
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};

export default page;
