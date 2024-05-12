import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MarketingLayout;
