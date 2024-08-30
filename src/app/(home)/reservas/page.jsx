import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getReservaFromIdUser, getUser } from '@/actions/data';

const page = async () => {
  // obtener la informacion del usuario
  const { user, error } = await getUser();
  if (error) {
    return error;
  }
  const idUsuario = user?.id;

  // obtenemos las reservas por a traves del id del usuario
  const { reservas, errorReserva } = await getReservaFromIdUser(idUsuario);

  if (errorReserva) {
    console.log(errorReserva);
  }

  console.log(reservas);

  return (
    <div className=" max-w-[95%] mx-auto">
      <h2 className="text-2xl font-bold py-4">Reservas</h2>
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
            <TableHead className="text-center md:text-center">Precio</TableHead>
            <TableHead className="text-center md:text-center">
              Estado del Pago
            </TableHead>
            <TableHead className="text-center md:text-center">
              Cancelar
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservas.map((res) => (
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
                <button className="bg-red-500 text-white px-2 py-1 rounded-md">
                  Cancelar
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
