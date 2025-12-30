import { NavLink } from "react-router";

function App() {
  return (
    <>
      <div className="text-red-500">
        123
        <NavLink to="/dataV/preview">Preview</NavLink>
        <NavLink to="/dataV/create">Create</NavLink>
      </div>
    </>
  );
}

export default App;
