'use client';
import { schemaEditCancha } from '@/app/auth/schema';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
// import { useState } from 'react';
import { useForm } from 'react-hook-form';

const FormEditCancha = ({ cancha }) => {
  // const [urlImage, setUrlImage] = useState('');

  const form = useForm({
    resolver: zodResolver(schemaEditCancha),
    defaultValues: {
      nameCancha: cancha?.name,
      covered: cancha?.covered,
      available: true,
    },
  });

  const onSubmit = (data) => console.log({ data: data });

  return (
    <Form className="bg-red-500" {...form}>
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
            <input type="file" hidden />
            <div className="flex w-28 h-9 px-2 flex-col bg-blue-600 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
              Choose File
            </div>
          </label>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="nameCancha"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="name Cancha" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <FormField
            control={form.control}
            name="surface"
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
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ''
                            ? undefined
                            : Number(e.target.value),
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <div className=" flex items-center">
            <FormField
              control={form.control}
              name="covered"
              render={({ field }) => (
                <div className="flex items-center w-full ">
                  <FormItem className="w-full">
                    <div className=" flex items-center gap-1">
                      <FormLabel>Covered</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="airplane-mode"
                            {...field}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                        {/* <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        /> */}
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <div className="flex items-center w-full ">
                  <FormItem className="w-full">
                    <div className=" flex items-center gap-1">
                      <FormLabel>Available</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="airplane-mode"
                            {...field}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                        {/* <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        /> */}
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
          </div>
        </div>
        <button type="submit">enviar</button>
      </form>
    </Form>
  );
};

export default FormEditCancha;
