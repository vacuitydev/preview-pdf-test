import { useDispatch } from "react-redux"
import { togglePdf } from "./slice";
import { useEffect } from "react";

const switchDuration = 5000
export default function Alternator({children}){
    const dispatch = useDispatch();
    useEffect(()=>{
        const interval=setInterval(()=>{
            dispatch(togglePdf())
        },switchDuration)
        return ()=>clearInterval(interval)
    })
    return <>
        {children}
    </>
}