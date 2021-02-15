import React from "react";
import axios from "axios";
import Select from "react-select";
import AceEditor from "react-ace";
import brace from "brace";

import "brace/mode/java";
import "brace/mode/c_cpp";

import "brace/theme/github";
import "brace/theme/monokai";

// import SyntaxHighlighter from "react-syntax-highlighter";
// import hljs from "highlight.js";

// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

// import "highlight.js/styles/github.css";
// import json from "highlight.js/lib/languages/json";

import CustomButton from "../../components/custom-button/custom-button.component";
import Languages from "./languages";

import "./coding.styles.scss";

class CodingPage extends React.Component {
  constructor() {
    super();

    this.state = {
      code: "",
      input: "",
      language: "public var const let null",
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
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="coding-area">
            <div className="source-code">
              <h3 className="item1">Source Code</h3>
              <AceEditor
                className="ace"
                editorProps={{ $blockScrolling: true }}
                mode="c_cpp"
                name="code"
                name="code"
                onChange={(code) => this.setState({ code })}
                setOptions={{
                  enableBasicAutocompletion: true,
                }}
                style={{
                  fontSize: 30,
                  height: 375,
                  width: 682,
                }}
                tabSize={6}
                theme="monokai"
                fontSize={15}
              />
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
