import NavbarAdmin from '../ui/NavbarAdmin/NavbarAdmin';
import { ThemeProvider } from '@/components/theme-provider';

const layout = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="flex flex-col h-full md:flex-row md:w-[100%] ">
        <NavbarAdmin className="h-auto" />
        <div className="w-full  ">
          <div className="px-4 ">{children}</div>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default layout;
