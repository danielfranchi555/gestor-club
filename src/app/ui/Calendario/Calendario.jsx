'use client';
import { Calendar } from '@/components/ui/calendar';
import Horarios from '../Horarios/Horarios';
import { useContext } from 'react';
import { ContextReservation } from '@/app/context/ReservationContext';
import { Alert } from '../Alert/Alert';

const Calendario = ({ data }) => {
  const { date, setDate, error } = useContext(ContextReservation);

  // format date
  const options = {
    day: 'numeric', // Día del mes
    month: 'long', // Mes completo
    year: 'numeric', // Año completo
  };

  const today = new Date();
  const oneWeekFromToday = new Date(today);
  oneWeekFromToday.setDate(today.getDate() + 30);

  const { price } = data[0];

  return (
    <div className="flex flex-col lg:flex lg:flex-col gap-5 w-full ">
      <p className="text-sm">Porfavor selecciona una fecha y horario</p>

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
          <Horarios />
        </div>
      </section>
      {error ? <p className="text-center text-sm text-red-400">{error}</p> : ''}
      <Alert price={price} />
    </div>
  );
};

export default Calendario;
