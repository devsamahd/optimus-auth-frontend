import {useRef, useState, useEffect} from 'react'
import {Link, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { useSignupMutation } from './registerApiSlice'
import { useSendMutation } from '../auth/codeApiSlice'


const Register = () => {
    const fnRef = useRef()
    const lnRef = useRef()
    const emRef = useRef()
    const unRef = useRef()
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    
        
    

    const [signup, {isLoading}] = useSignupMutation()
    const [send] = useSendMutation()

    useEffect(()=>{
        fnRef.current.focus()
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            await signup({firstname, lastname, email, username, password}).unwrap()
            const verify = await send({email})
            setFirstname('')
            setLastname('')
            setEmail('')
            setUsername('')
            setPassword('')
            navigate('/verify',{state:{verify, user:email}})
        }catch(err){
            toast.error(`${err.data.message || "Either username or password has been used"}`, {
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

    const handleFirstnameInput = (e) => setFirstname(e.target.value)
    const handleLastnameInput = (e) => setLastname(e.target.value)
    const handleUsernameInput = (e) => setUsername(e.target.value)
    const handleEmailInput = (e) => setEmail(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)

    const content = isLoading 
        ? (<div className="spinner-grow align-center" style={{"width": "3rem", "height": "3rem"}} role="status">
            
        </div>) 
        : (<>
            <section>
            <ToastContainer/>  

                <form>
                    <div className="mb-3">
                        <label htmlFor="e" className="form-label form-t">Firstname</label>
                        <input ref={fnRef} type="text" className="form-control"  aria-describedby="emailHelp" value={firstname} onChange={handleFirstnameInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="e" className="form-label form-t">Lastname</label>
                        <input ref={lnRef} type="text" className="form-control"  aria-describedby="emailHelp" value={lastname} onChange={handleLastnameInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label form-t">Username</label>
                        <input ref={unRef} type="text" className="form-control"  aria-describedby="emailHelp" value={username} onChange={handleUsernameInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label form-t">Email</label>
                        <input ref={emRef} type="email" className="form-control" value={email} onChange={handleEmailInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label form-t">Password</label>
                        <input type="password" className="form-control" value={password} onChange={handlePasswordInput} autoComplete="false" />
                    </div>
                    <button type="submit" className="btn btn-lg btn-pry" onClick={handleSubmit}>Join Awesomeness</button>
                </form>

                
                <div className="loginfooter">
                    <li>Already have an Account?</li>
                    <Link to="/login"><li>Sign In!</li></Link>
                </div>
            </section>
        </>)

  return (
    <div className="row">
        <div className="col-md-6 int1"><img src="./register.png" alt=""/></div>
        <div className="col-md-4">
            <div  style={{"marginTop":"10vh"}}>
                {content}
            </div>
        </div>
        <div className="col-md-2"></div>
    </div>
                
  )
}

export default Register