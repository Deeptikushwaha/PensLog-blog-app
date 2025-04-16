import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../config";

export const SignupForm = ({type}: {type:"signup" | "signin"}) => {

    const [postInputs, setPostInputs] = useState({
        name: "",
        email: "",
        password: ""
    });

    async function sendRequest() {
        try{
            const response =await axios.post(`${SERVER_URL}/api/v1/user/${type==="signup" ? "signup" : "signin"}`, postInputs);
        } catch(e) {
            alert("Error while signing up")
        }
    }
        return (
        <div className="h-screeen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            {type==="signin" ? "Sign In to your account" : "Create your account"}
                        </div>
                        <div className="text-slate-500">
                            {type==="signin" ? "Don't have an account?" : "Already have an account?"}
                            <Link className="pl-2 underline" to={type==="signin" ? "/signup" : "/signin"}>
                                {type==="signin" ? "Sign up" : "Sign in"}
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {type==="signup" ? <LabelledInput label="Name" placeholder="Enter your name" onChange={(e)=>{
                            setPostInputs({...postInputs, name: e.target.value})
                        }}/> : null}
                        <LabelledInput label="Email" placeholder="Enter your email" onChange={(e)=>{
                            setPostInputs({...postInputs, email: e.target.value})
                        }} />
                        <LabelledInput label="Password" placeholder="Enter your password" onChange={(e)=>{
                            setPostInputs({...postInputs, password: e.target.value})
                        }}/>
                        <button onClick={sendRequest} type="button" className=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type? :string;
}

function LabelledInput({label, placeholder, onChange, type}: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}