import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import * as React from 'react';
import { Counter } from '../usercounter';

describe('UserCounter', () => {

  it('Init Data', ( ) => {
        let c = shallow(<Counter />);
        expect( c.find('h3').text( )).to.equal('1');
    });

    it('add button', ( ) => {
        let c = mount(<Counter />);
        c.find('button').at(0).simulate('click');
        expect( c.find('h3').text( )).to.equal('2');
    })

    it('del button', ( ) => {
        let c = mount(<Counter />);
        c.find('button').at(1).simulate('click');
        expect( c.find('h3').text( )).to.equal('0');
    })

})
