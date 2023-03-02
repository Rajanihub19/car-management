import { Routes, Route } from "react-router-dom";
import Add from "../../pages/Category/Add";
import View from "../../pages/Category/View";
import Home from "../../pages/Home";
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/view" element={<View />} />
      <Route path="/category/add" element={<Add />} />
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  );
};
export default AllRoutes;
