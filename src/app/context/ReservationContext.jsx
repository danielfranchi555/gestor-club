'use client';
import { getUser } from '@/actions/ClientSide/user';
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
  const [user, setUser] = useState(null);

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
    setUser(data?.user.user_metadata);
  };

  useEffect(() => {
    getInfoUser();
  }, []);

  const getHorariosReservadosPorFecha = async () => {
    setTransitionHorarios(async () => {
      try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const currentHour = currentDate.toTimeString().split(' ')[0]; // Hora actual en formato 'HH:MM:SS'

        // Obtener todos los horarios posteriores a la hora actual
        const { data: horariosData, error: horariosError } = await supabase
          .from('horarios')
          .select()
          .gt('horario_inicio', currentHour); // Filtrar por horarios que no han pasado

        if (horariosError) throw new Error(horariosError.message);

        // Obtener las reservas para la fecha seleccionada
        const { data: reservasData, error: reservasError } = await supabase
          .from('reservas')
          .select('id_horario')
          .eq('reserva_fecha', formattedDate)
          .eq('id_cancha', id);

        if (reservasError) throw new Error(reservasError.message);

        // Filtrar las reservas ya ocupadas
        const reservedIds = reservasData
          .map((reserva) => reserva.id_horario)
          .filter((id) => id !== null && id !== ''); // Filtrar IDs inválidos

        // Filtrar los horarios que no están reservados
        const filteredHorarios = horariosData.filter(
          (horario) => !reservedIds.includes(horario.id),
        );

        // Setear los horarios filtrados
        setHorarios(filteredHorarios);
      } catch (error) {
        return { message: error };
      }
    });
  };

  useEffect(() => {
    if (id) {
      getHorariosReservadosPorFecha();
      // Suscribirse a los cambios en tiempo real en la tabla de reservas
      const subscription = supabase
        .channel('reservas')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'reservas' },
          (payload) => {
            getHorariosReservadosPorFecha(); // Actualizar los horarios cuando se detecta una nueva reserva
          },
        )
        .subscribe();

      return () => {
        subscription.unsubscribe(); // Limpiar la suscripción cuando el componente se desmonte
      };
    }
  }, [date, id]);

  const handleReservation = async (selected, date, price) => {
    if (user) {
      setTransitionReservation(async () => {
        try {
          if (!selected.id || !date || !idUser || !id || !price || !user) {
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
            name_user: user.username,
            lastname_user: user.lastname,
            email_user: user.email,
          };

          // antes de insertar verificar que no haya una reserva a la misma hora el mismo dia
          const { data, error } = await supabase
            .from('reservas')
            .insert(reservation);

          if (error) {
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
    }
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
