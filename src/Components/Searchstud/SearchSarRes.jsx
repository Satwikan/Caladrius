import React from 'react';
import styled from 'styled-components'

const SearchSarRes = props => {
    // * ---------- STYLES ---------- *
    const OneResult = styled.div`
        padding: 15px;
        margin: 15px 0;
        min-width: 100%;
        -moz-box-shadow:    3px 3px 8px 3px #ccc;
        -webkit-box-shadow: 3px 3px 8px 3px #ccc;
        box-shadow:         3px 3px 8px 3px #ccc;
`
    const ListItem = styled.li`
        list-style: none;
        margin-bottom: 5px;
`
    const UlList = styled.ul`
      min-width: 100%;
`
    const list=["programming", "algorithms","mechanics","electronics","mathematics","thermodynamics","compiler","english"]

    
    return (
            <OneResult>
                <UlList>
                    
                    <ListItem><b>Date:</b> <i>{ props.result[0] } </i></ListItem>
                    <ListItem><b>Arrival time:</b> <i>{ props.result[1] } </i></ListItem>
                    

                   
                </UlList>
                
            </OneResult>
    );
};

export default SearchSarRes;
