import React, { useState } from 'react';
import styled from 'styled-components';

// * --------- COMPONENTS --------- *
import SearchBarResult from './SearchBarResult'
import Absent from './Absent';


const SearchBar = props => {

    // * ---------- STATES ---------- *
    const [employeeList, setEmployeeList] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [unchoosen, setunchosen] = useState([]);
    const val=80;

    // * ---------- STYLE ---------- *
    const SearchSection = styled.section`
    display: grid;
    flex-flow: row;
    justify-content: center;
        display: grid;
        flex-direction: column;
        margin: 40px 10px;
        background-color: #ffffff;
        padding: 20px;
        width: 40%;
        h2 {
            margin-top : 0;
            font-size: 45px;
            line-height: 1;
            font-weight: normal;
            color: #013087;
            text-align: center;
        }
`
    const SearchContainer = styled.section`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `
    const AnswerDiv = styled.div`
        min-width: 90%;
`
    const SearchInput = styled.input`
        max-width: 200px;
        margin-bottom: 20px;
        outline: 0;
        border-width: 0 0 1px;
        border-color: #013087;
        padding: 5px;
    `
     const SearchButton = styled.button`
     max-width: 100px;
     padding: 10px 20px;
     background: forestgreen;
     border: none;
     border-radius: 3px;
     color: white;
     font-weight: bold;
     margin:0;
     cursor: pointer;
`
    const FormDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 90%;
    `


    const searchForEmployee = () => {
        const name = document.getElementById('searchForEmployee').value.toLowerCase()
        const date= document.getElementById('searchForDate').value.toLowerCase()
        if(name){
            fetch(`https://facedei.herokuapp.com/get_employee?name=${name}&date=${date}`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if(response){
                   setEmployeeList(response)
                } else {
                  setErrorMessage(response.Error)
                  // setLoading(false)
                }
            })
        }
        else{
           setEmployeeList(['No name find...'])
        }
    }
    const Myresult=props=>{
        return <Absent list={props.list}/>
    }
    const SearchListAnswer = props => {
        const plist=[]
        let obj = props.answer
        let answerList = Object.keys(obj).map(key => {
            plist.push(obj[key][0])
            return <SearchBarResult result={ obj[key] } />
        })
        console.log(answerList);
        console.log(plist);
        
        const list=["programming", "algorithms","mechanics","electronics","mathematics","thermodynamics","compiler","english"]
        var unchosen=list.filter(function(itm){
            return plist.indexOf(itm)==-1;
          });
        console.log(unchosen);
        return answerList
    }

    return (
            <SearchSection>
				<h2>Search for a Student</h2>
                <SearchContainer>
                    <FormDiv>
                        <SearchInput name='searchForEmployee' id='searchForEmployee' placeholder='Enter Name of Student' type="text"/>
                        <SearchInput name='searchForDate' id='searchForDate' placeholder='Enter Date in YYYY-MM-DD' type="text"/>
                        <SearchButton onClick={ searchForEmployee } id='searchButton'>Search</SearchButton>
                    </FormDiv>
                    <AnswerDiv>
                        {/* Show user's data if user found */}
                        { ( employeeList && !employeeList['error'] ) ?(<> <SearchListAnswer answer={ employeeList } />  </>): null }

                        {/* Show an error if user is not found */}
                        { employeeList['error'] ? <p>User not found...</p> : null }
                    </AnswerDiv>
                </SearchContainer>
			</SearchSection>
    );
};

export default SearchBar;
