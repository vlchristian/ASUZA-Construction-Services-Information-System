import HeaderWithSidebar from "@/components/layouts/HeaderWithSidebar";



export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <HeaderWithSidebar
      />

      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}