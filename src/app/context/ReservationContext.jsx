'use client';
import { getUser } from '@/actions/users';
import { useToast } from '@/components/ui/use-toast';
import { createSupabaseFrontendClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';
import { createContext, useEffect, useState, useTransition } from 'react';
export const ContextReservation = createContext();

const ReservationContext = ({ children }) => {
  const [date, setDate] = useState(new Date());
  const [horarios, setHorarios] = useState([]);
  // const [filteredHorarios, setFilteredHorarios] = useState([]); // Almacena los horarios filtrados por fecha
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');
  const [pendingReservation, setTransitionReservation] = useTransition();
  const [pendingHorarios, setTransitionHorarios] = useTransition();
  const supabase = createSupabaseFrontendClient();
  const [idUser, setIdUser] = useState(null);
  const { toast } = useToast();

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

  const getHorariosReservados = async () => {
    setTransitionHorarios(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        // Obtener todos los horarios
        const { data: horariosData, error: horariosError } = await supabase
          .from('horarios')
          .select();

        if (horariosError) throw new Error(horariosError.message);

        // Formatear la fecha a 'YYYY-MM-DD'
        const formattedDate = new Date(date).toISOString().split('T')[0];

        // Obtener las reservas para la fecha seleccionada
        const { data: reservasData, error: reservasError } = await supabase
          .from('reservas')
          .select('id_horario')
          .eq('reserva_fecha', formattedDate)
          .eq('id_cancha', id);
        if (reservasError) throw new Error(reservasError.message);

        console.log({ reservas: reservasData });

        // Asegurarse de que horario_id solo contenga valores válidos

        const reservedIds = reservasData
          .map((reserva) => reserva.id_horario)
          .filter((id) => id !== null && id !== ''); // Filtra IDs inválidos

        console.log(reservedIds);

        // Filtrar los horarios no reservados en el frontend
        const filteredHorarios = horariosData.filter(
          (horario) => !reservedIds.includes(horario.id),
        );

        // Setear los horarios filtrados
        setHorarios(filteredHorarios);
      } catch (error) {
        console.error('Error al obtener horarios o reservas:', error.message);
      }
    });
  };

  useEffect(() => {
    getHorariosReservados();
  }, [date]);

  const handleReservation = async (selected, date, price) => {
    setTransitionReservation(async () => {
      try {
        if (!selected || !date || !idUser || !id || !price) {
          setError('No has seleccionado una fecha u horario');
          return { message: 'Selecciona un horario y fecha correcta' };
        }

        const reservation = {
          id_horario: selected,
          reserva_fecha: date.toISOString().split('T')[0],
          id_usuario: idUser && idUser,
          id_cancha: id,
          price: price,
        };

        // antes de insertar verificar que no haya una reserva a la misma hora el mismo dia
        const { data, error } = await supabase
          .from('reservas')
          .insert(reservation);

        if (error) {
          console.log(reservation);
          return { data: null, error: error.message };
        }

        toast({
          title: 'Reserva Exitosa!',
          description: 'Friday, February 10, 2023 at 5:57 PM',
        });
        getHorariosReservados();
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
        getHorariosReservados,
        pendingHorarios,
      }}
    >
      {children}
    </ContextReservation.Provider>
  );
};

export default ReservationContext;
