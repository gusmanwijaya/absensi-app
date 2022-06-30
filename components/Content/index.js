import Header from "../Header";
import Navbar from "../Navbar";

const Content = ({ children, title }) => {
  return (
    <>
      <Header title={title} />
      <Navbar />

      <header className="shadow" style={{ backgroundColor: "#9BA3EB" }}>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-200">{title}</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          {children}
          {/* /End replace */}
        </div>
      </main>
    </>
  );
};

export default Content;
