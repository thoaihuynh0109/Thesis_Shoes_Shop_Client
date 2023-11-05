import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <Link to={'/dashboard'}>Go to dashboard</Link>
        </>
    );
}

export default Header;
