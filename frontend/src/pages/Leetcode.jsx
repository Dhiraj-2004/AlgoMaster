import UserProfile from "./UserProfile"

const Leetcode = () => {
  return (
    <div>
      <UserProfile
        platformUser="leetUser"
        apiEndpoint="http://localhost:4000/api/user/leetcode"
        usernameEndpoint="http://localhost:4000/api/user/leetuser"
      ></UserProfile>
    </div>
  )
}

export default Leetcode
