
import styled from 'styled-components'
import React, { Component, useState } from 'react';

import Webcam from "react-webcam";


var uploader = require('base64-image-upload');

const WebcamComponent = () => <Webcam />;
const videoConstraints = {
  width: 220,
  height: 200,
  padding: 20,
  facingMode: "user"
};

const mystyle = {
  width: 220,
  height: 130,
  borderRadius: 0,
  
};
const VideoFeed = (props) => {
  var val=40
  
const VideoFeedSection = styled.section`
display: flex;
    flex-flow: row;
    justify-content: center;
    text-align:center;
        display: flex;
        flex-direction: column;
        margin: 40px 10px;
        background-color: #ffffff;
        padding: 20px;
        width: ${props => props.ism == true ? '100%' : '45%'}
        h2 {
            margin-top : 0;
            font-size: 45px;
            line-height: 1;
            font-weight: normal;
            color: #013087;
            text-align: center;
        }
`
const StyledButton = styled.button`
background: #0069eb;
  color: #fff;
  border-radius: 6px;
  border: none;
  font-size: 16px;
  padding: 10px 10px;
  text-decoration: none;
`;
const Button = styled.button`
background: #013087;
  color: white;
  font-size: 20px;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  &:disabled {
    color: grey;
    opacity: 0.7;
    cursor: default;
  }
`;


  const [isUserWellAdded, setIsUserWellAdded] = useState(false);
  const [errorWhileAddingUser, seterrorWhileAddingUser] = useState(false);
    const [image,setImage]=useState('');

const webcamRef = React.useRef(null);

  const capture = React.useCallback(
    () => {
      const gettime = () => {
        var today = new Date(),

    time = today.getHours() + ':' + today.getMinutes()
        return time;
     }
     const getdate = () => {
      var today = new Date(),

      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      return date;
   }
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
      console.log(imageSrc)
      var picture = imageSrc;
      function DataURIToBlob(dataURI) {
        const splitDataURI = dataURI.split(',')
        const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
        const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

        const ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i)

        return new Blob([ia], { type: mimeString })
      }
      const file = DataURIToBlob(picture)
     const formData = new FormData();
       formData.append('picture', file, 'image.jpg')
       fetch('https://facedei.herokuapp.com/imageshow',{
            method: 'POST',
            body:  formData,
        })
            .then(reposonse => reposonse.json())
            .then(response => {
                console.log(response)
                setIsUserWellAdded(true)
            })
            .catch(error => seterrorWhileAddingUser(true))


      
      
    },

    [webcamRef]
  );

  return (
      <VideoFeedSection>
    <div className="webcam-container">
      <Webcam
        audio={false}
        height={200}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={220}
        videoConstraints={videoConstraints}
      />
      
     
      
    </div>
    <div>
    <Button 
      onClick={(e)=>{e.preventDefault();capture();}}>
      Capture</Button>
    </div>
    <div className="webcam-container">
 <div className="webcam-img">
 
 {image==''?<Webcam
 audio={false}
 height={200}
 ref={webcamRef}
 screenshotFormat="image/jpeg"
  width={220}
 videoConstraints={videoConstraints}
/>:<img style={mystyle} src={image}/>}
</div>
</div>
<div>
{image!=''?
<Button onClick={(e)=>
{
e.preventDefault();
setImage('')
}}
className="webcam-btn">
Retake Image</Button>:
null
}
</div>
    </VideoFeedSection>
    
  );
};

export default VideoFeed;
