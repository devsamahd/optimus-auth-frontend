import {useRef, useState, useEffect} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import { ToastContainer, toast } from 'react-toastify'


const Login = () => {
    const userRef = useRef()
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const {state} = useNavigate()
    const navigate = useNavigate()
    
    if(state?.message){
        toast.success(`${state.message}`, {
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
    

    const [login, {isLoading}] = useLoginMutation()
    const dispatch = useDispatch()
    useEffect(()=>{
        userRef.current.focus()
        
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const userData = await login({user, password}).unwrap()
            dispatch(setCredentials({...userData, ...userData}))
            
            setUser('')
            setPassword('')
            navigate('/feed')
        }catch(err){
            let errmsg
            if(!err?.status){
                errmsg = 'No server Response'
            }else if(err.status === 400){
                const type = err.data.type
                if(type === "notverified"){
                    navigate('/reauth',{state:{user, message:"Seems your Email is not verified,"}})
                }
                else if(type === "newdevice"){
                    navigate('/reauth',{state:{user, message:"Oops, seems you're trying to login from a new device."}})
                }

                errmsg = type === "incompleteinfo" ? "Oops, Login credentials are Incomplete":"Oops wrong Password."
            }else if(err.status === 401){
                errmsg = "Unauthorized, Sorry!"
            }
            else{
                errmsg = "Ehrr! For unknown reasons, Login Failed"
            }
            toast.error(`${errmsg}`, {
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

    const handleUserInput = (e) => setUser(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)

    const content = isLoading 
        ? (<div className="spinner-grow align-center" style={{"width": "3rem", "height": "3rem"}} role="status">
            
        </div>) 
        : (<>
            <section>
            <ToastContainer/>  

            

                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label form-t">Email address or Username</label>
                        <input ref={userRef} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={user} onChange={handleUserInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label form-t">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={handlePasswordInput} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                    </div>
                    <button type="submit" className="btn btn-lg btn-pry" onClick={handleSubmit}>Login</button>
                </form>

                
                <div className="loginfooter">
                    <Link to="/register"><li>Sign Up</li></Link>
                    <Link to="/"><li>Forgot Password</li></Link>
                    <Link to="/" className='disabled'><li>Settings</li></Link>
                </div>
            </section>
        </>)

  return (
    <div className="row">
        <div className="col-md-6"><img src="./login.png" alt=""/></div>
        <div className="col-md-4">
            <div  style={{"marginTop":"25vh"}}>
                {content}
            </div>
        </div>
        <div className="col-md-2"></div>
    </div>
                
  )
}

export default Login