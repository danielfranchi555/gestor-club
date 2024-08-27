import { getCanchas } from '@/actions/data';
import Card from '../ui/Card/Card';

const page = async () => {
  const { data, error } = await getCanchas();

  if (error) throw error;

  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 container">
        {data?.map((item) => (
          <div key={item}>
            <Card data={item} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default page;
