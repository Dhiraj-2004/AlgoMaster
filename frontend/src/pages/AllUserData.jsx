import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Dropdown from "../component/Dropdown";
import InputField from "../component/InputField";
import { ThemeContext } from "../context/ThemeContext";

const AllUserData = () => {
  const [platform, setPlatform] = useState(null);
  const [users, setUsers] = useState(null);
  const [search, setSearch] = useState("");
  const [item, setItem] = useState("Roll No");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const { theme } = useContext(ThemeContext);

  const entriesPerPage = 20;

  const platformOptions = [
    "Select Platform",
    "LeetCode",
    "CodeChef",
    "Codeforces",
  ];

  const tableHead = theme === 'dark'
    ? "px-4 py-2 border border-gray-800 h-16"
    : "px-4 py-2 border h-14";

  const searchOptions = ["Roll No", "Name", "UserName"];

  useEffect(() => {
    const fetchData = async () => {
      if (!platform || platform === "Select Platform") return;

      try {
        const site =
          platform === "Codeforces"
            ? "codeforcesUser"
            : platform === "CodeChef"
            ? "codechefUser"
            : "leetcodeUser";

        const response = await axios.get(
          `http://localhost:4000/api/user?platform=${site}`
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [platform]);

  const handleSort = (column) => {
    const newSortOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const sortedUsers = users
    ? [...users].sort((a, b) => {
      if (sortColumn === "Roll No") {
        return sortOrder === "asc"
          ? a.roll.localeCompare(b.roll)
          : b.roll.localeCompare(a.roll);
      }
      if (sortColumn === "Rank") {
        const rankA = a.ranks?.[`${platform?.toLowerCase()}Rank`] || Infinity;
        const rankB = b.ranks?.[`${platform?.toLowerCase()}Rank`] || Infinity;
        return sortOrder === "asc" ? rankA - rankB : rankB - rankA;
      }
      return 0;
    })
    : [];

  const filteredUsers = sortedUsers.filter((user) => {
    if (item === "Roll No") {
      return user.roll.toLowerCase().includes(search.toLowerCase());
    } else if (item === "Name") {
      return user.name.toLowerCase().includes(search.toLowerCase());
    } else if (item === "UserName") {
      const key = `${platform?.toLowerCase()}User`;
      return user.usernames?.[key]?.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredUsers.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-4">
      <div className="">
        <div className="mb-4 flex items-start mt-auto">
          <Dropdown
            options={platformOptions}
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            label="Select Platform"
            Style={"bg-zinc-900"}
          />
        </div>

        <div className="flex items-center space-x-4">
          <InputField
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search by ${item}`}
            Style={"bg-zinc-900"}
          />
          <div className="w-full mb-2">
            <Dropdown
              options={searchOptions}
              value={item}
              onChange={(e) => setItem(e.target.value)}
              Style={"bg-zinc-900"}
            />
          </div>
        </div>
      </div>

      {platform && platform !== "Select Platform" ? (
        users ? (
          <div className="mt-6">
            <table className="w-full border-collapse border border-gray-200">
              <thead className={`${theme === 'dark' ? "bg-zinc-800" : "bg-gray-300"}`}>
                <tr>
                  <th
                    className={`${tableHead} cursor-pointer`}
                    onClick={() => handleSort("Roll No")}
                  >
                    Roll No {sortColumn === "Roll No" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                  </th>
                  <th className={`${tableHead}`}>Name</th>
                  <th className={`${tableHead}`}>Year</th>
                  <th className={`${tableHead}`}>UserName</th>
                  <th
                    className={`${tableHead} cursor-pointer`}
                    onClick={() => handleSort("Rank")}
                  >
                    Rank {sortColumn === "Rank" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentEntries && currentEntries.length > 0 ? (
                  currentEntries.map((user, index) => (
                    <tr
                      key={user._id}
                      className={`text-center ${index % 2 === 0 ? "" : "bg-gray-100"} hover:cursor-pointer ${theme === 'dark' && index % 2 !== 0 ? "bg-zinc-900" : ""}`}
                    >
                      <td className={`${tableHead}`}>{user.roll}</td>
                      <td className={`${tableHead}`}>{user.name}</td>
                      <td className={`${tableHead}`}>{user.year}</td>
                      <td className={`${tableHead}`}>
                        {user.usernames?.[`${platform.toLowerCase()}User`]}
                      </td>
                      <td className={`${tableHead}`}>
                        {user.ranks?.[`${platform.toLowerCase()}Rank`]}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="border px-4 py-2 text-center">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-4 py-2 ml-[3%] bg-gray-300 rounded-xl  ${theme === 'dark' ? "bg-zinc-700 hover:bg-zinc-900 disabled:bg-gray-600" : "hover:bg-gray-400"}`}
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 bg-gray-300 mr-[3%] ${theme === 'dark' ? "bg-zinc-700 hover:bg-zinc-900 disabled:bg-gray-600" : "hover:bg-gray-400"} rounded-xl`}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-6 text-center">Loading...</p>
        )
      ) : (
        <p className="mt-6 text-center">Please select a platform to view users.</p>
      )}
    </div>
  );
};

export default AllUserData;
