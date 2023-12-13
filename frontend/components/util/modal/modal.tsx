import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import Card from "../card/card";
import "./modal.css"

const Backdrop = (props:any)=>{
    const onCloseBackdrop = ()=>{
        props.onClose();
    }
    return(<div className="backdrop" onClick={onCloseBackdrop}/>);
} 

const OverLay = (props: any)=>{
    const onCloseBackdrop = ()=>{
        props.onClose();
    }

    return (<Card>
                <button className="close-page" onClick={onCloseBackdrop}>close</button>
                {props.children}
            </Card>)   
} 

const Modal = (props: any)=>{
    const [hideModal, setHideModal] = useState(false);
    const [domReady, setDomReady] = useState(false);

    const onCloseModal = ()=>{
        setHideModal(true);
        props.onHidePage();
    }

    useEffect(() => {
      setDomReady(true);
    })

    return(!hideModal && domReady &&<>
        {ReactDOM.createPortal(<Backdrop onClose={onCloseModal}/>, document.getElementById('backdrop-root')!)}
        {ReactDOM.createPortal(<OverLay onClose={onCloseModal}>{props.children}</OverLay>, document.getElementById('overlay-root')!)}
    </>);
} 

export default Modal;