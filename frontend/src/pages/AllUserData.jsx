import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Dropdown from "../component/Dropdown";
import InputField from "../component/InputField";
import { ThemeContext } from "../context/ThemeContext";

const AllUserData = () => {
  const [platform, setPlatform] = useState("LeetCode");
  const [users, setUsers] = useState(null);
  const [search, setSearch] = useState("");
  const [item, setItem] = useState("Roll No");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const { theme } = useContext(ThemeContext);
  const [loader, setLoader] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const entriesPerPage = 20;

  const platformOptions = [
    "Select Platform",
    "LeetCode",
    "CodeChef",
    "Codeforces",
  ];

  const tableHead = theme === "dark"
    ? "px-2 py-2 border border-gray-800 h-12 text-sm"
    : "px-2 py-2 border h-12 text-sm";

  const searchOptions = ["Roll No", "Name", "UserName"];

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      if (!platform || platform === "Select Platform") return;

      try {
        const site =
          platform === "Codeforces"
            ? "codeforcesUser"
            : platform === "CodeChef"
            ? "codechefUser"
            : "leetcodeUser";

        const response = await axios.get(
          `${backendUrl}/api/user?platform=${site}`
        );
        setUsers(response.data.users);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [platform,backendUrl]);

  const handleSort = (column) => {
    const newSortOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
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
    <div className="p-4 w-full xl:w-[90%] lg:w-[90%] m-auto">
      <div>
        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
          <Dropdown
            options={platformOptions}
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            label="Select Platform"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-2">
          <InputField
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search by ${item}`}
          />
          <div className=" -translate-y-1 w-full">
          <Dropdown
            options={searchOptions}
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          </div>
          
        </div>
      </div>

      {loader ? (
        <div className="flex justify-center mt-20">
          <div className="loader"></div>
        </div>
      ) : platform && platform !== "Select Platform" ? (
        users ? (
          <div className="mt-10 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead
                className={`${
                  theme === "dark" ? "bg-zinc-800" : "bg-gray-300"
                }`}
              >
                <tr>
                  <th className={`${tableHead}`}>Sr</th>
                  <th
                    className={`${tableHead} cursor-pointer`}
                    onClick={() => handleSort("Roll No")}
                  >
                    Roll No{" "}
                    {sortColumn === "Roll No"
                      ? sortOrder === "asc"
                        ? "↑"
                        : "↓"
                      : ""}
                  </th>
                  <th className={`${tableHead}`}>Name</th>
                  <th className={`${tableHead}`}>Year</th>
                  <th className={`${tableHead}`}>UserName</th>
                  <th
                    className={`${tableHead} cursor-pointer`}
                    onClick={() => handleSort("Rank")}
                  >
                    Rank{" "}
                    {sortColumn === "Rank"
                      ? sortOrder === "asc"
                        ? "↑"
                        : "↓"
                      : ""}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.length > 0 ? (
                  currentEntries.map((user, index) => (
                    <tr
                      key={user._id}
                      className={`text-center ${
                        index % 2 === 0 ? "" : "bg-gray-100"
                      } ${
                        theme === "dark" && index % 2 !== 0
                          ? "bg-zinc-900"
                          : ""
                      }`}
                    >
                      <td className={`${tableHead}`}>{index+1}</td>
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
                className={`px-4 py-2 bg-gray-300 rounded-xl hover:text-blue-500 ${
                  theme === "dark"
                    ? "bg-zinc-700 hover:bg-zinc-900 disabled:bg-gray-600"
                    : "hover:bg-gray-400"
                } transition-colors duration-500`}
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 bg-gray-300 rounded-xl hover:text-blue-500 ${
                  theme === "dark"
                    ? "bg-zinc-700 hover:bg-zinc-900 disabled:bg-gray-600"
                    : "hover:bg-gray-400"
                } transition-colors duration-500`}
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
