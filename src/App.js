import "./App.css";
import React, { Component } from "react";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Two Truths & A Lie</h1>
        <br />
        <div className="Form">
          <form>
            <label>
              User Name: <input type="text" name="username" />
            </label>

            <ul className="FactInputs">
              <li>
                <label>
                  "Fact" 1 <input type="text" />
                </label>
                <label>
                  isLie
                  <input type="checkbox" />
                </label>
              </li>

              <li>
                <label>
                  "Fact" 2 <input type="text" />
                </label>
                <label>
                  isLie
                  <input type="checkbox" />
                </label>
              </li>

              <li>
                <label>
                  "Fact" 3 <input type="text" />
                </label>
                <label>
                  isLie
                  <input type="checkbox" />
                </label>
              </li>
            </ul>

            <div className="InfoBottom">
              <label>
                Vote <input type="number" />
              </label>
              <br />
              <button>Send "Fact"</button>
              <button>Send Vote</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;

//
//
// //
// function App() {
//   return (
//     <div className="App">
//       <h1>Two Truths & A Lie</h1>
//       <br />
//       <div className="Form">
//         <form>
//           <label>
//             User Name: <input type="text" name="username" />
//           </label>

//           <ul className="FactInputs">
//             <li>
//               <label>
//                 "Fact" 1 <input type="text" />
//               </label>
//               <label>
//                 isLie
//                 <input type="checkbox" />
//               </label>
//             </li>

//             <li>
//               <label>
//                 "Fact" 2 <input type="text" />
//               </label>
//               <label>
//                 isLie
//                 <input type="checkbox" />
//               </label>
//             </li>

//             <li>
//               <label>
//                 "Fact" 3 <input type="text" />
//               </label>
//               <label>
//                 isLie
//                 <input type="checkbox" />
//               </label>
//             </li>
//           </ul>

//           <div className="InfoBottom">
//             <label>
//               Vote <input type="number" />
//             </label>
//             <br />
//             <button>Send "Fact"</button>
//             <button>Send Vote</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default App;
