'use client';
import { Calendar } from '@/components/ui/calendar';
import Horarios from '../Horarios/Horarios';
import { useContext } from 'react';
import { ContextReservation } from '@/app/context/ReservationContext';
import { Loader2 } from 'lucide-react';

const Calendario = () => {
  const {
    date,
    setDate,
    horarios,
    setHorarios,
    pendingReservation,
    handleReservation,
    selected,
    error,
  } = useContext(ContextReservation);

  return (
    <div className="flex flex-col lg:flex lg:flex-col gap-5  w-full ">
      <section className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow w-full  "
          />
          <span>
            fecha seleccionada: {date ? date.toISOString().split('T')[0] : ''}
          </span>
        </div>
        <div className="col-span-1">
          <Horarios setHorario={setHorarios} horarios={horarios} />
        </div>
      </section>
      {error && <p className="text-center text-sm text-red-400">{error}</p>}
      <button
        className="bg-slate-800 py-2 rounded-md text-white flex items-center justify-center w-full h-full"
        onClick={async () => {
          await handleReservation(selected, date);
        }}
      >
        {pendingReservation ? (
          <Loader2 className=" animate-spin text-center" />
        ) : (
          'Reservar'
        )}
      </button>
    </div>
  );
};

export default Calendario;
