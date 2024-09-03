import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CiUser } from 'react-icons/ci';
import { Search } from '@/app/ui/admin/Search/Search';
import { Navigate } from '@/app/ui/admin/Navigate/Navigate';

const page = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data, error } = await supabase.from('profiles').select();

  if (error) return console.log(error);

  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <Navigate />
        <Search />
      </div>
      <div className="bg-muted/20 rounded-md p-6 ">
        <div>
          <h1>Users</h1>
          <p className="text-xs text-gray-400">
            Manage your users and view their sales performance.
          </p>
        </div>
        <Table className=" border-none rounded-md shadow-md">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-center md:text-center">
                Lastname
              </TableHead>
              <TableHead className="text-center md:text-center">
                Email
              </TableHead>
              <TableHead className="text-center md:text-center">
                Registration Data
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="flex items-center gap-2">
                  {' '}
                  <CiUser size={20} />
                  {user.username}
                </TableCell>
                <TableCell className="text-center md:center">
                  {user.lastname}
                </TableCell>
                <TableCell className="text-center md:center">
                  {user.email}
                </TableCell>
                <TableCell className="text-center md:center">
                  {user.registration_date.split('T')[0]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;
