import Link from "next/link";
import {
  ClipboardListIcon,
  DocumentReportIcon,
  ViewBoardsIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/solid";

const PATHS = [
  {
    path: "/",
    label: "Dashboard",
    icon: <ViewBoardsIcon className="w-6 " />,
  },
  {
    path: "/",
    path: "/Logs",
    label: "Tasks",
    icon: <ClipboardListIcon className="w-6 " />,
  },
  {
    path: "/",
    label: "Reports",
    icon: <DocumentReportIcon className="w-6 " />,
  },
  { path: "/", label: "Staff", icon: <UserGroupIcon className="w-6 " /> },
  { path: "/", label: "Clients", icon: <UsersIcon className="w-6 " /> },
  {
    path: "/contacts",
    label: "Contacts",
    icon: <UserGroupIcon className="w-6 " />,
  },
];

export default function NavigationButtons() {
  return (
    <div className="flex flex-col items-center mt-12">
      {PATHS.map((item, idx) => {
        return (
          <Link key={idx} href={item.path}>
            <a className="flex flex-row items-center justify-between bg-[#2c3e50] w-1/2 text-white mb-4 py-2 px-4 rounded-sm hover:bg-[#616161] transition-all duration-300 ease-in shadow-lg font-poppins">
              <span className="pr-2">{item.icon}</span>
              <span className="text-left ">{item.label}</span>
            </a>
          </Link>
        );
      })}
    </div>
  );
}
