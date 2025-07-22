import { FaTasks } from "react-icons/fa";

const Header = ({ total, pending }) => {
  return (
    <div className="flex items-center justify-between pb-4 border-b">
      <div className="flex items-center gap-2 text-xl font-semibold text-indigo-600">
        <FaTasks className="text-2xl" />
        Taskly
      </div>
      <div className="text-sm text-gray-500">
        {total} total tasks • {pending} pending
      </div>
    </div>
  );
};

export default Header;
