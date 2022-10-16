import React, { Fragment, useState } from 'react'
import './index.css'
import './App.css'
import VideoFeed from './Components/VideoFeed/VideoFeed'
import SearchBar from './Components/SearchBar/SearchBar'
import LastArrivalList from './Components/LastArrivalList/LastArrivalList'
import AdminBlock from './Components/AdminBlock/AdminBlock'
import styled from 'styled-components'
import { useAuth0 } from '@auth0/auth0-react'
import Navbar  from './Components/Navbar'
import { useMediaQuery } from 'react-responsive'
import SearchB from './Components/Searchsubject/SearchB'
import SearchSar from './Components/Searchstud/SearchSar'
import TimeTable from './Components/TimeTable'




function App() {
    const {
		// Auth state:
		error,
		isAuthenticated,
		isLoading,
		user}=useAuth0()
	const admin=["sachin31301@gmail.com","admin@gmail.com"];
	

	var isadmin=false;
	const[check,setcheck]=useState(false)
	
	console.log(admin[0]==user.email);
	if(admin.includes(user.email)){
		console.log("aaya hub");
		isadmin=true;
	}
	console.log(user.email,isadmin);
	

	// * ---------- STYLE ---------- *
	const TitleOne = styled.h1`
		margin-top : 30px;
		font-size: 50px;
		line-height: 1;
		font-weight: bold;
		color: #013087;
		text-align: center;
`
	const MainContainer = styled.main`
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
`
    const image=styled.main`
	
		width: 35px !important;
		height: 35px;
		border-radius: 50%;
		object-fit: cover;
	  
	`
	const isMobileDevice = useMediaQuery({
		query: "(max-device-width: 480px)",
	  });
	  
	  const isLaptop = useMediaQuery({
		query: "(min-device-width: 1024px)",
	  });

	  console.log(isMobileDevice,isLaptop );
	  var mob=false;
	  if(isMobileDevice){
		mob=true;
	  }

    if (!isadmin) {
		return (
			<Fragment>
			<TitleOne>Face Recognition Based Attendance</TitleOne>
			<Navbar check={isadmin}></Navbar>
			<TimeTable/>
			<MainContainer>
				
				<VideoFeed ism={mob}/>
				<LastArrivalList ism={mob} />
				
				
				
			</MainContainer>
		</Fragment>
		)
	} else {
		return(
			<Fragment>
			<TitleOne>Face Recognition Based Attendance</TitleOne>
			<Navbar check={isadmin}></Navbar>
			<MainContainer>
				
				
				<AdminBlock ism={mob} />
				
				<SearchBar ism={mob} />
				<SearchB ism={mob} />
				<SearchSar ism={mob}/>
				
				
			</MainContainer>
		</Fragment>
		)
	}


	}

export default App
