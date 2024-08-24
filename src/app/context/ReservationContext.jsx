'use client';
import { getUser } from '@/actions/users';
import { createSupabaseFrontendClient } from '@/utils/supabase/client';
import { createContext, useEffect, useState, useTransition } from 'react';
export const ContextReservation = createContext();

const ReservationContext = ({ children }) => {
  const [date, setDate] = useState(new Date());
  const [horarios, setHorarios] = useState(null);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');
  const [pendingReservation, setTransitionReservation] = useTransition();
  const supabase = createSupabaseFrontendClient();

  const [idUser, setIdUser] = useState(null);

  const getInfoUser = async () => {
    const { data, error } = await getUser();
    if (error) console.log(error);

    setIdUser(data.user.id);
  };

  useEffect(() => {
    getInfoUser();
  }, []);

  useEffect(() => {
    console.log({ fecha: date.toISOString().split('T')[0] });
    // consultar a la tabla reservas si ya existe una con la misma y fecha y horario
    const fetchHorariosReservados = async () => {
      const { data, error } = await supabase
        .from('reservas')
        .select()
        .eq('reserva_fecha', date.toISOString().split('T')[0]);

      if (error) return { data: null, error: error.message };

      console.log(data);
    };

    fetchHorariosReservados();
  }, [date]);

  const handleReservation = async (selected, date) => {
    setTransitionReservation(async () => {
      try {
        if (!selected || !date || !idUser) {
          setError('no se recibio un horario');
          return { message: 'No se recibio horario o date' };
        }
        const reservation = {
          id_horario: selected,
          reserva_fecha: date.toISOString().split('T')[0],
          id_usuario: idUser && idUser,
        };

        // antes de insertar verificar que no haya una reserva a la misma hora el mismo dia

        const { data, error } = await supabase
          .from('reservas')
          .insert(reservation);

        if (error) {
          console.log(reservation);

          return { data: null, error: error.message };
        }

        return { data, error: null };
      } catch (error) {
        return { message: error };
      }
    });
  };

  return (
    <ContextReservation.Provider
      value={{
        date,
        horarios,
        selected,
        setSelected,
        handleReservation,
        setDate,
        setHorarios,
        pendingReservation,
        error,
      }}
    >
      {children}
    </ContextReservation.Provider>
  );
};

export default ReservationContext;
