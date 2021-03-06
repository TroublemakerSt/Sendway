import React from 'react';
import {Menu, Icon, Badge} from 'antd';
const SubMenu = Menu.SubMenu;
import {Link, hashHistory} from 'react-router';

class SideMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openKeys: [],
      test: "",
    };
  }

  componentWillMount() {
    hashHistory.listen((event)=>{
          let pathname = event.pathname.split("/");
          if(pathname != null){
              this.setState({
                  test: pathname[1]
              }, () => console.log("State", this.state.test));
          }
      });
  }

  handleClick = e => {
    console.log('Clicked: ', e);
    this.setState({current: e.key});
  };

  onOpenChange = openKeys => {
    const state = this.state;
    const latestOpenKey = openKeys.find(
      key => !(state.openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = state.openKeys.find(
      key => !(openKeys.indexOf(key) > -1)
    );

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }

    console.log("nextOpenKeys", nextOpenKeys);
    this.setState({openKeys: nextOpenKeys});
  };

  getAncestorKeys = key => {
    return [key] || [];
  };

  render() {
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        defaultSelectedKeys={[this.state.test]}
      >
        <SubMenu
          className="side-menu"
          key="sub1"
          title={
            <span>
              <Badge className="badge" count={25}>
                <Icon className="side-menu-icon-size" type="mail" />
              </Badge>
              <span className="side-menu-font-size">Mail</span>
            </span>
          }
        >
          <Menu.Item key="inbox">
            <Link to="/inbox" activeStyle={{color: 'orange'}}>Inbox</Link>
          </Menu.Item>
          <Menu.Item key="starret"><Link to="/starret">Starred</Link></Menu.Item>
          <Menu.Item key="sent"><Link to="/sent">Sent</Link></Menu.Item>
          <Menu.Item key="trash"><Link to="/trash">Trashbox</Link></Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon className="side-menu-icon-size" type="phone" />
              <span className="side-menu-font-size">Calls</span>
            </span>
          }
        >
          <Menu.Item key="5">Audio</Menu.Item>
          <Menu.Item key="6">Video</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <Icon className="side-menu-icon-size" type="team" />
              <span className="side-menu-font-size">Contacts</span>
            </span>
          }
        >
          <Menu.Item key="7">Favorite</Menu.Item>
          <Menu.Item key="8">All</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon className="side-menu-icon-size" type="wallet" />
              <span className="side-menu-font-size">Wallet</span>
            </span>
          }
        >
          <Menu.Item key="9">Balance</Menu.Item>
          <Menu.Item key="10">Statistic</Menu.Item>
        </SubMenu>
        <SubMenu
          className="side-menu"
          key="sub5"
          title={
            <span>
              <Badge className="badge" count={4}>
                <Icon className="side-menu-icon-size" type="shopping-cart" />
              </Badge>
              <span className="side-menu-font-size">Cart</span>
            </span>
          }
        >
          <Menu.Item key="11">Item 1</Menu.Item>
          <Menu.Item key="12">Item 2</Menu.Item>
          <Menu.Item key="13">Item 3</Menu.Item>
          <Menu.Item key="14">Item 4</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default SideMenu;
