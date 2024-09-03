import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
const Reservas = () => {
  const reservas = [1, 2, 3, 4, 5];

  return (
    <Table className=" border rounded-md shadow-md">
      <TableHeader>
        <TableRow className="text-xs md:text-[14px]">
          <TableHead>Fecha</TableHead>
          <TableHead className="text-center md:text-center ">Cancha</TableHead>
          <TableHead className="text-center md:text-center">Horario</TableHead>
          <TableHead className="text-center md:text-center">Precio</TableHead>
          <TableHead className="text-center md:text-center">
            Estado del Pago
          </TableHead>
          <TableHead className="text-center md:text-center">Cancelar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservas?.map((res) => (
          <TableRow key={res} className="text-xs md:text-[14px]">
            <TableCell className="  py-5">
              {' '}
              <div className="bg-gray-300 h-5 rounded-md animate-pulse"></div>
            </TableCell>
            <TableCell className="text-center md:text-center   py-5">
              {' '}
              <div className="bg-gray-300 h-5 rounded-md animate-pulse"></div>
            </TableCell>
            <TableCell className="text-center md:text-center   py-5">
              {' '}
              <div className="bg-gray-300 h-5 rounded-md animate-pulse"></div>
            </TableCell>
            <TableCell className="text-center md:text-center   py-5">
              {' '}
              <div className="bg-gray-300 h-5 rounded-md animate-pulse"></div>
            </TableCell>
            <TableCell className="text-center md:text-center   py-5">
              {' '}
              <div className="bg-gray-300 h-5 rounded-md animate-pulse"></div>
            </TableCell>
            <TableCell className="text-center md:text-center   py-5">
              {' '}
              <div className="bg-gray-300 h-5 rounded-md animate-pulse"></div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Reservas;
