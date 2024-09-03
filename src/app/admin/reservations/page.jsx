import { Navigate } from '@/app/ui/admin/Navigate/Navigate';
import TableData from '@/app/ui/admin/Table/TableData';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const page = async () => {
  const cookieStore = cookies();

  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.from('reservas').select();

  if (error) return console.log(error);

  console.log(data);

  return (
    <div className="">
      <div className="flex justify-between items-center py-6 ">
        <Navigate />
      </div>
      <TableData reservations={data} />
    </div>
  );
};

export default page;
