import { Outlet } from "react-router-dom";

import { AuthModal } from "./components/ui/modals/AuthModal";
import { ProfileModal } from "./components/ui/modals/ProfileModal";
import { ErrorBoundaryWrapper } from "./components/errors/ErrorBoundaryWrapper";
import { ReactQueryProvider } from "./components/providers/ReactQueryProvider";

const App = () => {
  return (
    <ErrorBoundaryWrapper>
      <ReactQueryProvider>
        <AuthModal />
        <ProfileModal />

        <Outlet />
      </ReactQueryProvider>
    </ErrorBoundaryWrapper>
  );
};

export default App;
