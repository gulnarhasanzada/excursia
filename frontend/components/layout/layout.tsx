import Footer from "../footer/footer";
import Header from "../header/header";
import "./Layout.css"

const Layout = (props: { children: any })=>{
    return (<>
        <div id="backdrop-root"></div>
        <div id="overlay-root"></div>
        <div className="general-container">
            <Header/>
            <main className="main-container">
                {props.children}
            </main> 
            <Footer/>
        </div></>
      )
}

export default Layout;