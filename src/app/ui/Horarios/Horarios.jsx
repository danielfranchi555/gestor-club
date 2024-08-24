import { ContextReservation } from '@/app/context/ReservationContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import SkeletonHorarios from '@/skeleton/Horarios';
import { useContext } from 'react';

const Horarios = () => {
  const { horarios, pending, selected, setSelected } =
    useContext(ContextReservation);

  const handleHour = (id) => {
    setSelected(id);
    console.log('Horario seleccionado:', id); // Debe mostrar el ID seleccionado
  };
  return (
    <ScrollArea className="h-72 w-full md:w-full  rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none text-center  ">
          Horarios
        </h4>
        {pending ? (
          <SkeletonHorarios />
        ) : (
          horarios?.map((hour) => (
            <>
              <div
                onClick={() => handleHour(hour.id)}
                key={hour.id}
                className={`text-sm flex justify-between gap-2 cursor-pointer py-2 rounded-md px-2 transition-all hover:bg-gray-100 hover:shadow-xs hover:text-black ${selected === hour.id && 'bg-slate-800  text-white'}`}
              >
                <span>{hour.horario_inicio}</span>
                <span>-</span>
                <span>{hour.horario_final}</span>
              </div>
              <Separator className="my-2" />
            </>
          ))
        )}
      </div>
    </ScrollArea>
  );
};

export default Horarios;
