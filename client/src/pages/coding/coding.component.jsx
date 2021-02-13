import React from "react";
import axios from "axios";
import Select from "react-select";

import CustomButton from "../../components/custom-button/custom-button.component";

import "./coding.styles.scss";

class CodingPage extends React.Component {
  constructor() {
    super();

    this.state = {
      code: "",
      input: "",
      language: "C++14",
      status: "Status",
      output: "Output",
      cpuTime:  "Cpu Time",
      memory: "Memory"
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

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
        const status = res.data.statusCode === 200 ? "Successful" : "Error";

        this.setState({ status: status });
        this.setState({ output: res.data.output });
        this.setState({ cpuTime: res.data.cpuTime });
        this.setState({ memory: res.data.memory });
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
    const languages = [
      {label: 'C', value: 'c'},
      {label: 'C++', value: 'cpp17'},
      {label: 'C#', value: 'csharp'},
      {label: 'Dart', value: 'dart'},
      {label: 'Go Lang', value: 'go'},
      {label: 'Java', value: 'java'},
      {label: 'Kotlin', value: 'kotlin'},
      {label: 'NodeJS', value: 'nodejs'},
      {label: 'PHP', value: 'php'},
      {label: 'Python', value: 'python2'},
      {label: 'Python3', value: 'python3'},
      {label: 'Racket', value: 'racket'},
      {label: 'Ruby', value: 'ruby'},
      {label: 'Rust', value: 'rust'},
      {label: 'Scala', value: 'scala'},
      {label: 'Swift', value: 'swift'},
    ]

    return (
      <div className="coding-page">
        <Select className="select" options={languages} placeholder="Choose a language" />
        <form onSubmit={this.handleSubmit}>
          <div className="coding">
            <textarea
              className="code"
              name="code"
              type="text"
              onChange={this.handleChange}
              value={this.state.code}
              placeholder="Write your code here"
            />
            <div className="output">
              <p>Status: {this.state.status}</p>
              <p>Output: {this.state.output}</p>
              <p>CPU Time: {this.state.cpuTime}</p>
              <p>Memory: {this.state.memory}</p>
            </div>
          </div>
          <textarea
            className="input"
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
      </div>
    );
  }
}

export default CodingPage;
