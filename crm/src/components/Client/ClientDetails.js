import React, {useState, useEffect} from 'react';
import {APIURL} from '../../config';
import {Link, Redirect} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Transactions from '../Transactions/Transaction';

const ClientDetails = (props) => {
    const [client, setClient] = useState(null);
    const [deleted, setDeleted] = useState(false);

    const [error, setError] = useState(false);
    console.log(props)
    const emailId = props.match.params.emailId;
    // console.log(emailId);

    useEffect(() => {
        const url = `${APIURL}/api/clients/${emailId}`;
        fetch(url, {
            method: 'GET',
      headers: {
                  'Authorization': `Bearer ${props.userToken}`,
      }
    })
    .then((response) => response.json()).then(setClient).catch(() => {
            // Update the state if there was an error
            // so we can give feedback to the user!
            setError(true);
        });
    }, []);

    const onDeleteClient = (event) => {
        const url = `${APIURL}/api/clients/${emailId}`;
        fetch(url, {method: 'DELETE',
        headers: {
        'Authorization': `Bearer ${props.userToken}`,
        }})
            .then((res) => {
                setDeleted(true);
            })
            .catch(console.error);
    };
    // If we deleted the client, redirect back to the client list
    if (deleted) {
        return <Redirect to='/api/clients' />;
    }

    // Check if there was an error
    // If there is give the user feedback!
    if (error) {
        return <div>Sorry, there was a problem getting the clients</div>;
    }

    // Check if we have our clients
    // Display "Loading..." if not

    return (
<<<<<<< HEAD
        <>
        {!client ? '' : (
        <div className='col-md ml-3 mt-3'>
          
          <Card style={{ width: '20rem' }}>
  
  <Card.Body>
        <Card.Title>Welcome, {client.firstname}</Card.Title>
    <Card.Text>
           First Name: {client.firstname}
    </Card.Text>
    <Card.Text>Last Name: {client.lastname}</Card.Text>
    <Card.Text>Email:{client.email}</Card.Text>
    <Card.Text>Address:{client.address}</Card.Text>
    <Card.Text>City:{client.city}</Card.Text>
    <Card.Text> State:{client.state}</Card.Text>
    <Card.Text>Zip:{client.zip}</Card.Text>
    
  </Card.Body>
</Card>




         

       </div>)}
        
            <div className='col-md mt-5'>
                <Link className='btn btn-info btn-md' to={`/api/clients/${emailId}/edit`}>
                    Edit
                </Link>

                <button className='btn btn-danger mr-3 ml-3' onClick={onDeleteClient}>
                    Delete
                </button>
                <Link className='btn btn-info btn-md margin-0' to={`/api/clients`}>
                    Go Back
                </Link>
            </div>
            <Transactions emailId = {emailId} userToken={props.userToken}/>
        </>
    );
=======
			<>
				{!client ? (
					''
				) : (
					<div>
						<p>First Name :{client.firstname} </p>
						<p>lastName : {client.lastname}</p>
						<p>Email:{client.email}</p>
						<p>Address:{client.address}</p>
						<p>City:{client.city}</p>
						<p>State:{client.state}</p>
						<p>Zip:{client.zip}</p>
						<p>transactions:{client.transactions}</p>

						<div>
							<Link
								className='btn btn-info btn-md'
								to={`/api/clients/${emailId}/edit`}>
								Edit
							</Link>
							<Link
								className='btn btn-info btn-md'
								to={`/api/clients/${emailId}/transactions`}>
								transactions
							</Link>
							<button
								className='btn btn-danger mr-3 ml-3'
								onClick={onDeleteClient}>
								Delete
							</button>
							<Link
								className='btn btn-info btn-md margin-0'
								to={`/api/clients`}>
								Go Back
							</Link>
						</div>
					</div>
				)}
			</>
		);
>>>>>>> created dashboard component, updated footer and contact form
};

export default ClientDetails;
