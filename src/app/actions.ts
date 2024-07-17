"use serve"
import { cookies } from "next/headers"

export async function setToken (token: string){
    cookies().set(process.env.TOKEN_NAME as string, token)
}

export async function getToken() {
    cookies().get(process.env.TOKEN_NAME as string)?.value
}
