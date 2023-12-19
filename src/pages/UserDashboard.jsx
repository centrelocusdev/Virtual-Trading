import UserNav from "../components/user-nav"
import Sidebar from "../components/sidebar"
import user from '/dash-user.svg';
const UserDashboard = () => {
  return (
    <div className="w-screen min-h-screen h-fit py-5 pl-5 pr-9 bg-gradient-to-r from-bg_Medium to-blue8 flex gap-x-6">
        <Sidebar/>
        <div className="w-4/5">
            <UserNav/>
            <div className="w-full h-fit flex flex-col py-7 gap-y-12">
                <div className="w-full h-fit flex gap-x-6">
                  <div className="w-1/3 py-12 h-64 px-5 bg-white flex justify-center items-center rounded-2lg">
                    <div className="w-full h-full flex gap-2.5">
                    <img className="h-20 w-20" src={user} alt="user"/>
                    <div className="flex w-full flex-col gap-2">
                      <p className="text-black2 text-2xl font-lato font-bold">Active Accounts</p>
                      <div className="w-full px-4 flex justify-start border-2 border-solid rounded-2lg border-font_blue1 items-center">
                        <p className="text-gray4 font-semibold text-xl font-lato">Account 1</p>
                      </div>
                    </div>
                    </div>
                  </div>
                  <div className="w-1/3 py-12 h-64 px-5 bg-white flex justify-center items-center rounded-2lg">
                    <div className="w-full h-full flex gap-2.5">
                    <img className="h-20 w-20" src={user} alt="user"/>
                    <div className="flex w-full flex-col gap-2">
                      <p className="text-black2 text-2xl font-lato font-bold">Active Accounts</p>
                      <div className="w-full px-4 flex justify-start border-2 border-solid rounded-2lg border-font_blue1 items-center">
                        <p className="text-gray4 font-semibold text-xl font-lato">Account 1</p>
                      </div>
                      <div className="w-full px-4 flex justify-start border-2 border-solid rounded-2lg border-font_blue1 items-center">
                        <p className="text-gray4 font-semibold text-xl font-lato">Account 2</p>
                      </div>
                    </div>
                    </div>
                  </div>
                  <div className="w-1/3 py-12 h-64 px-5 bg-white flex justify-center items-center rounded-2lg">
                    <div className="w-full h-full flex gap-2.5">
                    <img className="h-20 w-20" src={user} alt="user"/>
                    <div className="flex w-full flex-col gap-2">
                      <p className="text-black2 text-2xl font-lato font-bold">Active Accounts</p>
                      <div className="w-full px-4 flex justify-start border-2 border-solid rounded-2lg border-font_blue1 items-center">
                        <p className="text-gray4 font-semibold text-xl font-lato">Account 1</p>
                      </div>
                      <div className="w-full px-4 flex justify-start border-2 border-solid rounded-2lg border-font_blue1 items-center">
                        <p className="text-gray4 font-semibold text-xl font-lato">Account 2</p>
                      </div>
                    </div>
                    </div>
                  </div>

                </div>
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