import { Quote } from "../components/Quote"
import { SignupForm } from "../components/SignupForm"

export const Signin = () => {
 return <div>
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
         <SignupForm type="signin" />
      </div> 
      <div className="hidden lg:block">
         <Quote />
      </div>
    </div>
 </div> 

}