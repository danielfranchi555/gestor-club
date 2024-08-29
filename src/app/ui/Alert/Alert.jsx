'use client';
import { ContextReservation } from '@/app/context/ReservationContext';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';

export function Alert({ price }) {
  const { date, pendingReservation, handleReservation, selected, error } =
    useContext(ContextReservation);

  // objeto para formatear la fecha
  const options = {
    day: 'numeric', // Día del mes
    month: 'long', // Mes completo
    year: 'numeric', // Año completo
  };

  return (
    <AlertDialog>
      {error && <p>{error}</p>}
      <AlertDialogTrigger asChild>
        <Button variant="outline" disabled={!selected.id}>
          Continuar{' '}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Estas seguro que deseas reservar el turno de{' '}
            {date?.toLocaleDateString('es-ES', options)} a las{' '}
            {selected?.horarioInicial}?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* funcion handleReservation */}
          <AlertDialogAction
            type="submit"
            onClick={() => handleReservation(selected, date, price)}
          >
            {pendingReservation ? (
              <Loader2 className="animate-spin" />
            ) : (
              ' Reservar'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
