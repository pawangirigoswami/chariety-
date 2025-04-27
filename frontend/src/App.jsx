import Home from "./page/Home"
import About from "./page/About"
import Cause from "./page/Cause"
import Contact from "./page/Contact"
import Volunter from "./page/Volunter"
import News from "./page/News"
import Signup from "./page/Signup"
import Login from "./page/Login"
import AdminDashboard from "./page/AdminDashboard"
import UserDashboard from "./page/UserDashboard"
import Donor from "./page/Donor"
import AddStaff from "./page/AddStaff"
import ViewStaff from "./page/ViewStaff"
import AddMembertype from "./page/AddMembertype"
import ViewMembertype from "./page/ViewMembertype"
import AddMember from "./page/AddMember"
import ViewMember from "./page/ViewMember"
import FundRaise from "./page/FundRaise"
import ViewFundraise from "./page/ViewFundraise"
import Appointment from "./page/Appointment"
import EditStaff from "./page/EditStaff"
import EditMembertype from "./page/EditMembertype"
import EditMember from "./page/EditMember"
import EditFund from "./page/EditFund"
import Layout from "./component/Layout"
import AdminAppointment from "./page/AdminAppointment"
import DonorFundraiser from "./page/DonorFundraiser"
import ViewAppointment from "./page/ViewAppointment"
import ViewFundByDonor from "./page/ViewFundByDonor"
import ViewDonor from "./page/ViewDonor"

import { BrowserRouter,Routes,Route } from "react-router-dom"


function App() {
  

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout/>}>
     <Route index element={<Home/>} />
     <Route path="/about" element={<About/>} />
     <Route path="/cause" element={<Cause/>} />
     <Route path="/contact" element={<Contact/>} />
     <Route path="/volunter" element={<Volunter/>}  />
     <Route path="/news" element={<News/>} />
     </Route>

     <Route path="/signup" element={<Signup/>} />
     <Route path="/login" element={<Login/>} />
     <Route path="/admin/dashboard" element={<AdminDashboard/>} />
     <Route path="/user/dashboard" element={<UserDashboard/>} />
     <Route path="/donor/dashboard" element={<Donor/>} />
     <Route path="/addstaff" element={<AddStaff/>} />
     <Route path="/viewstaff" element={<ViewStaff/>} />
     <Route path="/addmembertype" element={<AddMembertype/>} />
     <Route path="/viewmembertype" element={<ViewMembertype/>} />
     <Route path="/addmember" element={<AddMember/>} />
     <Route path="/viewmember" element={<ViewMember/>} />
     <Route path="/fundraise" element={<FundRaise/>} />
     <Route path="/viewfundraise" element={<ViewFundraise/>} />
     <Route path="/appointment" element={<AdminAppointment/>} />
     <Route path="/donor/appointment" element={<Appointment/>} />
     <Route path="/editdeletestaff" element={<EditStaff/>} />
     <Route path="/editmembertype" element={<EditMembertype />} />
        <Route path="/editmember" element={<EditMember />} />
        <Route path="/editfund" element={<EditFund />} />
        <Route path="/fundraiser" element={<DonorFundraiser />} />
        <Route path="/view/appointment" element={<ViewAppointment />} />
        <Route path="/viewfundbydonor" element={<ViewFundByDonor />} />
        <Route path="/viewdonor" element={<ViewDonor />} />
      
     </Routes>
    </BrowserRouter>
  )
}

export default App
