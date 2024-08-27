'use client';
import { Calendar } from '@/components/ui/calendar';
import Horarios from '../Horarios/Horarios';
import { useContext } from 'react';
import { ContextReservation } from '@/app/context/ReservationContext';
import { Loader2 } from 'lucide-react';

const Calendario = ({ data }) => {
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
  // format date
  const options = {
    day: 'numeric', // Día del mes
    month: 'long', // Mes completo
    year: 'numeric', // Año completo
  };
  const today = new Date();
  const oneWeekFromToday = new Date(today);
  oneWeekFromToday.setDate(today.getDate() + 30);
  const price = data[0].price;

  return (
    <div className="flex flex-col lg:flex lg:flex-col gap-5 w-full ">
      <section className="flex flex-col lg:grid lg:grid-cols-3 gap-6 ">
        <div className="col-span-2 w-full ">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={1}
            fromDate={new Date()} // Deshabilita las fechas anteriores de la fecha actual
            toDate={oneWeekFromToday}
            className="rounded-md border shadow w-full   "
          />
          <span>
            fecha seleccionada:{' '}
            {today ? today.toLocaleDateString('es-ES', options) : ''}
          </span>
        </div>
        <div className="col-span-1">
          <Horarios setHorario={setHorarios} horarios={horarios} />
        </div>
      </section>
      {error ? <p className="text-center text-sm text-red-400">{error}</p> : ''}
      <button
        className="bg-blue-600 py-2 rounded-md text-white flex items-center justify-center w-full h-full"
        onClick={async () => {
          await handleReservation(selected, date, price);
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
