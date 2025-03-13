import { Link } from 'react-router-dom'
import Search from './Search'

export default function Header({cartItems}){
    return <nav className="navbar row">
      <div className="col-12 col-md-3">
      <div className="navbar-brand">
        <Link to="/"><img width=" 150px " src="/images/logo.png" /></Link>
        
      </div>
      </div>
    
      <div className="col-12 col-md-6 mt-2 mt-md-0">
      <Search/>
      </div>
    
    </nav>
}