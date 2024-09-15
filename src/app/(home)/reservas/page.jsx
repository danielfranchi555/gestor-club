'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ButtonDelete from '@/components/clients/ButtonDelete/ButtonDelete';
import { useEffect, useState, useTransition } from 'react';
import { createSupabaseFrontendClient } from '@/utils/supabase/client';
import Reservas from '@/skeleton/Reservas';
import { getUser } from '@/actions/ClientSide/user';

const page = () => {
  const [userId, setUserId] = useState(null);
  const [reservas, setReservas] = useState(null);
  const [loading, setTransition] = useTransition();
  const supabase = createSupabaseFrontendClient();

  const getUserId = async () => {
    const {
      data: { user },
      error,
    } = await getUser();
    if (error) {
      console.log(error);
    }
    setUserId(user.id);
  };

  const getReservaFromIdUser = async () => {
    setTransition(async () => {
      const { data, error } = await supabase
        .from('reservas')
        .select(
          `
      *,
      horarios (
        *
      )
    `,
        )
        .eq('id_usuario', userId);

      if (error) {
        console.log(error);
      }
      setReservas(data);
    });
  };

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      getReservaFromIdUser(userId);
      const subscription = supabase
        .channel('reservas')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'reservas' },
          (payload) => {
            console.log('Reserva eliminada:', payload);
            // Volver a obtener las reservas después de la eliminación
            getReservaFromIdUser();
          },
        )
        .subscribe();

      return () => {
        subscription.unsubscribe(); // Limpiar la suscripción cuando el componente se desmonte
      };
    }
  }, [userId]);

  return (
    <div className=" max-w-[95%] mx-auto">
      <h2 className="text-2xl font-bold py-4">Reservas</h2>
      {loading ? (
        <div className="">
          <Reservas />
        </div>
      ) : (
        <Table className=" border rounded-md shadow-md">
          <TableHeader>
            <TableRow className="text-xs md:text-[14px]">
              <TableHead>Fecha</TableHead>
              <TableHead className="text-center md:text-center ">
                Cancha
              </TableHead>
              <TableHead className="text-center md:text-center">
                Horario
              </TableHead>
              <TableHead className="text-center md:text-center">
                Precio
              </TableHead>
              <TableHead className="text-center md:text-center">
                Estado del Pago
              </TableHead>
              <TableHead className="text-center md:text-center">
                Cancelar
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservas?.map((res) => (
              <TableRow key={res.id_reserva} className="text-xs md:text-[14px]">
                <TableCell>{res.reserva_fecha}</TableCell>
                <TableCell className="text-center md:text-center">
                  {res.id_cancha}
                </TableCell>
                <TableCell className="text-center md:text-center">
                  {res.horarios.horario_inicio} - {res.horarios.horario_final}
                </TableCell>
                <TableCell className="text-center md:text-center">
                  ${res.price}
                </TableCell>
                <TableCell className="text-center md:text-center">
                  {res.estado_pago}
                </TableCell>
                <TableCell className="text-center md:text-center">
                  <ButtonDelete idReserva={res.id_reserva} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default page;
