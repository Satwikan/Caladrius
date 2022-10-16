import React, { useState,useEffect } from 'react';
import styled from 'styled-components'
import LastArrivalItems from '../LastArrivalList/LastArrivalItems'
import realodImg from "../../assets/img/reload.png"


const LastArrivalList = (props) => {
    var val=40
    console.log(props.ism,"menecheckkiya");
    const LastArrivalSection = styled.section`
    display: grid;
    flex-flow: row;
    justify-content: center;
            display: grid;
            flex-direction: column;
            align-items: center;
            margin: 40px 10px;
            background-color: #ffffff;
            padding: 20px;
            width: ${props => props.ism == true ? '70%' : '45%'}
            h2 {
                margin-top : 0;
                font-size: 45px;
                line-height: 1;
                font-weight: normal;
                color: #013087;
                text-align: center;
            }
        `
    const AnswerDiv = styled.div`
        min-width: 80%;
`
    const ReloadImgTag = styled.img`
        align-items: center;
        text-align:center;
        margin-left:40%
        justify-content: center;
        cursor: pointer;
        border-radius: 50%;
`
    // * ---------- STATES --------- *
    const [employeeList, setEmployeeList] = useState([]);
    const [isListIsLoad, setIsListIsLoad] = useState(false);

    const searchForLastEntries = () => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
       // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
        headers.append('Origin','https://facedei.herokuapp.com/');
        if (!isListIsLoad){
            
            fetch('https://facedei.herokuapp.com/get_5_last_entries',{
                crossDomain:true,
 
              headers: {'Content-Type':'application/json'},
              })
            .then(response => response.json())
            .then(response => {
                if(response) {
                    setEmployeeList(response)
                    console.log(response)
                    setIsListIsLoad(true)
                }
            })
       
        }
    }
    const LastEntriestAnswer = props => {
        let obj = props.answer
        let answerList = Object.keys(obj).map(key => {
            return <LastArrivalItems result={ obj[key] } />
        })
        return answerList
    }
    searchForLastEntries()

    return (
        <LastArrivalSection className='some-space'>
            <h2>Last arrivals</h2>
            <ReloadImgTag onClick={ () => setIsListIsLoad(false) } src={ realodImg } alt="reload"/>
                    <AnswerDiv>
                        {/* Show user's data if user found */}
                        { ( employeeList && !employeeList['error'] ) ? <LastEntriestAnswer answer={ employeeList } /> : null }
                        {/* Show an error if user is not found */}
                        { employeeList['error'] ? <p>User not found...</p> : null }
                    </AnswerDiv>
			</LastArrivalSection>
    );
};

export default LastArrivalList;
