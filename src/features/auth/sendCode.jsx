import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useSendMutation } from './codeApiSlice'

const SendCode = () => {
    const navigate = useNavigate()
    const [send, {isLoading}] = useSendMutation()
    const {state} = useLocation()
    const email = state.user
    const message = state.message
    const handleSubmit = async(e) => {
        e.preventDefault()
        
        try{
            const verify = await send({email})
            navigate('/verify',{state:{verify, user:email}})
        }catch(err){
            toast.error(`${err.data.message}`, {
                position: "top-center",
                autoClose: 7000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
    }

    const content = isLoading 
        ? (<div className="spinner-grow align-center" style={{"width": "3rem", "height": "3rem"}} role="status">
            
        </div>)
        : (
            <section>
            <ToastContainer/>
                <form>
                    <div className="mb-3">
                        <label className="form-check-label form-t" htmlFor="">{message} We will send you an OTP to reconfirm your Identity. Click "Get OTP" to continue.</label>
                    </div>
                    <button type="submit" className="btn btn-lg btn-pry" onClick={handleSubmit}>Get OTP</button>
                </form>
            </section>
        )


  return (
    <div className="row">
        <div className="col-md-6"></div>
        <div className="col-md-4">
            <div  style={{"marginTop":"35vh"}}>
                {content}
            </div>
        </div>
        <div className="col-md-2"></div>
    </div>
    )
  
}

export default SendCode