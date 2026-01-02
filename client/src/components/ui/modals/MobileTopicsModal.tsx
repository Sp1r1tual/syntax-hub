import { useModalsStore } from "@/store/modal/useModalsStore";

import { ModalWrapper } from "./ModalWrapper";
import { QuestionSidebar } from "../side/QuestionSidebar";

export const MobileTopicsModal = () => {
  const { isMobileTopicsOpen, closeMobileTopicsModal } = useModalsStore();

  return (
    <ModalWrapper
      title="Теми"
      isOpen={isMobileTopicsOpen}
      onClose={closeMobileTopicsModal}
    >
      <QuestionSidebar />
    </ModalWrapper>
  );
};
