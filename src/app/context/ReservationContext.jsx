'use client';
import { getUser } from '@/actions/users';
import { createSupabaseFrontendClient } from '@/utils/supabase/client';
import { useParams, useRouter } from 'next/navigation';
import { createContext, useEffect, useState, useTransition } from 'react';
export const ContextReservation = createContext();

const ReservationContext = ({ children }) => {
  const [date, setDate] = useState(new Date());
  const [horarios, setHorarios] = useState([]);
  const [filteredHorarios, setFilteredHorarios] = useState([]); // Almacena los horarios filtrados por fecha
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');
  const [pendingReservation, setTransitionReservation] = useTransition();
  const supabase = createSupabaseFrontendClient();
  const [idUser, setIdUser] = useState(null);

  const router = useRouter();

  // obtenemos el id de la cancha
  const { id } = useParams();

  // obtenemos la info del user
  const getInfoUser = async () => {
    const { data, error } = await getUser();
    if (error) console.log(error);
    setIdUser(data.user.id);
  };

  useEffect(() => {
    getInfoUser();
  }, []);

  // fetching de horarios por fecha
  useEffect(() => {
    const fetchHorariosReservados = async () => {
      try {
        // obtener las reservas que coincida con la fecha y el id de la cancha que le pasamos
        const { data: reservas, error: errorReservas } = await supabase
          .from('reservas')
          .select()
          .eq('reserva_fecha', date.toISOString().split('T')[0])
          .eq('id_cancha', id);

        if (errorReservas) {
          return { data: null, error: error.message };
        }

        console.log(reservas);

        const idHorariosReservas = reservas.map((item) => item.id_horario);

        const horariosDisponibles = horarios.filter(
          (horario) => !idHorariosReservas.includes(horario.id),
        );

        // Actualizar el estado con los horarios disponibles
        setFilteredHorarios(horariosDisponibles);
      } catch (error) {
        console.error('Error al obtener horarios disponibles:', error);
      }
    };

    fetchHorariosReservados();
  }, [date]);

  const handleReservation = async (selected, date) => {
    setTransitionReservation(async () => {
      try {
        if (!selected || !date || !idUser || !id) {
          setError('no se recibio un horario');
          return { message: 'No se recibio horario o date' };
        }

        const reservation = {
          id_horario: selected,
          reserva_fecha: date.toISOString().split('T')[0],
          id_usuario: idUser && idUser,
          id_cancha: id,
        };

        // antes de insertar verificar que no haya una reserva a la misma hora el mismo dia
        const { data, error } = await supabase
          .from('reservas')
          .insert(reservation);

        if (error) {
          console.log(reservation);
          return { data: null, error: error.message };
        }

        router.refresh();
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
        filteredHorarios,
      }}
    >
      {children}
    </ContextReservation.Provider>
  );
};

export default ReservationContext;
