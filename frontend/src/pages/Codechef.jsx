import UserProfile from "./UserProfile"


const Codechef = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return (
    <div>
      <UserProfile
        platformUser="codechefUser"
        apiEndpoint="https://codechef-api.vercel.app/handle"
        usernameEndpoint={`${backendUrl}/api/user/chefuser`}
      ></UserProfile>
  </div>
  )
}

export default Codechef
