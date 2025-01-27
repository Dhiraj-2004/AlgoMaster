import UserProfile from "./UserProfile"

const Leetcode = () => {
  return (
    <div>
      <UserProfile
        platformUser="leetcodeUser"
        apiEndpoint="http://localhost:4000/api/user/leetcode"
        usernameEndpoint="http://localhost:4000/api/user/leetuser"
      ></UserProfile>
    </div>
  )
}

export default Leetcode
