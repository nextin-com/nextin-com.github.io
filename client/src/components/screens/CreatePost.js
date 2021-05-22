import React, {useState, useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

const CreatePost = ()=>{
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    useEffect(()=>{
        if(url){
        fetch("/createpost",{
            method: "post",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " +localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title,
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"#757575 grey darken-1"})
            }
            else{
                M.toast({html:"Created post successfully", classes:"#43a047 green darken-1"})
                history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    },[url])

    const postDetails = ()=>{
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name", "dqy4aqkfy")
        fetch("https://api.cloudinary.com/v1_1/dqy4aqkfy/image/upload",{
            method: "post",
            body: data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })

        
    }

    return(
        <div className="card input-field"
        style={{
            margin:"10px auto",
            marginTop: "20px",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}>
            <input 
            type="text" 
            placeholder="title" 
            value={title} 
            onChange={(e)=>setTitle(e.target.value)} 
            />
            <input 
            type="text" 
            placeholder="body" 
            value={body} 
            onChange={(e)=>setBody(e.target.value)} 
            />
            <div style={{display:"flex", justifyContent:"space-around"}}>
            <div className="file-field input-field">
               <div className="btn  #64b5f6 blue darken-1" style={{width:"150px"}}>
                  <span>Upload image</span>
                  <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
               </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>postDetails()} >
                    Submit
            </button>
            </div>
        </div>
    )
}

export default CreatePost