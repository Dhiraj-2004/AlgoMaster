// import Footer from "../component/Footer"

import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate=useNavigate();
  const token = localStorage.getItem("token");
  if(!token) navigate("/login");
  return (
    <div className="mt-10">
      {/* <Footer></Footer> */}
    </div>
  ) 
}

export default Home
