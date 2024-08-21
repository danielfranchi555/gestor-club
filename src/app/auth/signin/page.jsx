'use client';
import { loginAction } from '@/actions/users';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { schemaSignIn } from '../schema';
import { useForm } from 'react-hook-form';

const page = () => {
  const [pending, setTransition] = useTransition();
  const [error, setError] = useState(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schemaSignIn) });

  const handleSignIn = async (formData) => {
    setTransition(async () => {
      const { error } = await loginAction(formData);
      if (error) {
        setError(error);
        console.log(error);
      } else {
        router.refresh();
      }
    });
  };

  return (
    <div className="w-full md:h-screen flex items-center justify-center">
      <div className="w-[500px] flex flex-col px-4 py-4 gap-4">
        <h2 className="text-2xl">Login</h2>
        <p className=" font-light">
          Today is a new day.It s your day. You shape it. Sign in to start
          managing your projects.
        </p>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <div className="flex flex-col gap-4">
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
          </div>
          <button
            className="bg-slate-800 py-2 mt-2 rounded-md flex justify-center items-center w-full text-white "
            disabled={pending}
            type="submit"
          >
            {pending ? <Loader2 className="animate-spin" /> : 'Submit'}
          </button>
        </form>
        {error && (
          <span className="text-center text-red-400 text-sm">{error}</span>
        )}
        <div className="flex items-center w-full  justify-center gap-2 text-sm">
          <p>You dont have account?</p>{' '}
          <Link href={'/auth/signup'} className="text-blue-400">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
