// src/components/Sidebar.jsx
export default function Sidebar({ isOpen }) {
  if (!isOpen) return null;

  const menuItems = [
    { icon: "🏠", label: "Home" },
    { icon: "🩳", label: "Shorts" },
    { icon: "📺", label: "Subscriptions" },
    { divider: true },
    { icon: "⏳", label: "History" },
    { icon: "👍", label: "Liked videos" }
  ];

  return (
    <aside className="w-64 bg-white overflow-y-auto hover:overflow-y-scroll transition-all duration-200 shrink-0 border-r border-gray-100">
      <div className="flex flex-col py-3">
        {menuItems.map((item, index) => 
          item.divider ? (
            <hr key={index} className="my-3 border-gray-200" />
          ) : (
            <div key={index} className="flex items-center gap-4 px-4 py-2.5 hover:bg-gray-100 rounded-lg mx-2 cursor-pointer">
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          )
        )}
      </div>
    </aside>
  );
}