import React from 'react';
import {Media} from 'reactstrap';

function RenderLeader(props) {
    if(props.leader != null) {
      return (
       
       <Media tag="li">
         <Media left className="mr-3 align-self-center" >
            <Media object src={props.leader.image} alt={props.leader.name} />
         </Media>
         <Media body>
            <Media heading>{props.leader.name}</Media>
            <h6>{props.leader.designation}</h6>
            <p>{props.leader.description}</p>
         </Media>
       </Media>     
       	);

    }
    else {
    	return(<div></div>);
    }

}

export default RenderLeader;