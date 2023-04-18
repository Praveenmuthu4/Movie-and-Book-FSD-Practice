import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import { Badge } from '@mui/material';

export function Counter() {
    // let like = 10
    let [likes, setLike] = useState(0);

    let [disLikes, setDisLike] = useState(0);

    let likeStyle = {
        color: likes >= 10 ? "green" : "black",
        fontWeight: 'bold'
    };

    let dislLikeStyle = {
        color: disLikes >= 10 ? "red" : "black",
    };

    // useEffect(() => {
    //     console.log("The like value is:", likes)
    // })

    return (
        <div>
            {/* {likes - disLikes >= 10 ? <h2>You are awesome ✨✨</h2> : null} */}

            <IconButton style={likeStyle} onClick={() => setLike(likes + 1)} color="primary" aria-label="like"><Badge badgeContent={likes} color="primary">👍</Badge></IconButton>

            <IconButton style={dislLikeStyle} onClick={() => setDisLike(disLikes + 1)} color="primary" aria-label="dislike"><Badge badgeContent={disLikes} color="error" >👎</Badge></IconButton>
        </div>
    );
}
