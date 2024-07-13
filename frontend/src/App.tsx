import { QueryClient, QueryClientProvider } from "react-query";
import EntriesPage from "./components/EntriesPage";

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <EntriesPage />
        </header>
      </div>
    </QueryClientProvider>
  );
}

export default App;
