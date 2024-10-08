'use client';
import { Input } from '@/components/ui/input';
// import { ToastAction } from '@/components/ui/toast';
// import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaSignUp } from '../schema';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { createAccountAction } from '@/actions/auth/actionsAuth';

const page = () => {
  const [pending, setTransition] = useTransition();
  const [submited, setSubmited] = useState(false);

  const [exist, setExist] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schemaSignUp) });
  const router = useRouter();

  // const { toast } = useToast();
  const handleSignUp = (formData) => {
    console.log(formData);

    setTransition(async () => {
      const { error } = await createAccountAction(formData);
      if (error) {
        console.log(error);
        setExist(error);
        setTimeout(() => {
          setExist(null);
        }, 3000);
      } else {
        setSubmited(true);
        reset();
        router.push('/');
      }
    });
  };

  return (
    <div className="w-full  md:h-screen flex items-center justify-center">
      <div className="w-[500px] flex flex-col px-4 py-4 gap-4">
        <h2 className="text-2xl">Register</h2>
        <form onSubmit={handleSubmit(handleSignUp)} className="grid gap-3">
          <Label>Name</Label>
          <Input
            type="text"
            placeholder="name"
            name="name"
            {...register('username')}
          />
          {errors.name?.message && (
            <p className="text-red-400 text-sm">{errors.name?.message}</p>
          )}
          <Label>Lastname</Label>
          <Input
            type="text"
            placeholder="lastname"
            name="lastName"
            {...register('lastname')}
          />
          <p className="text-red-400 text-sm">{errors.lastname?.message}</p>
          <Label>Email</Label>
          <Input
            type="text"
            placeholder="email"
            name="email"
            {...register('email')}
          />
          <p className="text-red-400 text-sm">{errors.email?.message}</p>
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="password"
            name="password"
            {...register('password')}
          />
          <p className="text-red-400 text-sm">{errors.password?.message}</p>

          {exist && (
            <span className="text-red-400 text-sm text-center">{exist}</span>
          )}
          <button
            type="submit"
            className="bg-slate-800 text-white py-2 rounded-md flex items-center justify-center"
            disabled={pending}
          >
            {pending ? (
              <Loader2 className=" animate-spin" />
            ) : submited ? (
              'Check email to continue sign in process'
            ) : (
              'Submit'
            )}
          </button>
        </form>
        <div className="flex items-center w-full  justify-center gap-2 text-sm">
          <p>You have account?</p>{' '}
          <Link href={'/auth/signin'} className="text-blue-400">
            Signin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
