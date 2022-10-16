import React, { useState } from 'react';
import styled from 'styled-components';

// * --------- COMPONENTS --------- *
import SearchSarRes from './SearchSarRes';



const SearchSar = props => {

    // * ---------- STATES ---------- *
    const [employeeList, setEmployeeList] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [unchoosen, setunchosen] = useState([]);
    const[count,setcount]=useState(0);
    const[subount,setsubcount]=useState(0);
    //const[pubount,setpubcount]=useState(0);
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
        padding: 20px ;
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
     margin:10px;
     cursor: pointer;
`
    const FormDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 90%;
    `
    const ButtonDiv = styled.div`
    display: flex;
  justify-content: space-between;
  padding: 15px 15px 15px 15px;
  justify-content: space-evenly;
  margin: auto;
    `
    const H3AddEmployee = styled.h3`
    margin-left:10px
    text-align:center
    display: flex;
    align-items: center;
`


    const searchForSubjectf = () => {
        setsubcount(0)
        //setpubcount(1)
        const subj = document.getElementById('searchForSubj').value.toLowerCase()
        const sname= document.getElementById('searchForStud').value.toLowerCase()
        if(subj){
            fetch(`https://facedei.herokuapp.com/get_subname?subj=${subj}&sname=${sname}`)
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

    const SearchForCount=()=>{
        setsubcount(1)
       // setpubcount(0)
        const subj = document.getElementById('searchForSubj').value.toLowerCase()
        const sname= document.getElementById('searchForStud').value.toLowerCase()
        if(subj){
            fetch(`https://facedei.herokuapp.com/get_subcount?subj=${subj}&sname=${sname}`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if(response){
                   setcount(response)
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
   
    const SearchListAnswer = props => {
        const plist=[]
        let obj = props.answer
        let answerList = Object.keys(obj).map(key => {
            plist.push(obj[key][0])
            return <SearchSarRes result={ obj[key] } />
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
				<h2>Student in Subject</h2>
                <SearchContainer>
                    <FormDiv>
                        <SearchInput name='searchForStud' id='searchForStud' placeholder='Enter Student Name' type="text"/>
                        <SearchInput name='searchForSubj' id='searchForSubj' placeholder='Enter subject' type="text"/>
                        <ButtonDiv>
                        <SearchButton onClick={ searchForSubjectf } id='searchButton'>Search</SearchButton>
                        
                        <SearchButton onClick={ SearchForCount } id='searchButton'>Count</SearchButton>
                        </ButtonDiv>
                    </FormDiv>
                    <AnswerDiv>
                        {/* Show user's data if user found */}
                        { ( employeeList && !employeeList['error'] &&!subount) ?(<> <SearchListAnswer answer={ employeeList } />  </>): null }
                        { ( count && !employeeList['error']&&subount ) ?(<><H3AddEmployee>Present on {count} days out of 28 days </H3AddEmployee> </>): null }

                        {/* Show an error if user is not found */}
                        { employeeList['error'] ? <p>User not found...</p> : null }
                    </AnswerDiv>
                </SearchContainer>
			</SearchSection>
    );
};

export default SearchSar;
