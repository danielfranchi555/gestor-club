'use client';
import { getUser } from '@/actions/users';
import { useToast } from '@/components/ui/use-toast';
import { createSupabaseFrontendClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';
import { createContext, useEffect, useState, useTransition } from 'react';
export const ContextReservation = createContext();

const ReservationContext = ({ children }) => {
  // Client supabase
  const supabase = createSupabaseFrontendClient();
  // States
  const [date, setDate] = useState(new Date());
  const [horarios, setHorarios] = useState([]);
  const [selected, setSelected] = useState({ id: null, horarioInicial: '' });
  const [error, setError] = useState('');
  const [idUser, setIdUser] = useState(null);
  // Transitions
  const [pendingReservation, setTransitionReservation] = useTransition();
  const [pendingHorarios, setTransitionHorarios] = useTransition();
  const { toast } = useToast();
  // Id de la cancha
  const { id } = useParams();

  // obtenemos la info del user
  const getInfoUser = async () => {
    const { data, error } = await getUser();
    if (error) console.log(error);
    setIdUser(data?.user?.id);
  };

  useEffect(() => {
    getInfoUser();
  }, []);

  const getHorariosReservadosPorFecha = async () => {
    setTransitionHorarios(async () => {
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
    getHorariosReservadosPorFecha();
    // Suscribirse a los cambios en tiempo real en la tabla de reservas
    const subscription = supabase
      .channel('reservas')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'reservas' },
        (payload) => {
          console.log('Nueva reserva:', payload);
          getHorariosReservadosPorFecha(); // Actualizar los horarios cuando se detecta una nueva reserva
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe(); // Limpiar la suscripción cuando el componente se desmonte
    };
  }, [date]);

  const handleReservation = async (selected, date, price) => {
    setTransitionReservation(async () => {
      try {
        if (!selected.id || !date || !idUser || !id || !price) {
          setError('Ocurrio un error intenta nuevamente');
          return { message: 'Ocurrio un error intenta nuevamente' };
        }
        // crear el objeto listo para mandar a la db
        const reservation = {
          id_horario: selected.id,
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
        setSelected({ id: null, horarioInicial: '' });
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
        getHorariosReservadosPorFecha,
        pendingHorarios,
      }}
    >
      {children}
    </ContextReservation.Provider>
  );
};

export default ReservationContext;
