import UserNav from "../components/user-nav"
import Sidebar from "../components/sidebar"
const UserDashboard = () => {
  return (
    <div className="w-screen min-h-screen h-fit py-5 pl-5 pr-9 bg-gradient-to-r from-bg_Medium to-blue8 flex gap-x-6">
        <Sidebar/>
        <div className="w-4/5">
            <UserNav/>
            <div className="w-full h-fit flex flex-col py-7 gap-y-12">
                <div></div>
                <div className="w-full flex gap-x-6">
                    <button className="w-1/2 px-11 py-4 bg-font_blue1 text-white rounded-md text-lg font-inter">Create a new Account</button>
                    <button className="w-1/2 px-11 py-4 bg-font_blue1 text-white rounded-md text-lg font-inter">Go to dashbaord</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserDashboard