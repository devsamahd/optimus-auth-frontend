import {useSelector} from "react-redux"
import {selectCurrentUser } from "../auth/authSlice"

const Feed = () => {
    const user = useSelector(selectCurrentUser)
  return (
    <div>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10 box">
          <div className="row">

            <div className="col-md-6">
              <h1>WaWu! you made it.</h1>
              <p>This page will be designed later thank you</p>
            </div>
            <div className="col-md-6"></div>

          </div>
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  )
}

export default Feed