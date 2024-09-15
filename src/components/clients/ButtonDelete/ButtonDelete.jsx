'use client';

import { deleteReservation } from '@/actions/ClientSide/reservation';

const ButtonDelete = ({ idReserva }) => {
  return (
    <button
      className="bg-red-400  px-2 py-1 rounded-md text-white hover:bg-red-500 transition-all"
      onClick={() => deleteReservation(idReserva)}
    >
      Eliminar
    </button>
  );
};

export default ButtonDelete;
