import { Outlet } from "react-router-dom";

import { ErrorBoundaryWrapper } from "./components/errors/ErrorBoundaryWrapper";

const App = () => {
  return (
    <ErrorBoundaryWrapper>
      <Outlet />
    </ErrorBoundaryWrapper>
  );
};

export default App;
