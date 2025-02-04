import UserProfile from "./UserProfile"


const Codechef = () => {
  return (
    <div>
      <UserProfile
        platformUser="codechefUser"
        apiEndpoint="https://codechef-api.vercel.app/handle"
      ></UserProfile>
  </div>
  )
}

export default Codechef
