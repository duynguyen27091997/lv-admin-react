import React, {Component} from 'react';

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

        if (!this.dropdownMenu.contains(event.target)) {

            this.setState({ showMenu: false }, () => {
                document.removeEventListener('click', this.closeMenu);
            });

        }
    }

    render() {
        return (
            <div className={'user'}>
            <span className={'user__avatar'}>
                <i className="las la-user-cog"/>
            </span>
                <span className={'ml-3'} onClick={this.showMenu}>
                Nguyen duy
                            <i className="ml-2 las la-caret-down"/>

            </span>
                {
                    this.state.showMenu
                        ? (
                            <div className={'user__dropdown'} ref={(element) => {
                                this.dropdownMenu = element;
                            }}>
                                <ul>
                                    <li><i className="las la-power-off mr-2"/> Đăng xuất</li>
                                </ul>

                            </div>)
                        :
                        null
                }
            </div>
        );
    }
}


export default User;