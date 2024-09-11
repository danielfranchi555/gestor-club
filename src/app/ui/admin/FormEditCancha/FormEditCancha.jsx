'use client';
import { handleSubmitCourtEdit } from '@/actions/admin/editCourt';
import { schemaEditCancha } from '@/app/auth/schema';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

const FormEditCancha = ({ cancha, onClose }) => {
  const [pending, setTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(schemaEditCancha),
    defaultValues: {
      name: cancha?.name,
      covered: cancha?.covered,
      available: cancha?.available,
      price: cancha?.price,
      surface_type: cancha?.surface_type,
    },
  });

  const onSubmit = (data) => {
    setTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      handleSubmitCourtEdit(data, cancha.id_cancha);
      toast({
        title: 'Court Updated success',
      });
      router.refresh();
      onClose();
    });
  };

  return (
    <div className="">
      <Form className="" {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <>
                <div className=" flex flex-col items-center justify-center gap-1 w-full">
                  <div className="flex flex-col items-center justify-center border border-gray-300 border-dashed gap-2  md:w-[300px] rounded-md p-4">
                    <Image
                      src={cancha?.image}
                      width={500}
                      height={400}
                      alt="image-cancha"
                      className="w-full rounded-md"
                    />
                    <label>
                      <FormControl>
                        <Input type="file" {...field} />
                      </FormControl>
                      <FormMessage />
                    </label>
                  </div>
                </div>
              </>
            )}
          />

          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="name Cancha" {...field} />
                    </FormControl>
                    <FormDescription>Insert the court name</FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />

            <FormField
              control={form.control}
              name="surface_type"
              render={({ field }) => (
                <>
                  <FormItem className="">
                    <FormLabel>Surface</FormLabel>
                    <Select
                      className=""
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl className="">
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder="Select a surface"
                            defaultValue={cancha?.surface_type}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="cesped">cesped</SelectItem>
                          <SelectItem value="hormigon">hormigon</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the surface of the court
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          </div>

          <div className="grid ">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>price</FormLabel>
                    <FormControl>
                      <Input
                        type="number" // Cambia el tipo a texto
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        } // Permitir cualquier valor
                      />
                    </FormControl>
                    <FormDescription>Insert the court price</FormDescription>

                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          </div>
          <div className=" grid grid-cols-2 gap-4 py-2 ">
            <FormField
              control={form.control}
              name="covered"
              render={({ field }) => (
                <div className=" h-full flex items-center justify-between">
                  <Label htmlFor=""> Covered </Label>
                  <FormControl>
                    <Switch
                      id="airplane-mode"
                      {...field}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <div className=" h-full flex items-center justify-between">
                  <Label htmlFor=""> Available </Label>
                  <FormControl>
                    <Switch
                      id="airplane-mode"
                      {...field}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
              )}
            />
          </div>
          <div className="mt-4 pt-4">
            <Button className="w-full" type="submit">
              {pending ? <Loader2 className="animate-spin" /> : 'Update'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormEditCancha;
