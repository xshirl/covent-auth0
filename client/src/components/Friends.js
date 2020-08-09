import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { userProfile } from '../api/apiUsers'
import {  } from '../api/apiCalls'
import { getFriendRequests, sendFriendRequest, acceptFriendRequests } from '../api/apiCalls';

export default class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      errMsg: '',
      user: null,
      sent: [],
      received: [],
      inputFRUsername: ''
    };
  }

  async componentDidMount() {
    try {
      const response = await userProfile();
      console.log(response);
      const frResponse = await getFriendRequests();
      console.log(frResponse);
      this.setState({
        user: response.user,
        sent: frResponse.sent,
        received: frResponse.received
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        errMsg: error.message || 'Failed to load user data from API'
      })
    }
  }

  acceptFR = async (frId) => {
    try {
      const response = await acceptFriendRequests(frId);
      console.log(response);
      
    } catch (error) {
      console.log(error);
      this.setState({
        errMsg: error.message || 'Failed to process friend request with API'
      })
    }
  }

  makeFR = async () => {
    try {
      const response = await sendFriendRequest({reqUsername: this.state.inputFRUsername});
      console.log(response);
      
    } catch (error) {
      console.log(error);
      this.setState({
        errMsg: error.message || 'Failed to process friend request with API'
      })
    }
  }

  // page where we can see current friends 
  // see current friend requests - incoming and outgoing 
  // accept incoming friend requests 
  render() {
    console.log(this.state)
    const { user, loading, errMsg, sent, received } = this.state;

    if (user) {
      return (
        <div>
          { errMsg ? <h2> {errMsg} </h2> : null }

          <h1> Welcome, {user.name} </h1>
          
          <h2> Currently Friends With: </h2>
          {
            user.friends.map(fren => {
              return <p>{fren.username}</p>
            })
          }

          <h2>Make Friend Request</h2>
          <form onSubmit={this.makeFR}>
            <label>Send Friend Request To This Username</label>
            <input type="text"
              value={this.state.inputFRUsername}
              onChange={e => {
                this.setState({
                  inputFRUsername: e.target.value
                })
              }}
            />
            
            <button>Submit</button>
          </form>

          <h2>Incoming Friend Requests</h2>
          {
            received.map(fr => {
              return (
                <div> 
                  <p>From: {fr.creator.username}</p>
                  <p>{fr.confirmed ? 'Confirmed' : 'Awaiting Confirmation'}</p>
                  <button
                    onClick={() => { this.acceptFR(fr.id) }}
                    disabled={fr.confirmed}
                  >
                    Accept Friend Request
                  </button>
                </div>
              )
            })
          }

          <h2>Outgoing Friend Requests</h2>
          {
            sent.map(fr => {
              return (
                <div> 
                  <p>To: {fr.recipient.username}</p>
                  <p>{fr.confirmed ? 'Confirmed' : 'Awaiting Confirmation'}</p>
                </div>
              )
            })
          }

        </div>
      )
    } else {
      if (loading) {
        return (
          <div>
            <h1>Loading...</h1>
          </div>
        )
      } else {
        return (
          <div>
            { errMsg ? <h2> {errMsg} </h2> : null }
            <h1>You are not logged in!</h1>
            <Link to="/login">Return to login page</Link>
          </div>
        )
      }
    }
  }
}

