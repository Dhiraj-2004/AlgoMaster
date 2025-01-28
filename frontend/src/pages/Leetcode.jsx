import UserProfile from "./UserProfile"

const Leetcode = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return (
    <div>
      <UserProfile
        platformUser="leetcodeUser"
        apiEndpoint={`${backendUrl}/api/user/leetcode`}
        usernameEndpoint={`${backendUrl}/api/user/leetuser`}
      ></UserProfile>
    </div>
  )
}

export default Leetcode
