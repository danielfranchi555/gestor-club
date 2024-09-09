'use client';
import { CiUser } from 'react-icons/ci';
export const Reservation = ({ data }) => {
  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex flex-col gap-">
        <p className="font-bold">Recent Reservations</p>
        <p className="text-sm">You made 265 sales this month.</p>
      </div>
      <ul className="flex flex-col gap-2">
        {data?.slice(0, 10).map((reserva) => (
          <li key={reserva.id_reserva} className="flex justify-between">
            <div className="flex gap-2 items-center">
              <CiUser size={20} />
              <div className="flex flex-col">
                <span>{reserva.name_user}</span>
                <span className="text-xs text-gray-600">
                  {reserva.email_user}{' '}
                </span>
              </div>
            </div>
            <span>${reserva.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
