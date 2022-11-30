import {useRef, useState, useEffect} from 'react'
import {Link, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useVerifyMutation } from './codeApiSlice'

const Verify = () => {
    const codeRef = useRef()
    const [code, setCode] = useState('')
    const {state} = useLocation()
    const email = state.user
    const codev = state.verify
    const navigate = useNavigate()

    const [verify, {isLoading}] = useVerifyMutation()
    useEffect(()=>{
        codeRef.current.focus()
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            await verify({codev, email, code}).unwrap()
            setCode('')
            navigate('/login', {state:{message: "Nice now try to re-login"}})
        }catch(err){
            console.log(err)
            toast.error(`${err.message}`, {
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

    const handleUserInput = (e) => setCode(e.target.value)

    const content = isLoading 
        ? (<div className="spinner-grow align-center" style={{"width": "3rem", "height": "3rem"}} role="status">
            
        </div>) 
        : (<>
            <section>
            <ToastContainer/>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label form-t">🚦OTP</label>
                        <input ref={codeRef} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="OTP" value={code} onChange={handleUserInput} />
                    </div>
                    <div className="mb-3">
                        <label className="form-check-label" htmlFor="exampleCheck1">We've sent an OTP to your email. Please input it above.</label>
                    </div>
                    <button type="submit" className="btn btn-lg btn-pry" onClick={handleSubmit}>Verify</button>
                </form>
            </section>
        </>)

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

export default Verify