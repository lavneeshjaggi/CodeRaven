import React from "react";
import axios from "axios";
import AceEditor from "react-ace";

import "brace/mode/c_cpp";
import "brace/mode/csharp";
import "brace/mode/dart";
import "brace/mode/golang";
import "brace/mode/java";
import "brace/mode/kotlin";
import "brace/mode/python";
import "brace/mode/ruby";
import "brace/mode/rust";
import "brace/mode/scala";
import "brace/mode/swift";

import "brace/theme/eclipse";
import "brace/theme/github";
import "brace/theme/monokai";
import "brace/theme/solarized_dark";
import "brace/theme/solarized_light";
import "brace/theme/textmate";
import "brace/theme/tomorrow_night";
import "brace/theme/xcode";

import CustomButton from "../../components/custom-button/custom-button.component";

import "./coding.styles.scss";

class CodingPage extends React.Component {
  constructor() {
    super();

    this.state = {
      code: "",
      cpuTime: "",
      input: "",
      language: "cpp17",
      language_ace: "c_cpp",
      memory: "",
      output: "",
      status: "",
      theme: "monokai",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    axios
      .post("/coding", {
        code: this.state.code,
        input: this.state.input,
        language: this.state.language,
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

    if (name === "language")
      if (value === "cpp17" || value === "c")
        this.setState({ language_ace: "c_cpp" });
      else if (value === "go") this.setState({ language_ace: "golang" });
      else this.setState({ language_ace: value });
  };

  render() {
    return (
      <div className="coding-page">
        <div className="editor-settings">
          <select
            className="options"
            name="language"
            value={this.state.language}
            onChange={this.handleChange}
          >
            <option value="c">C</option>
            <option value="cpp17">C++</option>
            <option value="csharp">C#</option>
            <option value="dart">Dart</option>
            <option value="go">Go</option>
            <option value="java">Java</option>
            <option value="kotlin">Kotlin</option>
            <option value="python">Python</option>
            <option value="ruby">Ruby</option>
            <option value="rust">Rust</option>
            <option value="scala">Scala</option>
            <option value="swift">Swift</option>
          </select>
          <select
            className="options"
            name="theme"
            value={this.state.theme}
            onChange={this.handleChange}
          >
            <option value="eclipse">Eclipse</option>
            <option value="github">Github</option>
            <option value="monokai">Monokai</option>
            <option value="solarized_dark">Solarized Dark</option>
            <option value="solarized_light">Solarized Light</option>
            <option value="textmate">Textmate</option>
            <option value="tomorrow_night">Tomorrow Night</option>
            <option value="xcode">Xcode</option>
          </select>
        </div>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="coding-area">
            <div className="source-code">
              <h3 className="heading">Source Code</h3>
              <AceEditor
                className="ace"
                editorProps={{ $blockScrolling: true }}
                mode={this.state.language_ace}
                name="code"
                onChange={(code) => this.setState({ code })}
                setOption={{
                  enableBasicAutocompletion: true,
                }}
                style={{
                  fontSize: 30,
                  height: 375,
                  width: 682,
                }}
                tabSize={4}
                theme={this.state.theme}
                fontSize={15}
              />
            </div>
            <div className="text">
              <div className="input">
                <h3 className="heading">Input</h3>
                <textarea
                  className="item4"
                  name="input"
                  onChange={this.handleChange}
                  value={this.state.input}
                />
              </div>
              <div className="output">
                <h3 className="heading">Output</h3>
                <textarea
                  className="item6"
                  value={this.state.output}
                  readOnly
                />
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
