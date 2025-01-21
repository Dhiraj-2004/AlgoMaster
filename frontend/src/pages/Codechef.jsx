import UserProfile from "./UserProfile"


const Codechef = () => {
  return (
    <div>
      <UserProfile
        platformUser="codechefUser"
        apiEndpoint="https://codechef-api.vercel.app/handle"
        usernameEndpoint="http://localhost:4000/api/user/chefuser"
      ></UserProfile>
  </div>
  )
}

export default Codechef
