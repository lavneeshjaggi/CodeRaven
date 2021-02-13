import React from "react";
import axios from "axios";

import CustomButton from "../../components/custom-button/custom-button.component";

import "./coding.styles.scss";

class CodingPage extends React.Component {
  constructor() {
    super();

    this.state = {
      code: "",
      input: "",
      output: "Testing",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    // #include<iostream> using namespace std; int main() { cout<<"Hello World!"; return 0; }

    // ----------------------------------------------------------------------------------

    // #include<iostream>

    // using namespace std;

    // int main() {
    //       cout<<"Hello World!";

    //       return 0;
    // }

    // ----------------------------------------------------------------------------------

    // #include<iostream>

    // using namespace std;

    // int main() {
    //     int n; 

    //     cin>>n;

    //     cout<<n;

    //     return 0;
    // }

    axios
      .post("/coding", {
        code: this.state.code,
        input: this.state.input,
        language: "cpp",
      })
      .then((res) => {
        this.setState({ output: res.data.output });
      })
      .catch((err) => {
        this.setState({ output: "Some error occured" });
        console.log(err);
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="coding-page">
        <form onSubmit={this.handleSubmit}>
          <textarea
            className="text"
            name="code"
            type="text"
            onChange={this.handleChange}
            value={this.state.code}
            placeholder="Write your code here"
          />
          <textarea
            className="text"
            name="input"
            type="text"
            onChange={this.handleChange}
            value={this.state.input}
            placeholder="Write input here"
          />
          {/* <FormInput
            className="text"
            name="input"
            type="text"
            placeholder="Write custom input here"
            /> */}
          <div className="buttons">
            <CustomButton type="submit">Run Code</CustomButton>
          </div>
        </form>

        <div className="output">
          <h1>{this.state.output}</h1>
        </div>
      </div>
    );
  }
}

export default CodingPage;
