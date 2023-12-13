import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import Card from "../card/card";
import "./modal.css"
import { IconButton } from "@mui/material";
import { MdOutlineClose } from "react-icons/md";

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
                <MdOutlineClose  onClick={onCloseBackdrop} className="close-icon" size="1.5em"/>
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