import { Loader2 } from 'lucide-react';

const loading = () => {
  return (
    <div className="w-full flex justify-center items-center h-screen">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default loading;
