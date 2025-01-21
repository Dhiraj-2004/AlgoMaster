import UserProfile from "./UserProfile"

const Leetcode = () => {
  return (
    <div>
      <UserProfile
        platformUser={"leetUser"}
        apiEndpoint="https://leetcode-api-faisalshohag.vercel.app"
        usernameEndpoint="http://localhost:4000/api/user/leetuser"
      ></UserProfile>
    </div>
  )
}

export default Leetcode
