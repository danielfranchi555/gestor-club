import { Filter } from '@/app/ui/admin/Filter/Filter';
import { Navigate } from '@/app/ui/admin/Navigate/Navigate';
import { Search } from '@/app/ui/admin/Search/Search';
import TableData from '@/app/ui/admin/Table/TableData';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const page = async ({ searchParams }) => {
  const cookieStore = cookies();
  const query = searchParams.reservationQuery || '';
  const queryFilter = searchParams.filter || '';

  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  let reservationsQuery = supabase
    .from('reservas')
    .select()
    .ilike('lastname_user', `%${query}%`);

  if (queryFilter === 'latestReservations') {
    reservationsQuery = reservationsQuery.order('reserva_fecha', {
      ascending: false,
    });
  } else if (queryFilter === 'pendingPayment') {
    reservationsQuery = reservationsQuery.eq('estado_pago', 'pendiente');
  }
  const { data, error } = await reservationsQuery;

  if (error) return console.log(error);

  return (
    <div className="">
      <div className="flex justify-between items-center py-6 ">
        <Navigate />
        <Search query={'reservationQuery'} />
      </div>
      <div className="flex justify-end  py-2">
        <Filter />
      </div>
      <TableData reservations={data} />
    </div>
  );
};

export default page;
