import { Outlet } from "react-router-dom";

import { AuthModal } from "./components/ui/modals/AuthModal";
import { ErrorBoundaryWrapper } from "./components/errors/ErrorBoundaryWrapper";

const App = () => {
  return (
    <ErrorBoundaryWrapper>
      <AuthModal />

      <Outlet />
    </ErrorBoundaryWrapper>
  );
};

export default App;
