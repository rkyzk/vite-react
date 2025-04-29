import "./App.css";
import Filter from "./components/Filter";
import Products from "./components/Products";

function App() {
  return (
    <div className="bg-gray-300 bg-surface mt-0 pt-3">
      <Filter />
      <Products />
    </div>
  );
}

export default App;
