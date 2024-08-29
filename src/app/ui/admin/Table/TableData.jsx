'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { createSupabaseFrontendClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const TableData = ({ reservations }) => {
  const router = useRouter();
  const supabase = createSupabaseFrontendClient();

  useEffect(() => {
    const channel = supabase
      .channel('realtime reservations')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reservas',
        },
        () => {
          router.refresh();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  return (
    <Table className=" border rounded-md shadow-md">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha</TableHead>
          <TableHead className="text-center md:text-right">Cancha</TableHead>
          <TableHead className="text-center md:text-right">
            Id Horario
          </TableHead>
          <TableHead className="text-center md:text-right">Precio</TableHead>
          <TableHead className="text-center md:text-right">
            Estado del Pago
          </TableHead>
          <TableHead className="text-center md:text-right">Detalle</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.map((res) => (
          <TableRow key={res.id_reserva}>
            <TableCell>{res.reserva_fecha}</TableCell>
            <TableCell className="text-center md:text-right">
              {res.id_cancha}
            </TableCell>
            <TableCell className="text-center md:text-right">
              {res.id_horario}
            </TableCell>
            <TableCell className="text-center md:text-right">
              ${res.price}
            </TableCell>
            <TableCell className="text-center md:text-right">
              {res.estado_pago}
            </TableCell>
            <TableCell className="text-center md:text-right">
              <button className="bg-blue-700 text-white px-2 py-1 rounded-md">
                Ver Detalle
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableData;
