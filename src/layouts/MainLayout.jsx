import SideBar from "../components/SideBar/SideBar";

const MainLayout = ({ children }) => {
  return <SideBar>{children}</SideBar>;
};
export default MainLayout;
