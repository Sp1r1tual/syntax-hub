import { Outlet } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import { ReactQueryProvider } from "./components/providers/ReactQueryProvider";

import { useReopen } from "./hooks/ui/useReopen";

import { useModalsStore } from "./store/modal/useModalsStore";

import { AuthModal } from "./components/ui/modals/AuthModal";
import { ProfileModal } from "./components/ui/modals/ProfileModal";
import { ConfirmModal } from "./components/ui/modals/ConfirmModal";
import { CookieBanner } from "./components/ui/banners/CookieBanner";
import { ErrorBoundaryWrapper } from "./components/errors/ErrorBoundaryWrapper";

const App = () => {
  const { openAuthModal } = useModalsStore();

  useReopen({
    storageKey: "reopenAuthModal",
    onReopen: openAuthModal,
    excludePaths: ["/terms-of-use", "/privacy-policy", "/community-rules"],
  });

  return (
    <ErrorBoundaryWrapper>
      <ReactQueryProvider>
        <SkeletonTheme
          baseColor="var(--skeleton-base)"
          highlightColor="var(--skeleton-highlight)"
        >
          <AuthModal />
          <ProfileModal />
          <ConfirmModal />

          <CookieBanner />

          <Outlet />
        </SkeletonTheme>
      </ReactQueryProvider>
    </ErrorBoundaryWrapper>
  );
};

export default App;
