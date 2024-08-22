import { signOut } from '@/actions/users';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';

export function DropdownMenuDemo({ user }) {
  const [pending, setTransition] = useTransition();
  const router = useRouter();

  const closeSession = async () => {
    setTransition(async () => {
      const { data, error } = await signOut();
      if (error) {
        console.log(error);
      }
      console.log({ message: data });

      router.refresh();
    });
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Account</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem>Edit Profile</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <div onClick={() => closeSession()}>
            <DropdownMenuItem className="cursor-pointer">
              Log out
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      {pending ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
          <div className="flex flex-col items-center">
            <Loader2 className="animate-spin text-white" />
            <p className="text-white text-md">Closing Session..</p>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
