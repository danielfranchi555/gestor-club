import CanchaDetail from '@/app/ui/CanchaDetail/CanchaDetail';
import { getCancha } from '@/actions/data';

const page = async ({ params }) => {
  const id = params.id;

  const { data, error } = await getCancha(id);
  if (error) throw error;

  return (
    <div className="w-[95%] mx-auto  ">
      <CanchaDetail data={data} />
    </div>
  );
};

export default page;
