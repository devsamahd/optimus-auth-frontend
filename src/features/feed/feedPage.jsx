import {useSelector} from "react-redux"
import {selectCurrentUser } from "../auth/authSlice"
import {Link} from "react-router-dom"

const Feed = () => {
    const user = useSelector(selectCurrentUser)
  return (
    <div>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10 box"></div>
        <div className="col-md-1"></div>
      </div>
    </div>
  )
}

export default Feed