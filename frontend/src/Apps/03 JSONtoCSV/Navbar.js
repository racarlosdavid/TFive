
const Navbar = ({onJSONtoCSV,onFormatJSON,onExample,onResetTextArea}) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
      
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item active">
                    <button className="btn btn-light" onClick={onJSONtoCSV}>
                        JSON to CSV
                    </button>
                </li>
                <li className="nav-item active">
                    <button className="btn btn-light" onClick={onFormatJSON}>
                        Format JSON
                    </button>
                </li>
                <li className="nav-item active">
                    <button className="btn btn-light" onClick={onExample}>
                        Example
                    </button>
                </li>
                <li className="nav-item active">
                    <button className="btn btn-light" onClick={onResetTextArea}>
                        Clean
                    </button>
                </li>
            </ul>
        </div>
        </nav>
    )
    
}

export default Navbar;
