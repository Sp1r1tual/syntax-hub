import { Outlet } from "react-router-dom";

import { useReopen } from "./hooks/ui/useReopen";

import { useModalsStore } from "./store/modal/useModalsStore";

import { AuthModal } from "./components/ui/modals/AuthModal";
import { ProfileModal } from "./components/ui/modals/ProfileModal";
import { ConfirmModal } from "./components/ui/modals/ConfirmModal";
import { CookieBanner } from "./components/ui/banners/CookieBanner";
import { ErrorBoundaryWrapper } from "./components/errors/ErrorBoundaryWrapper";
import { ReactQueryProvider } from "./components/providers/ReactQueryProvider";

const App = () => {
  const { openAuthModal } = useModalsStore();

  useReopen({
    storageKey: "reopenAuthModal",
    onReopen: openAuthModal,
    excludePaths: ["/terms-of-use", "/privacy-policy"],
    delay: 100,
  });

  return (
    <ErrorBoundaryWrapper>
      <ReactQueryProvider>
        <AuthModal />
        <ProfileModal />
        <ConfirmModal />

        <CookieBanner />

        <Outlet />
      </ReactQueryProvider>
    </ErrorBoundaryWrapper>
  );
};

export default App;
