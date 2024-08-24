'use client';
import { createSupabaseFrontendClient } from '@/utils/supabase/client';
import { createContext, useEffect, useState, useTransition } from 'react';
export const ContextReservation = createContext();

const ReservationContext = ({ children }) => {
  const [date, setDate] = useState(new Date());
  const [horarios, setHorarios] = useState(null);
  const [pending, setTransition] = useTransition();
  const [selected, setSelected] = useState(null);
  const supabase = createSupabaseFrontendClient();

  useEffect(() => {
    setTransition(async () => {
      try {
        const { data, error } = await supabase.from('horarios').select();
        if (error) return { data: null, error: error.message };

        setHorarios(data);
      } catch (error) {
        return { message: error };
      }
    });
  }, []);

  const handleReservation = (selected, date) => {
    // query insert supabase
    // info insert : dateTime, hour
    if (!selected) {
      console.log('no se recibio un horario');
      return;
    }

    console.log({ selected, date: date.toLocaleDateString() });
  };
  return (
    <ContextReservation.Provider
      value={{
        date,
        horarios,
        pending,
        selected,
        setSelected,
        handleReservation,
        setDate,
      }}
    >
      {children}
    </ContextReservation.Provider>
  );
};

export default ReservationContext;
