import ErrorMessage from "../errorMessage/errorMessage"
import { Link } from "react-router-dom"

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <p style={{'textAlign' : 'center', 'fontWeight' : 'bold', 'fontSize' : '24px'}} >Page dosen't exist</p>
            <Link style={{'display' : 'block', "textAlign" : 'center', 'fontWeight' : 'bold', 'fontSize' : '24px', 'marginTop' : '30px', 'color' : 'blue', 'border' : '1px solid', 'width' : '600px', 'margin' : '30px auto'}} to="/">Back to main page</Link>
        </div>
    )
}

export default Page404;