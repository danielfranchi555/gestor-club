import { supabase } from '@/lib/supabase';
import CardCancha from '../ui/CardCancha/CardCancha';

const page = async () => {
  const { data, error } = await supabase.from('canchas').select();
  if (error) {
    console.log(error);
  }

  return (
    <main>
      Canchas:
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 container">
        {data.map((item) => (
          <div key={item}>
            <CardCancha item={item} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default page;
