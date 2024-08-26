import { ContextReservation } from '@/app/context/ReservationContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import SkeletonHorarios from '@/skeleton/Horarios';
import { createSupabaseFrontendClient } from '@/utils/supabase/client';
import { useContext, useEffect, useTransition } from 'react';

const Horarios = () => {
  const {
    selected,
    setSelected,
    setHorarios,
    filteredHorarios,
    horarios,
    date,
  } = useContext(ContextReservation);
  const [pending, setTransition] = useTransition();

  const supabase = createSupabaseFrontendClient();

  useEffect(() => {
    setTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const { data, error } = await supabase.from('horarios').select();
        if (error) return { data: null, error: error.message };

        setHorarios(data);
      } catch (error) {
        return { message: error };
      }
    });
  }, [date]);

  const handleHour = (id) => {
    setSelected(id);
    console.log('Horario seleccionado:', id); // Debe mostrar el ID seleccionado
  };

  const horariosFilter =
    filteredHorarios.length > 0 ? filteredHorarios : horarios;

  console.log(horariosFilter);

  return (
    <ScrollArea className="h-72 w-full md:w-full  rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none text-center  ">
          Horarios Disponibles
        </h4>
        {pending ? (
          <SkeletonHorarios />
        ) : (
          horariosFilter?.map((hour) => (
            <div key={hour.id}>
              <div
                onClick={() => handleHour(hour.id)}
                className={`text-sm flex justify-between gap-2 cursor-pointer py-2 rounded-md px-2 transition-all hover:bg-gray-100 hover:shadow-xs hover:text-black ${selected === hour.id && 'bg-slate-800  text-white'}`}
              >
                <span>{hour.horario_inicio}</span>
                <span>-</span>
                <span>{hour.horario_final}</span>
              </div>
              <Separator className="my-2" />
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
};

export default Horarios;
