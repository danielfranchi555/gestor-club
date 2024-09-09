'use client';
import { useToast } from '@/components/ui/use-toast';
import { createSupabaseFrontendClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useRealtime = (typeQuery, table) => {
  // utils

  const supabase = createSupabaseFrontendClient();
  const router = useRouter();
  const { toast } = useToast();

  // states
  const [count, setCount] = useState(0);

  useEffect(() => {
    const channel = supabase
      .channel('realtime countReservation')
      .on(
        'postgres_changes',
        {
          event: `*`, // escucha todos los cambios
          schema: 'public',
          table: `${table}`,
        },
        (payload) => {
          // si el tipo de evento es insert
          if (payload.eventType === 'INSERT') {
            setCount((prevCount) => prevCount + 1);
            toast({
              title: 'A new reservation has been added!',
            });
            router.refresh();
          }
          if (payload.eventType === 'DELETE') {
            setCount((prevCount) => prevCount - 1);
            toast({
              title: 'A reservation has been deleted!',
            });
            router.refresh();
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  console.log(count);

  return { setCount, count };
};

export default useRealtime;
