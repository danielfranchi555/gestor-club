import ReservationContext from '../context/ReservationContext';
import Navbar from '../ui/NavBar/Navbar';

const layout = ({ children }) => {
  return (
    <div>
      <ReservationContext>
        <Navbar />
        {children}
      </ReservationContext>
    </div>
  );
};

export default layout;
