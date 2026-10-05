import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type BookingModalTab = "google-meet";

interface BookingContextType {
  isOpen: boolean;
  activeTab: BookingModalTab;
  openBookingModal: (defaultTab?: BookingModalTab) => void;
  closeBookingModal: () => void;
  setActiveTab: (tab: BookingModalTab) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<BookingModalTab>("google-meet");

  const openBookingModal = useCallback(
    (defaultTab: BookingModalTab = "google-meet") => {
      setActiveTab(defaultTab);
      setIsOpen(true);
    },
    []
  );

  const closeBookingModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        activeTab,
        openBookingModal,
        closeBookingModal,
        setActiveTab,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
