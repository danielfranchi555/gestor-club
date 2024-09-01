import { ContextReservation } from '@/app/context/ReservationContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import SkeletonHorarios from '@/skeleton/Horarios';
import { createSupabaseFrontendClient } from '@/utils/supabase/client';
import { useContext, useEffect } from 'react';

const Horarios = () => {
  const {
    selected,
    setSelected,
    getHorariosReservadosPorFecha,
    horarios,
    pendingHorarios,
  } = useContext(ContextReservation);

  const supabase = createSupabaseFrontendClient();

  useEffect(() => {
    getHorariosReservadosPorFecha();
    const subscription = supabase
      .channel('reservas')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'reservas' },
        (payload) => {
          console.log('Nueva reserva:', payload);
          getHorariosReservadosPorFecha(); // Actualizar los horarios cuando se detecta una nueva reserva
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe(); // Limpiar la suscripción cuando el componente se desmonte
    };
  }, []);

  const handleHour = (id, horario) => {
    const formatedHour = horario.slice(0, -3);
    setSelected({ id: id, horarioInicial: formatedHour });
  };

  return (
    <ScrollArea className="h-72 w-full md:w-full  rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none text-center  ">
          Horarios Disponibles
        </h4>
        {pendingHorarios ? (
          <SkeletonHorarios />
        ) : (
          horarios?.map((hour) => (
            <div key={hour.id}>
              <div
                onClick={() => handleHour(hour.id, hour.horario_inicio)}
                className={`text-sm flex justify-between gap-2 cursor-pointer py-2 rounded-md px-2 hover:shadow-xs ${selected.id && selected.id === hour.id ? 'bg-blue-700  text-white' : ''}`}
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
