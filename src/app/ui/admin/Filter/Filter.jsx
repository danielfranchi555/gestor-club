'use client';
// import { orderByDate } from '@/actions/admin/clientSide/data';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export const Filter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const filterReservation = async (filter) => {
    const param = new URLSearchParams(searchParams);
    param.set('filter', filter);
    router.replace(`${pathname}?${param.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Filter</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => filterReservation('latestReservations')}
          >
            Last Reservations
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => filterReservation('pendingPayment')}>
            Pending Payment
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
