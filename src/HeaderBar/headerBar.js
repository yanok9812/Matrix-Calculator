import { Link } from 'react-router-dom';
import back from './back.png';
import githubLogo from '../githubLogo.png';

function HeaderBar(){
    return (
        <div 
            style={{
                textAlign: 'left',
                paddingLeft: 50
            }}
        >
            <Link style={{marginRight: 50}} to="/">
                <img src={back} alt="back" width="50"/>
            </Link>

            <a href="https://github.com/yanok9812/Matrix-Calculator">
                <img src={githubLogo} alt="github" width="50"/>
            </a>
        </div>
    )

}

export default HeaderBar