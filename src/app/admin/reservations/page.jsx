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
    <div className="w-[95%] mx-auto md:container">
      reservations
      <TableData reservations={data} />
    </div>
  );
};

export default page;
