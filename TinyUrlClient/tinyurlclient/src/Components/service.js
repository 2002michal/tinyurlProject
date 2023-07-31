//import axios from './axios'
import axios from 'axios';

export default function register(name, email, password) {
    const user = { name, email, password }
    console.log(user);
    try {
        const newUser = axios.post('http://localhost:8000/register', user);
        return newUser
    }
    catch (e) {
        return e
    }
}

export async function login(email, password) {
    const user = { email, password }
    console.log(user);
    try {
        const res = await axios.get(`http://localhost:8000/login/${email}/${password}`);
        //console.log(res.data);
        //return res
        console.log(res.data.message);
        localStorage.setItem("accessToken", res.data.message)
        return res.data.message
    }
    catch (e) {
        return e.message
    }
}

export async function addLinkServ(originalUrl, newUrl) {
    const targetParamName = "t"
    //console.log(shortUrl);
    const link = { originalUrl, newUrl, targetParamName }
    const token=localStorage.getItem("accessToken");
    console.log("token "+ token);
    console.log(link.originalUrl);
    try {
        const res=await axios.post(`http://localhost:8000/link`,link,{headers:{authorization:`${token}`}})
        console.log(JSON.stringify(res) +" :res");
        return res.json;
    }
    catch (e) {
        return e
    }
}

export async function addPltfromServ(longUrl,newUrl,name,idPlat)
{
    const platform={longUrl,newUrl,name}
    console.log(platform,idPlat);
    const token=localStorage.getItem("accessToken");
    try{
        const res=await axios.post(`http://localhost:8000/link/addPlatfrom?t=${idPlat}`,platform,{headers:{authorization:`${token}`}})
        //console.log(JSON.stringify(res) +" :res");
        return res.data
    }
    catch(e)
    {
        console.log("e:"+e);
        return e;
    }
}
export async function getplatfromsByLink(newUrl){

    const token=localStorage.getItem("accessToken");
    try{
        const res=await axios.get(`http://localhost:8000/byPlatform/${newUrl}`,{headers:{authorization:`${token}`}})
        return res.data
    }
    catch(e)
    {
        console.log(e);
        return e.message
    }
}

export function getAllLinksByUser(){

}