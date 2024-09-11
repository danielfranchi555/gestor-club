import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import FormEditCancha from '../FormEditCancha/FormEditCancha';
import { useState } from 'react';

export function EditCancha({ cancha }) {
  const [open, setOpen] = useState(false);

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className=" w-full">
          <Button
            className="bg-blue-600 w-full hover:bg-blue-500 hover:text-white text-white"
            variant="outline"
          >
            Update
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[370px] md:w-[520px]">
        <DialogHeader>
          <DialogTitle>Edit Cancha</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-8 py-4">
          {/* // FORM */}
          <FormEditCancha cancha={cancha} onClose={handleDialogClose} />
          {/* // FORM */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
