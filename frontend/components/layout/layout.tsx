import Footer from "../footer/footer";
import Header from "../header/header";

const Layout = (props: { children: any })=>{
    return (
        <div className="general-container">
            <Header/>
            <main className="main-container">
                {props.children}
            </main> 
            <Footer/>
        </div>
      )
}

export default Layout;