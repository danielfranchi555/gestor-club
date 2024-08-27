import NavbarAdmin from '../ui/NavbarAdmin/NavbarAdmin';

const layout = ({ children }) => {
  return (
    <main className="flex flex-col md:flex md:flex-row md:w-[100%]">
      <NavbarAdmin className="w-[50%]" />
      <div className=" w-full">{children}</div>
    </main>
  );
};

export default layout;
