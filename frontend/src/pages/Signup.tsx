import { Quote } from "../components/Quote"
import { SignupForm } from "../components/SignupForm"

export const Signup = () => {
 return <div>
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
         <SignupForm type="signup" />
      </div>
      <div className="hidden lg:block">
         <Quote />
      </div>
    </div>
 </div> 

}