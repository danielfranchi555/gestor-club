'use client';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaAddCourt } from '@/app/auth/schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { addCourt } from '@/actions/admin/clientSide/editCourt';
import { useState, useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const FormAddCourt = ({ onClose }) => {
  const form = useForm({ resolver: zodResolver(schemaAddCourt) });
  const [existName, setExistName] = useState('');
  const [loading, setTransition] = useTransition();

  const { toast } = useToast();

  const onSubmit = (data) => {
    // Usa `startTransition` para iniciar la transición
    setTransition(async () => {
      const { message } = await addCourt(data);
      if (message === 'The court name already exists.') {
        setExistName(message);
      } else {
        toast({
          title: 'Court Updated successfully',
        });
        onClose(); // Cierra el modal
        location.reload();
      }
    });
  };
  return (
    <div className="grid gap-4 py-4 ">
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            name="image"
            render={({ field }) => (
              <FormItem>
                <span className="text-sm">Image Court</span>
                <FormControl>
                  <Input
                    className="border-primary bg-white"
                    type="file"
                    onChange={(e) => field.onChange(e.target.files[0])} // Guarda el primer archivo
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <span className="text-sm">Name Court</span>
                <FormControl>
                  <Input
                    className="border-primary bg-white"
                    placeholder="Your Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="surface"
            render={({ field }) => (
              <FormItem>
                <span className="text-sm">Surface</span>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a surface" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cesped">cesped</SelectItem>
                    <SelectItem value="hormigon">hormigon</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <span className="text-sm">Price</span>
                <FormControl>
                  <Input
                    type="number" // Cambia el tipo a texto
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))} // Permitir cualquier valor
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <FormField
              control={form.control}
              name="covered"
              render={({ field }) => (
                <div className="flex justify-between items-center ">
                  <span className="flex justify-center items-center ">
                    Covered
                  </span>
                  <FormControl>
                    <Switch {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <div className="flex justify-between items-center">
                  <span className="flex justify-center items-center ">
                    Available
                  </span>
                  <FormControl>
                    <Switch {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              )}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {' '}
            {loading ? <Loader2 className="animate-spin" /> : 'Submit'}{' '}
          </Button>
          {existName && (
            <span className="text-sm text-red-500 text-center">
              {existName}
            </span>
          )}
        </form>
      </Form>
    </div>
  );
};

export default FormAddCourt;
