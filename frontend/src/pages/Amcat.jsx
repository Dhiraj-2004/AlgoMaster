import useAmcatRank from "../component/hook/useAmcatRank";
import useUserData from "../component/hook/useUserData";

const Amcat = () => {
  const { userData, loading: userLoading, error: userError } = useUserData();
  const amcatdata = userData ? userData.amcat : null;
  const { amcatRank, error: rankError, loading: rankLoading } = useAmcatRank(amcatdata?.amcatID);
  const amcatData=amcatRank ? amcatRank : null;

  if (userLoading || rankLoading) {
    return (
      <div className="flex flex-col gap-6 items-center justify-center mt-20">
        <div className="loader"></div>
        <p className="text-red-500 font-semibold">Fetching AMCAT Data...</p>
      </div>
    );
  }

  if (userError || rankError) {
    return <p className="text-red-500 font-semibold">Error fetching data.</p>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">AMCAT Profile</h1>

      {amcatRank && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">AMCAT User Details</h2>
          <p className="text-lg text-gray-600"><strong>Name:</strong> {amcatData?.userInfo?.name}</p>
          <p className="text-lg text-gray-600"><strong>Roll No:</strong> {amcatData?.userInfo?.rollNo}</p>
          <p className="text-lg text-gray-600"><strong>AMCAT ID:</strong> {amcatData?.userInfo?.amcatID}</p>
          <p className="text-lg text-gray-600"><strong>Cpp Score:</strong> {amcatData?.userInfo?.cppScore}</p>
          <p className="text-lg text-gray-600"><strong>Automata Score:</strong> {amcatData?.userInfo?.automata}</p>
          <p className="text-lg text-gray-600"><strong>Equant:</strong> {amcatData?.userInfo?.quant}</p>
          <p className="text-lg text-gray-600"><strong>english:</strong> {amcatData?.userInfo?.english}</p>
          <p className="text-lg text-gray-600"><strong>logical:</strong> {amcatData?.userInfo?.logical}</p>
          <p className="text-lg text-gray-600"><strong>ELQ Score:</strong> {amcatData?.userInfo?.elqScore}</p>
        </div>
      )}

      {amcatRank && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">AMCAT Rank</h2>
          <p className="text-lg text-gray-600"><strong>ELQ Rank:</strong> {amcatRank.ranks?.elqRank}</p>
          <p className="text-lg text-gray-600"><strong>Automata Rank:</strong> {amcatRank.ranks?.automataRank}</p>
          <p className="text-lg text-gray-600"><strong>Total Users:</strong> {amcatRank.totalUsers}</p>
        </div>
      )}
    </div>
  );
};

export default Amcat;
