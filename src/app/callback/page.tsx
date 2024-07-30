import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { setToken } from "../actions";

interface CallBackPageProps{
    searchParams: {
        code?: string;
        id?:string;
        token?: string
    }
}

export default function Callback({searchParams} : CallBackPageProps){
const { token } = searchParams;
const { push } = useRouter()

useEffect(() => {
    if(token){
        setToken(token)
    }
    push("/")
}, [])
}