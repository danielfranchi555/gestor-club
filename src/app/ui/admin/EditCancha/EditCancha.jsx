import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import FormEditCancha from '../FormEditCancha/FormEditCancha';

export function EditCancha({ cancha }) {
  return (
    <Dialog className="">
      <DialogTrigger asChild>
        <Button variant="outline">Editar</Button>
      </DialogTrigger>
      <DialogContent className="w-[370px] md:w-[520px]">
        <DialogHeader>
          <DialogTitle>Edit Cancha</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-8 py-4">
          {/* SELECT IMAGE  */}

          {/* SELECT IMAGE  */}
          <FormEditCancha cancha={cancha} />
        </div>
        <DialogFooter>
          <Button className="w-full" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
