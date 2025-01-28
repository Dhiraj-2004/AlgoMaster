import UserProfile from "./UserProfile";



const Codeforces = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return (
    <div>
      <UserProfile
        platformUser="codeforcesUser"
        apiEndpoint="https://codeforces.com/api/user.info?handles="
        usernameEndpoint={`${backendUrl}/api/user/forcesuser`}
      ></UserProfile>
    </div>
  )
}

export default Codeforces
