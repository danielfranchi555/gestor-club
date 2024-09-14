import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { IoIosAddCircleOutline } from 'react-icons/io';
import FormAddCourt from '../FormAddCourt/FormAddCourt';
import { useState } from 'react';

const AddCourt = () => {
  const [open, setOpen] = useState(false);

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          Add Court <IoIosAddCircleOutline />{' '}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Court</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        {/* FORM  */}
        <FormAddCourt onClose={handleDialogClose} />
        {/* FORM  */}
      </DialogContent>
    </Dialog>
  );
};

export default AddCourt;
