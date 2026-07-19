import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-slate-900 min-h-screen">

      <Sidebar />

      <main className="flex-1">

        <Navbar />

        <div className="p-8">
          {children}
        </div>

      </main>

    </div>
  );
}