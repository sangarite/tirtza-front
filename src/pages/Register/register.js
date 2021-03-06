import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import './register.module.css'
import { checkValidity } from '../../validation/validate'
import { withRouter } from 'react-router-dom'
import swal from 'sweetalert2'
import Spinner from '../../components/UI/Spinner/Spinner'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstname:'',
                lastname:'',
                id:'',
                birthdate:'',
                email: '',
                password: '',
                groupName: '',
                groupId: ''
            },
            userValidationRules: {
                firstName: {
                    required: true,
                    minLength: 2,
                    maxLength: 15,
                    letterOnly: true,
                },
                lastName: {
                    required: true,
                    minLength: 2,
                    maxLength: 20,
                    letterOnly: true,
                },
                Id: {
                    required: true,
                    maxLength: 9,
                    minLength: 9,
                    numberOnly : true
                    
                },
                birthdate: { required: true},
                email: {
                    required: true,
                    regExc: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                },
                password: { required: true, minLength: 8, maxLength: 15 }
            },
            userValid: {
                    firstName: { valid: false, touched: false, errmessage: '' },
                    lastName: { valid: false, touched: false, errmessage: '' },
                    Id: { valid: false, touched: false, errmessage: '' },
                    birthdate: { valid: false, touched: false, errmessage: '' },
                    email: { valid: false, touched: false, errmessage: '' },
                    password: { valid: false, touched: false, errmessage: '' }
            },
            isValidForm: false,
            emailError: null,
            showNewGroup: false,
            showOldGroup: false,
            
        };
        this.onSelectChange = this.onSelectChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //???????? ???????????? ??????????
    handleChange = (input) => (e) => {
        e.preventDefault();
        let updatedUser = this.state.user;
        let validUser = this.state.userValid;
        updatedUser[input] = e.target.value;
        validUser[input].touched = true;
        validUser[input].errmessage = checkValidity(
          updatedUser[input],
          this.state.userValidationRules[input]
        );
        validUser[input].valid = validUser[input].errmessage === '';
    
        let validForm = true;
        for (let field in validUser) {
          validForm = validUser[field].valid && validForm;
        }
    
        this.setState({
          user: updatedUser,
          userValid: validUser,
          isValidForm: validForm,
        });
    };

    onSelectChange = (event) => {
        if (event.target.value === '?????? ?????????? ????????') {
            this.setState({showNewGroup: true})
            this.setState({showOldGroup: false})
        }
        if (event.target.value === '?????????? ???????????? ??????????') {
            this.setState({showNewGroup: false})
            this.setState({showOldGroup: true})
        }
    }

    nameChange = (event) => {
        this.setState({groupName: event.target.value})
    }

    codeChange = (event) => {
        this.setState({groupId: event.target.value})
    }

    onSubmit = () => {
        if (this.state.isValidForm) {
            this.props.toggleSpinner();
            fetch('https://famlink-server.web.app/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ 
                    firstName: this.state.user.firstName,
                    lastName: this.state.user.lastName,
                    id: this.state.user.Id,
                    birthday: this.state.user.birthdate,
                    email: this.state.user.email,
                    password: this.state.user.password,
                    groupId: parseInt(this.state.groupId),
                    groupName: this.state.groupName
                })
            })
            .then(response => response.text())
            .then(data => {
                if (data === '?????????? ???????? ??????????') {
                    swal.fire({
                        icon: 'error',
                        title: '?????????? ???????? ??????????',
                        confirmButtonText: '??????????',
                        confirmButtonColor: '#EF9C83'
                    })
                } else {
                    this.props.setGroupId(data);
                    this.props.setSignIn(true);
                    this.props.history.push(`/group/${data}`);
                }
                this.props.toggleSpinner();
            })
            .catch(err => console.log(err))
        } else swal.fire({
            icon: 'info',
            title: '???? ?????????? ?????? ?????????? ??????????',
            confirmButtonText: '????????',
            confirmButtonColor: '#EF9C83'
        })
    }
    
    render () {
        let error = null;
        error = <p style={{ color: 'red' }}>{this.state.emailError}</p>;
        return (
            <div >
                <div className="SignUp">
                    <Input
                        type='text'
                        name='first-name'
                        inputtype='input'
                        label='???? ????????'
                        onChange={this.handleChange('firstName')}
                        invalid={(!this.state.userValid.firstName.valid).toString()}
                        touched={this.state.userValid.firstName.touched.toString()}
                        errmessage={this.state.userValid.firstName.errmessage}
                    />
                    <Input
                        type='text'
                        name='last-name'
                        inputtype='input'
                        label='???? ??????????'
                        onChange={this.handleChange('lastName')}
                        invalid={(!this.state.userValid.lastName.valid).toString()}
                        touched={this.state.userValid.lastName.touched.toString()}
                        errmessage={this.state.userValid.lastName.errmessage}
                    />
                    <Input
                        type='text'
                        name='id'
                        inputtype='input'
                        label='?????????? ????????'
                        onChange={this.handleChange('Id')}
                        invalid={(!this.state.userValid.Id.valid).toString()}
                        touched={this.state.userValid.Id.touched.toString()}
                        errmessage={this.state.userValid.Id.errmessage}
                    />
                    <Input
                        type='date'
                        name='date'
                        inputtype='input'
                        label='?????????? ????????'
                        onChange={this.handleChange('birthdate')}
                        invalid={(!this.state.userValid.birthdate.valid).toString()}
                        touched={this.state.userValid.birthdate.touched.toString()}
                        errmessage={this.state.userValid.birthdate.errmessage}
                    />
                    <Input
                        type='email'
                        name='email'
                        inputtype='input'
                        label='????????'
                        onChange={this.handleChange('email')}
                        invalid={(!this.state.userValid.email.valid).toString()}
                        touched={this.state.userValid.email.touched.toString()}
                        errmessage={this.state.userValid.email.errmessage}
                    />
                    {error}
                    <Input
                        type='password'
                        name='password'
                        inputtype='input'
                        label='??????????'
                        onChange={this.handleChange('password')}
                        invalid={(!this.state.userValid.password.valid).toString()}
                        touched={this.state.userValid.password.touched.toString()}
                        errmessage={this.state.userValid.password.errmessage}
                    />
                    
                    <select onChange={this.onSelectChange} className="select">
                        <option disabled selected>??????: </option>
                        <option id="new">?????? ?????????? ????????</option>
                        <option id="old">?????????? ???????????? ??????????</option>
                    </select>
                    <br/>
                    {
                        this.state.showNewGroup ?
                        <div>
                            <br/>
                           
                            <Input
                                type='text'
                                name='group-name'
                                inputtype='input'
                                label='???? ??????????'
                                onChange={this.nameChange}
                            />
                         
                        </div> 
                        : null
                    }
                    {
                        this.state.showOldGroup ?
                        <div>
                             <br/>
                           
                            <Input
                                type='text'
                                name='group-code'
                                inputtype='input'
                                label='?????? ?????????? '
                                onChange={this.codeChange}
                            />
                        </div> 
                        : null
                    }
                    <br/>
                    <button className="button" onClick={this.onSubmit}>??????????</button>
                </div>
                <div >{this.props.displaySpinner ? <Spinner/> : null}</div>
            </div>
        );
    }
}


export default withRouter(Register);