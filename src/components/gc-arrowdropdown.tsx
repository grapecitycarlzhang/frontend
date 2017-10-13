import * as React from 'react'
import { Component } from 'react'
import * as ReactDOM from "react-dom";
import { Icon, Dropdown } from "antd/lib";


interface GCArrowDropDownProps {
    menu?: React.ReactNode
}
interface GCArrowDropDownStates { }
export class GCArrowDropDown extends Component<GCArrowDropDownProps, GCArrowDropDownStates> {

    render() {
        return <div onClick={(e) => {
            e.preventDefault();
        }}>
            <Dropdown
                overlay={this.props.menu} trigger={['click']} >
                <Icon type="down" />
            </Dropdown>
        </div>
    }
}
