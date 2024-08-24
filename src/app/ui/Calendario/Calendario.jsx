'use client';
import { Calendar } from '@/components/ui/calendar';
import Horarios from '../Horarios/Horarios';
import { useContext } from 'react';
import { ContextReservation } from '@/app/context/ReservationContext';

const Calendario = () => {
  const {
    date,
    setDate,
    horarios,
    setHorarios,
    pending,
    handleReservation,
    selected,
  } = useContext(ContextReservation);

  return (
    <div className="flex flex-col lg:flex lg:flex-col gap-10  w-full mb-10">
      <section className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow w-full  "
          />
          <span>
            fecha seleccionada: {date ? date.toLocaleDateString('en-ES') : ''}
          </span>
        </div>
        <div className="col-span-1">
          <Horarios
            pending={pending}
            setHorario={setHorarios}
            horarios={horarios}
          />
        </div>
      </section>

      <button
        className="bg-slate-800 py-2 rounded-md text-white"
        onClick={() => {
          if (!selected) {
            console.log('No se ha seleccionado ningún horario');
          } else {
            console.log('Horario seleccionado:', selected); // Confirmar que selected tiene el valor correcto
            handleReservation(selected, date);
          }
        }}
      >
        Reservar
      </button>
    </div>
  );
};

export default Calendario;
