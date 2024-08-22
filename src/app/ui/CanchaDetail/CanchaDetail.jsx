import Image from 'next/image';
import imagecancha from '../../../../public/imagen-cancha.jpg';
import { AiTwotoneSafetyCertificate, AiTwotoneStop } from 'react-icons/ai';

const CanchaDetail = ({ data }) => {
  console.log(data);

  return (
    <div className="grid grid-cols-1 md:grid md:grid-cols-2  w-full">
      <Image
        src={imagecancha}
        width={800}
        height={100}
        alt="img-cancha"
        className="col-span-1 rounded-md shadow-md"
      />
      <section className="flex flex-col gap-2 px-4 ">
        <p className="font-bold text-2xl">{data[0].name}</p>
        <div className="flex items-center gap-2">
          <span className="font-light text-sm py-1 flex items-center gap-1 bg-slate-100 px-2 rounded-md">
            <p>Available</p>
            {data[0].available === true ? (
              <AiTwotoneSafetyCertificate />
            ) : (
              <AiTwotoneStop />
            )}
          </span>
          <span className="font-light text-sm py-1 flex items-center bg-slate-100 px-2 gap-1 rounded-md">
            Covered
            {data[0].covered === true ? (
              <AiTwotoneSafetyCertificate />
            ) : (
              <AiTwotoneStop />
            )}
          </span>
          <span className="font-light text-sm py-1 flex items-center bg-slate-100 px-2 gap-1 rounded-md">
            Surface: {data[0].surface_type}
          </span>
        </div>
      </section>
    </div>
  );
};

export default CanchaDetail;
