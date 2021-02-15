import React from "react";
import axios from "axios";
import Select from "react-select";
import Editor from "react-simple-code-editor";
import Highlight from "react-hljs";
// import Prism from "prismjs";
// import AceEditor from "react-ace";

// import { highlight, languages } from "prismjs/components/prism-core";
// import "prismjs/components/prism-clike";
// import "prismjs/components/prism-javascript";

import CustomButton from "../../components/custom-button/custom-button.component";
import Languages from "./languages";

import "./coding.styles.scss";

// import "ace-builds/src-noconflict/mode-java";
// import "ace-builds/src-noconflict/mode-cpp";
// import "ace-builds/src-noconflict/theme-github";
// import "ace-builds/src-noconflict/theme-monokai";

class CodingPage extends React.Component {
  constructor() {
    super();

    this.state = {
      code: "",
      input: "",
      language: "C++",
      status: "",
      output: "",
      cpuTime: "",
      memory: "",
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
        var { output, cpuTime, memory } = res.data;

        cpuTime *= 1000;
        memory = (memory / 1024).toFixed(1);

        this.setState({ status: status });
        this.setState({ output: output });
        this.setState({ cpuTime: cpuTime });
        this.setState({ memory: memory });
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
        <Select
          className="options"
          options={Languages}
          placeholder="Choose a language"
        />
        {/* <AceEditor className="test" /> */}
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="coding-area">
            <div className="source-code">
              <h3 className="item1">Source Code</h3>
              <Highlight className="js">
                {this.state.language}
                {/* <Editor
                  className="test"
                  value={this.state.code}
                  onValueChange={(code) => this.setState({ code })}
                  // highlight={(code) => highlight(code, languages.js)}
                  padding={3}
                  tabSize={6}
                  style={{
                    fontSize: 15,
                  }}
                /> */}
              </Highlight>
              {/* <textarea
                className="item2"
                name="code"
                onChange={this.handleChange}
                value={this.state.code}
              /> */}
            </div>
            <div className="text">
              <div className="input">
                <h3 className="item3">Input</h3>
                <textarea
                  className="item4"
                  name="input"
                  onChange={this.handleChange}
                  value={this.state.input}
                />
              </div>
              <div className="output">
                <h3 className="item5">Output</h3>
                <div className="item6">
                  <p>Status: {this.state.status}</p>
                  <p>Output: {this.state.output}</p>
                  <p>CPU Time: {this.state.cpuTime} Millisecond(s)</p>
                  <p>Memory: {this.state.memory} Megabyte(s)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="buttons">
            <CustomButton type="submit">Run</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default CodingPage;
