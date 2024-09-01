import Image from 'next/image';
import canchaimg from '../../../../public/imagen-cancha.jpg';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Card = ({ data }) => {
  return (
    <div className="relative w-full">
      <div className="relative">
        <Image src={canchaimg} className="relative" alt="image" />
        <div className="bg-black/40 w-full h-full top-0 absolute"></div>
        <div className="absolute top-0 text-white flex flex-col w-full h-full justify-center items-center">
          <p>{data.name}</p>
          <Link href={`/cancha/${data.id_cancha}`}>
            <Button className="">Reservar</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
