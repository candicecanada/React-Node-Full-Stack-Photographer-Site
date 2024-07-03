import { RouterProvider } from "react-router-dom";
import ProviderLayout from "./ProviderLayout";
import { Router } from "./router";
import "./App.css";
import "@mantine/core/styles.css";

function App() {
  const router = Router();
  return (
    <ProviderLayout>
      <RouterProvider router={router} />
    </ProviderLayout>
  );
}

export default App;
