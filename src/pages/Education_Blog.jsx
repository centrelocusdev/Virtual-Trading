import Sidebar2 from "../components/sidebar2"
import UserNav from "../components/user-nav"
import Education_Card from "../components/education-card"
const Education_Blog = () => {
  return (
    <div className="w-screen min-h-screen h-fit py-5 pl-5 pr-9 bg-gradient-to-r from-bg_Medium to-blue8 flex gap-x-6">
    <Sidebar2 active={"account-overview"}/>
    <div className="w-4/5">
    <UserNav title={"Educational Blogs"}/>
    <div className="w-full flex flex-wrap justify-evenly min-h-screen h-fit p-2.5 mt-7">
        <Education_Card/>
        <Education_Card/>
        <Education_Card/>
        <Education_Card/>
    </div>
    </div>
</div>
  )
}

export default Education_Blog