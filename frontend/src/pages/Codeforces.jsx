import UserProfile from "./UserProfile";



const Codeforces = () => {
  return (
    <div>
      <UserProfile
        platformUser="codeforcesUser"
        apiEndpoint="https://codechef-api.vercel.app/handle"
        usernameEndpoint="http://localhost:4000/api/user/forcesuser"
      ></UserProfile>
    </div>
  )
}

export default Codeforces
