import { Outlet } from "react-router-dom";

import { AuthModal } from "./components/ui/modals/AuthModal";
import { ProfileModal } from "./components/ui/modals/ProfileModal";
import { ErrorBoundaryWrapper } from "./components/errors/ErrorBoundaryWrapper";

const App = () => {
  return (
    <ErrorBoundaryWrapper>
      <AuthModal />
      <ProfileModal />

      <Outlet />
    </ErrorBoundaryWrapper>
  );
};

export default App;
