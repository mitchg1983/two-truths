import "./App.css";
import React, { Component } from "react";

const serverURL = "http://ce44-108-53-232-66.ngrok.io";

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
      promptPoll: {
        username: "",
        promptOne: "",
        promptTwo: "",
        promptThree: "",
        voteOne: "",
        voteTwo: "",
        voteThree: "",
      },
      pollResultShow: "hide",
    };
  }

  handleSendVote = async () => {
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
        userName: this.state.username,
        promptVote: parseInt(this.state.vote, 10),
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
        userName: this.state.username,
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

  onRadioChange = (e) => {
    this.setState({
      vote: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };

  showPromptPoll = async () => {
    const { pollResultShow } = this.state;
    const response = await fetch(`${serverURL}/prompt-poll`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "access-control-request-headers": "content-type",
        "x-Trigger": "CORS",
      },
    });
    const sendPromptsResponse = await response.text();
    const parsedResponse = JSON.parse(sendPromptsResponse);
    console.log(parsedResponse);
    this.setState({
      promptPoll: {
        username: parsedResponse.currentPrompt.userName,
        promptOne: parsedResponse.currentPrompt.prompts.promptOne.prompt,
        promptTwo: parsedResponse.currentPrompt.prompts.promptTwo.prompt,
        promptThree: parsedResponse.currentPrompt.prompts.promptThree.prompt,
        voteOne: parsedResponse.promptVotes[1],
        voteTwo: parsedResponse.promptVotes[2],
        voteThree: parsedResponse.promptVotes[3],
      },
    });

    const textOutput = document.getElementById("pollResultText");

    console.log(textOutput.style.height)

    if (pollResultShow === "hide") {
      // textOutput.classList.remove("hide");
      // textOutput.classList.add("show");
      textOutput.style.height = "auto";
      this.setState({
        pollResultShow: "show",
      })
    }
    if (pollResultShow === "show") {
      // textOutput.classList.remove("show");
      // textOutput.classList.add("hide");
      textOutput.style.height = 0;

      this.setState({
        pollResultShow: "hide",
      })
    }

    // this.setState({
    //   pollResultShow: !pollResultShow,
    // });

    return;
  };

  render() {
    const { username } = this.state;

    const showPromptPoll = async () => {
      return <div>Hello There</div>;
    };

    return (
      <div className="App">

<div className="pollresults hide" id="pollResultText">
              <ul>
                <li>Username - {this.state.promptPoll.username}</li>
                <li>Prompt One - {this.state.promptPoll.promptOne}</li>
                <li>Prompt Two - {this.state.promptPoll.promptTwo}</li>
                <li>Prompt Three - {this.state.promptPoll.promptThree}</li>
                <li>Vote One - {this.state.promptPoll.voteOne}</li>
                <li>Vote Two - {this.state.promptPoll.voteTwo}</li>
                <li>Vote Three - {this.state.promptPoll.voteThree}</li>
              </ul>
            </div>


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
            <div className="cut"> -User Name</div>
            <label htmlFor="user-name" className="placeholder">
              User Name
            </label>
          </div>
          <div className="PromptsInput">
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
              <div className="cut"> -Fact One</div>
              <label htmlFor="prompt-one" className="placeholder">
                Fact One
              </label>
              <div className="lieBox">
                <input
                  type="checkbox"
                  checked={this.state.promptOne.isLie}
                  name="promptOne"
                  onChange={this.handleLieBoxChange}
                />
                <label className="subtitle">1 is the lie</label>
              </div>
            </div>
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
              <div className="cut"> -Fact Two</div>
              <label htmlFor="prompt-two" className="placeholder">
                Fact Two
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                checked={this.state.promptTwo.isLie}
                name="promptTwoLie"
                onChange={this.handleLieBoxChange}
                value="2 is the lie"
              />
              <label htmlFor="promptTwoLie" className="subtitle">
                2 is the lie
              </label>
            </div>
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
              <div className="cut"> -Fact Three</div>
              <label htmlFor="prompt-three" className="placeholder">
                Fact Three
              </label>
            </div>
            <input
              type="checkbox"
              checked={this.state.promptThree.isLie}
              name="promptThree"
              onChange={this.handleLieBoxChange}
            />
            <label className="subtitle">3 is the lie</label>
          </div>
          <div>
            <button className="submit" onClick={this.sendPrompts}>
              Send Prompts
            </button>
          </div>
          <div className="colorSubmit">
            <ul>
              <li>
                <label className="subtitle">
                  <input
                    type="radio"
                    value="1"
                    checked={this.state.vote === "1"}
                    onChange={this.onRadioChange}
                  />
                  <span>Prompt One</span>
                </label>
              </li>
              <li>
                <label className="subtitle">
                  <input
                    type="radio"
                    value="2"
                    checked={this.state.vote === "2"}
                    onChange={this.onRadioChange}
                  />
                  <span>Prompt Two</span>
                </label>
              </li>
              <li>
                <label className="subtitle">
                  <input
                    type="radio"
                    value="3"
                    checked={this.state.vote === "3"}
                    onChange={this.onRadioChange}
                  />
                  <span>Prompt Three</span>
                </label>
              </li>
            </ul>
          </div>
          <button className="submit" onClick={this.handleSendVote}>
            Vote!
          </button>

          <div className="promptpoll subtitle">
            <button className="submit" onClick={this.showPromptPoll}>
              Show Prompt Poll
            </button>


          </div>

        </div>

      </div>
    );
  }
}

export default App;
