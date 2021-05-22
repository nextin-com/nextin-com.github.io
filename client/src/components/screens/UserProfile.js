import React, {useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'


const Profile = ()=>{
    const [UserProfile,setProfile] = useState(null)
    const {state, dispatch} = useContext(UserContext)
    const {userid} = useParams()
    //const [showfollow, setShowFollow] = useState(state?!state.followers.includes(userid):true)
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            //console.log(result)
            setProfile(result)
        })
    },[])
    return(
        <>
        {UserProfile ?

        <div style={{maxWidth:"550px", margin:"0px auto"}}>
            <div style={{
                display:"flex",
                justifyContent: "space-around",
                margin:"18px 0px",
                borderBottom: "1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px"}}  
                    src={UserProfile.user.pic}
                    />
                </div>
                <div>
                    <h4>{UserProfile.user.name}</h4>
                    <h5>{UserProfile.user.email}</h5>
                    <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                        <h6>{UserProfile.posts.length} posts</h6>
                        {/* <h6>120 followers</h6>
                        <h6>2 following</h6> */}
                    </div>
                </div>
            </div>
       
            <div className="gallery">
                {
                    UserProfile.posts.map(item=>{
                        return(
                            <img key={item._id} className="item" src={item.photo} alt={item.title} />
                        )
                    })
                }
            </div>
        </div>

        : <h2>loading . . . !</h2>}
        </>
    )
}

export default Profile