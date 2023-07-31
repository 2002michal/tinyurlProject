import { Button } from "@material-ui/core";
import { TextField } from '@material-ui/core';
import {  useRef, useState } from 'react';
import { addLinkServ, addPltfromServ } from './service.js';
import UserActions from './userActions'

export default function PersonalArea()
{
    const [longUrl, setLongUrl] = useState();
    const [tinyUrl, setTinyUrl] = useState();
    const [show,setShow]=useState(false)
    const refPlatfrom = useRef();
    const refPlatfromId = useRef();
    const refLongUrl = useRef();
    const refTinyUrl = useRef();
    const navigate=useRef()

    async function addLink() {
        console.log(tinyUrl + " ad " + longUrl);
        const link = await addLinkServ(longUrl, tinyUrl);
        console.log("link" + link);
    }
    async function addPltfrom() {
        console.log(refLongUrl.current.value, refPlatfrom.current.value, refPlatfromId.current.value);
        const link = await addPltfromServ(refLongUrl.current.value,refTinyUrl.current.value, refPlatfrom.current.value, refPlatfromId.current.value);
        if(link==='Request failed with status code 400')
            console.log("אין לך כזה קישור");
        console.log("plat" + link);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setTinyUrl(e.target.value);
        setLongUrl(e.target.value)
        console.log('tinyUrl:', e.target.value);
        console.log('longUrl:', e.target.value);
    };
    const toInformation=()=>{
        setShow(true)
        // console.log("userActions");
        // navigate('/userActions')
    }
    return <>
        <div></div>
        {!show&&<div>
            <form>
                <TextField
                    label="orginal_url"
                    variant="outlined"
                    margin="normal"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="tiny url"
                    variant="outlined"
                    margin="normal"
                    value={tinyUrl}
                    onChange={(e) => setTinyUrl(e.target.value)}
                    fullWidth
                />
                <button type="button" onClick={addLink}>add Link</button>
            </form>

            <form>
                <TextField
                    label="long url"
                    variant="outlined"
                    margin="normal"
                    inputRef={refLongUrl}
                    fullWidth
                />
                 <TextField
                    label="tiny url"
                    variant="outlined"
                    margin="normal"
                    inputRef={refTinyUrl}
                    fullWidth
                />
                <TextField
                    label="platfrom"
                    variant="outlined"
                    margin="normal"
                    inputRef={refPlatfrom}
                    fullWidth
                />
                <TextField
                    label="platfrom id"
                    variant="outlined"
                    margin="normal"
                    inputRef={refPlatfromId}
                    fullWidth
                />
                <button type="button" onClick={addPltfrom}>add Pltfrom</button>
            </form>
            <Button onClick={toInformation}>information links</Button>
            
        </div>}
        {show&&<UserActions/>}
    </>
}