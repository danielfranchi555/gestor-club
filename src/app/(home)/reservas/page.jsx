import { getReservaFromIdUser, getUser } from '@/actions/data';

const page = async () => {
  // obtener la informacion del usuario
  const { user, error } = await getUser();
  if (error) {
    return error;
  }
  const idUsuario = user.id;

  // obtenemos las reservas por a traves del id del usuario
  const { reservas, errorReserva } = await getReservaFromIdUser(idUsuario);
  if (errorReserva) {
    console.log(errorReserva);
  }

  return (
    <div>
      {reservas.map((item) => (
        <>
          <div>
            <p>Fecha: {item.reserva_fecha}</p>
            <p>Cancha: {item.id_canchas}</p>
            <p>Precio: {item.price}</p>
          </div>
        </>
      ))}
    </div>
  );
};

export default page;
