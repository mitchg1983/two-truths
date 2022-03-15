import "./App.css";
import React, { Component } from "react";

const serverURL = "http://cab2-108-53-232-66.ngrok.io";

async function ping(userName) {
  const response = await fetch(`${serverURL}/ping`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-control-request-headers": "content-type",
      "x-Trigger": "CORS",
    },
    body: JSON.stringify({
      userName,
    }),
  });
  const pingResponse = await response.text();

  console.log(pingResponse);

  return pingResponse;
}

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      vote: "",
      promptOne: {
        text: "",
        isLie: false,
      },
      promptTwo: {
        text: "",
        isLie: false,
      },
      promptThree: {
        text: "",
        isLie: false,
      },
    };
  }

  handleSendVote = async () => {
    const getVote = () => {
      if (this.state.promptOne.isLie) {
        return 1;
      }
      if (this.state.promptTwo.isLie) {
        return 2;
      }
      if (this.state.promptThree.isLie) {
        return 3;
      } else return "";
    };

    const response = await fetch(`${serverURL}/prompt-vote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "access-control-request-headers": "content-type",
        "x-Trigger": "CORS",
      },
      body: JSON.stringify({
        userName: "Geoff",
        promptVote: getVote(),
      }),
    });
    const sendPromptsResponse = await response.text();

    console.log(sendPromptsResponse);

    return sendPromptsResponse;
  };

  sendPrompts = async () => {
    const response = await fetch(`${serverURL}/prompt-submit`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "access-control-request-headers": "content-type",
        "x-Trigger": "CORS",
      },
      body: JSON.stringify({
        userName: "Geoff",
        prompts: {
          promptOne: {
            prompt: this.state.promptOne.text,
            isLie: this.state.promptOne.isLie,
          },
          promptTwo: {
            prompt: this.state.promptTwo.text,
            isLie: this.state.promptTwo.isLie,
          },
          promptThree: {
            prompt: this.state.promptThree.text,
            isLie: this.state.promptThree.isLie,
          },
        },
      }),
    });
    const sendPromptsResponse = await response.text();

    console.log(sendPromptsResponse);

    return sendPromptsResponse;
  };

  handlePromptOneOnInputChange = (event) => {
    this.setState({
      [event.target.name]: {
        ...this.state[event.target.name],
        text: event.target.value,
      },
    });
  };

  handleUsernameOnInputChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleLieBoxChange = (event) => {
    this.setState({
      [event.target.name]: {
        ...this.state[event.target.name],
        isLie: !this.state[event.target.name].isLie,
      },
    });
  };

  render() {
    const { username } = this.state;
    return (
      <div className="form">
        <div className="title">Two Truths & A Lie</div>
          <div className="input-container ic1">
            <input
            id="user-name"
              type="text"
              name="username"
              placeholder=" "
              className="input"
              value={username}
              onChange={this.handleUsernameOnInputChange}
            />
            <div className="cut"></div>
            <label for="user-name" className="placeholder">User Name</label>
          </div>

          <div className="PromptsInput">
            <form className="FactInputs" onSubmit={this.handlePromptsOnSubmit}>
              <div className="input-container ic1">
                <input
                id="prompt-one"
                  type="text"
                  className="input"
                  placeholder=" "
                  name="promptOne"
                  value={this.text}
                  onChange={this.handlePromptOneOnInputChange}
                />
                <div className="cut"></div>
                <label for="prompt-one" className="placeholder">Fact One</label>
              </div>
              <input
                type="checkbox"
                checked={this.state.promptOne.isLie}
                name="promptOne"
                onChange={this.handleLieBoxChange}
              />
              <label className="subtitle">1 is the lie</label>

              <div className="input-container ic1">
                <input
                  type="text"
                  id="prompt-two"
                  placeholder=" "
                  name="promptTwo"
                  className="input"
                  value={this.text}
                  onChange={this.handlePromptOneOnInputChange}
                />
                <div className="cut"></div>
                <label for="prompttwo" className="placeholder">Fact Two</label>
              </div>
              <input
                type="checkbox"
                checked={this.state.promptTwo.isLie}
                name="promptTwo"
                onChange={this.handleLieBoxChange}
              />
              <label className="subtitle">2 is the lie</label>
              <div className="input-container ic1">
                <input
                id="prompt-three"
                  type="text"
                  placeholder=" "
                  name="promptThree"
                  className="input"
                  value={this.text}
                  onChange={this.handlePromptOneOnInputChange}
                />

                <div className="cut"></div>
                <label for="prompt-three" className="placeholder">Fact Three</label>
              </div>
                              <input
                  type="checkbox"
                  checked={this.state.promptThree.isLie}
                  name="promptThree"
                  onChange={this.handleLieBoxChange}
                />

              <label className="subtitle">3 is the lie</label>
            </form>
          </div>

        <div>
        <button onClick={this.handleSendVote}>Vote!</button>
        <button onClick={this.sendPrompts}>Send Prompts</button>
        </div>
      </div>
    );
  }
}

export default App;
