import { useParams } from "react-router-dom";
import useAmcatRank from "../component/hook/useAmcatRank";
import useAmcatData from "../component/hook/useAmcatData";

const Amcat = () => {
  const { amcatID } = useParams();
  const { amcatData, error: dataError, loading: dataLoading } = useAmcatData(amcatID);
  const { amcatRank, error: rankError, loading: rankLoading } = useAmcatRank(amcatID);

  if (dataLoading || rankLoading) {
    return (
      <div className="flex flex-col gap-6 items-center justify-center mt-20">
        <div className="loader"></div>
        <p className="text-red-500 font-semibold">Fetching AMCAT Data...</p>
      </div>
    );
  }

  if (dataError || rankError) {
    return <p className="text-red-500 font-semibold">Error fetching data.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AMCAT Profile</h1>

      {amcatData && (
        <div className="mb-6">
          <h2 className="text-lg font-bold">AMCAT User Details</h2>
          <p>Name: {amcatData.name}</p>
          <p>Roll No: {amcatData.rollNo}</p>
          <p>AMCAT ID: {amcatData.amcatID}</p>
          <p>Cpp Score: {amcatData.cppScore}</p>
          <p>Automata Score: {amcatData.automata}</p>
          <p>ELQ Score: {amcatData.elqScore}</p>
        </div>
      )}

      {amcatRank && (
        <div>
          <h2 className="text-lg font-bold">AMCAT Rank</h2>
          <p>ELQ Rank: {amcatRank.ranks?.elqRank}</p>
          <p>Automata Rank: {amcatRank.ranks?.automataRank}</p>
          <p>Total Users: {amcatRank.totalUsers}</p>
        </div>
      )}
    </div>
  );
};

export default Amcat;
