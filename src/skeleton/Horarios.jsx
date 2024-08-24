import { ScrollArea } from '@radix-ui/react-scroll-area';

const SkeletonHorarios = () => {
  const horarios = [1, 2, 3, 4, 5, 6, 7, 8, 10];

  return (
    <>
      <ScrollArea className="h-72 w-full md:w-full  rounded-md  flex flex-col gap-4">
        {horarios.map(() => (
          <>
            <span className="bg-gray-300 animate-pulse rounded-full h-4"></span>
          </>
        ))}
      </ScrollArea>
    </>
  );
};
export default SkeletonHorarios;
