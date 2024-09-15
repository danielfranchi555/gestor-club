import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import NavbarAdmin from '../ui/admin/NavbarAdmin/NavbarAdmin';

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
        <Toaster />
      </main>
    </ThemeProvider>
  );
};

export default layout;
