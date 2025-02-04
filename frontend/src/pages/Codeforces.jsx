import UserProfile from "./UserProfile";


const Codeforces = () => {
  return (
    <div>
      <UserProfile
        platformUser="codeforcesUser"
        apiEndpoint="https://codeforces.com/api/user.info?handles="
      ></UserProfile>
    </div>
  )
}

export default Codeforces
