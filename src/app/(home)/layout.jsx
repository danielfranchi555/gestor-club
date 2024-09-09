import ReservationContext from '../context/ReservationContext';
import Header from '../ui/Header/Header';
import { ThemeProvider } from '@/components/theme-provider';

const layout = ({ children }) => {
  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header />
        <ReservationContext>
          {/* <Navbar /> */}
          {children}
        </ReservationContext>
      </ThemeProvider>
    </div>
  );
};

export default layout;
