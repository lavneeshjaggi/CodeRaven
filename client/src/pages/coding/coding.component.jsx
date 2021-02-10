import React from "react";
import axios from "axios";

import FormInput from "../../components/form-input/form-input.component";
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

    const code = this.state.code;

    console.log(code);

    // #include<bits/stdc++.h> using namespace std; int main() { cout<<"Hello World!"; return 0; }

    axios
      .post("/coding", {
        code: this.state.code,
        language: "C++",
        input: this.state.input,
      })
      .then((res) => {
        const stdout =
          res.data.error !== undefined && res.data.error !== ""
            ? res.data.error
            : res.data.output !== undefined;
        this.setState({ output: stdout });
        console.log(this.state.output);
      })
      .catch((err) => {
        this.setState({ output: "Some error occured" });
        console.log(err);
      });

    // if (password !== confirmPassword) {
    //     alert('Passwords do not match');
    // } else {
    //     const newUser = {
    //         name: name,
    //         username: email,
    //         email: email,
    //         password: password
    //     }

    //     try {
    //         const config = {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         };

    //         const body = JSON.stringify(newUser);

    //         await axios.post('/register', body, config);

    //         this.redirect();

    //         this.setState({
    //             name: '',
    //             email: '',
    //             password: '',
    //             confirmPassword: '',
    //         });
    //     } catch (error) {
    //         alert(error.response.data);
    //     }
    // }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="coding-page">
        <form onSubmit={this.handleSubmit}>
          <FormInput
            className="text"
            name="code"
            type="textarea"
            handleChange={this.handleChange}
            value={this.state.code}
            placeholder="Write your code here"
            required
          />
          {/* <FormInput
            className="text"
            name="input"
            type="text"
            placeholder="Write custom input here"
            /> */}
          <div className="buttons">
            <CustomButton type="submit">Submit</CustomButton>
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
