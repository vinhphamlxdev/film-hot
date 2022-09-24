import BackTop from "components/button/BackTop";
import Footer from "./Footer";
import Header from "./Header";
import SidebarMenu from "./Sidebar";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <div className="w-full overflow-hidden">
        <Header />
        <SidebarMenu />
        <>{children}</>
        <Footer />
        <BackTop />
      </div>
    </>
  );
};
export default DefaultLayout;
