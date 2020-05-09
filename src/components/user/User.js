import React, {Component} from 'react';
import {logOut} from "../../actions/rootAction";
import swal from "sweetalert";
import {connect} from 'react-redux';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false,
        };

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {

        if (this.dropdownMenu && !this.dropdownMenu.contains(event.target)) {

            this.setState({ showMenu: false }, () => {
                document.removeEventListener('click', this.closeMenu);
            });

        }
    }
    handleLogOut(){
        this.props.logOut();
        swal({
            title: "Đăng xuất thành công !",
            icon: "success",
            button: false,
            timer: 1500
        }).then(r => r)
    }
    render() {
        let {user} = this.props;
        return (
            <div className={'user'}>
            <span className={'user__avatar'}>
                <i className="las la-user-cog"/>
            </span>
                <span className={'ml-3'} onClick={this.showMenu}>
                {user && user.username}
                            <i className="ml-2 las la-caret-down"/>

            </span>
                {
                    this.state.showMenu
                        ? (
                            <div className={'user__dropdown'} ref={(element) => {
                                this.dropdownMenu = element;
                            }}>
                                <ul>
                                    <li onClick={()=>this.handleLogOut()}><i className="las la-power-off mr-2"/> Đăng xuất</li>
                                </ul>

                            </div>)
                        :
                        null
                }
            </div>
        );
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        logOut : _=> dispatch(logOut())
    }
}
const mapStateToProps = state =>{
    return {
        user : state.main.user
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(User);