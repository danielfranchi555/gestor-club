import ReservationContext from '../context/ReservationContext';
import Header from '../ui/Header/Header';

const layout = ({ children }) => {
  return (
    <div>
      <Header />
      <ReservationContext>
        {/* <Navbar /> */}
        {children}
      </ReservationContext>
    </div>
  );
};

export default layout;
