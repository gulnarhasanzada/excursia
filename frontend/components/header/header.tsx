import Link from "next/link";
import "./header.css"
import ProfileMenu from "../profile-menu/profile-menu";

const Header = ()=>{
    return (
        <header className="header-container">
            <div className="header-main  d-flex">
                <div className="header-item header-logo">
                    <Link href="/"><img src="/excursia-logo.png" alt="excursia-logo" title="Excursia"/></Link>
                </div>
                <div className="header-item">

                </div>
                <div className="header-item header-profile">
                    <ProfileMenu />
                </div>
            </div>
        </header>
      )
}

export default Header;