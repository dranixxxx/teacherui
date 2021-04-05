import React from "react";
import {
    ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle,
    ListGroup,
    ListGroupItem, NavItem,
    NavLink,
    Popover,
    PopoverBody,
    UncontrolledButtonDropdown
} from "reactstrap";
import Avatar from "./Avatar";
import {UserCard} from "./Card";
import {
    MdAccountCircle,
    MdCake,
    MdEmail, MdExitToApp,
    MdGamepad, MdHelp,
    MdHome,
    MdInsertChart, MdMessage,
    MdPermPhoneMsg,
    MdPersonPin, MdSettingsApplications
} from "react-icons/md";
import { Consumer } from '../context/Context';
import {logout} from '../api/auth';

export default class Profile extends React.Component {
    state = {
        isOpenUserCardPopover: false,
        user: [],
    };

      toggleUserCardPopover = () => {
        this.setState({
          isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
        });
      };

      toggleDropdown = () => {
       this.setState({
          isOpenDropdown: !this.state.isOpenDropdown,
        });
      };

    render() {
        return (
            <Consumer>
            {value => {
            return (
            <NavItem>
                <NavLink id="Popover2">
                    <Avatar
                        onClick={this.toggleUserCardPopover}
                        className="can-click"
                    />
                </NavLink>
                {(value.user) ? (
                <Popover
                    placement="bottom-end"
                    isOpen={this.state.isOpenUserCardPopover}
                    toggle={this.toggleUserCardPopover}
                    target="Popover2"
                    className="p-0 border-0"
                    style={{minWidth: 250}}
                >
                    <PopoverBody className="p-0 border-light">
                        <UserCard
                            title={value.user.name}
                            subtitle={value.user.email}
                            text={value.user.updated_at}
                            className="border-light"
                        >
                            <ListGroup flush>
                                <ListGroupItem tag="button" action className="border-light">
                                    <ButtonDropdown isOpen={this.state.isOpenDropdown} toggle={this.toggleDropdown}>
                                        <UncontrolledButtonDropdown direction="left">
                                            <DropdownToggle caret>
                                                <MdPersonPin/> Profile
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem>
                                                    <div className="box">
                                                        <p className="title1">
                                                            <MdAccountCircle/>Contact
                                                        </p>


                                                        <p className="padd-top">
                                                            <MdCake/>2-2-2222
                                                        </p>

                                                        <p>
                                                            <MdPermPhoneMsg/>0123456789
                                                        </p>

                                                        <p>
                                                            <MdEmail/>qwerty@gmail.com
                                                        </p>

                                                        <p>
                                                            <MdHome/>123 lorem ipsum,
                                                        </p>

                                                    </div>

                                                    <div className="box">

                                                        <p className="title1">
                                                            <MdGamepad/>Skill
                                                        </p>

                                                        <p className="padd-top">HTML, CSS</p>
                                                        <div className="skill">

                                                            <div className="skill-right r1"></div>
                                                        </div>

                                                        <p>JavaScript/jQuery</p>
                                                        <div className="skill">

                                                            <div className="skill-right r2"></div>
                                                        </div>

                                                        <p>PHP, SQL</p>
                                                        <div className="skill">

                                                            <div className="skill-right r3"></div>
                                                        </div>
                                                    </div>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledButtonDropdown>
                                    </ButtonDropdown>
                                </ListGroupItem>
                                <ListGroupItem tag="button" action className="border-light">
                                    <MdInsertChart/> Stats
                                </ListGroupItem>
                                <ListGroupItem tag="button" action className="border-light">
                                    <MdMessage/> Messages
                                </ListGroupItem>
                                <ListGroupItem tag="button" action className="border-light">
                                    <MdSettingsApplications/> Settings
                                </ListGroupItem>
                                <ListGroupItem tag="button" action className="border-light">
                                    <MdHelp/> Help
                                </ListGroupItem>
                                <ListGroupItem tag="button" action className="border-light">
                                    <MdExitToApp/> Signout
                                </ListGroupItem>
                                <button onClick={() => {
                                    logout();
                                }}>aaaaa</button>
                            </ListGroup>
                        </UserCard>
                    </PopoverBody>
                </Popover>
                ) :(null)}
            </NavItem>
                  )
                    }}
            </Consumer>
        )
    }
}