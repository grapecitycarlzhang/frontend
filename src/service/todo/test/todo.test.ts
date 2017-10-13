import { Mock as Moq, It, Times } from 'moq.ts'
import { expect, should, assert } from 'chai'
import * as Mock from 'mockjs'
import { DIEx, GCResponse, IRequest } from 'grapecity-grapeleaf-common';
import { TYPES } from '../../../../src/util';
//使用项目内定义好的依赖注入,也可以在本文件中自定义
import "../../../../src/util/binds";
import { IToDoService, ToDoService } from '../../../../src/service/todo';

should()
describe('ToDoBll', () => {
  let service: IToDoService

  beforeEach(() => {
    // bll=container.get<IToDoBll>(TYPES.IToDoBll)
  })

  it('inversify chains',() => {
    service = DIEx.container.get<IToDoService>(TYPES.IToDoService)
    let ret = service.delete({guid:'123'});
    expect(true).is.true;
  })

  it('Moq for IToDoService',async () => {
    const moq = new Moq<IToDoService>()
      .setup(ins => ins.get).returns(() => Mock.mock({}))
      .setup(ins => ins.delete).returns(() => true);
    const obj = moq.object()
    let ret: GCResponse = await obj.delete({});

    ////Three types of assertions are available which as follows:
    // expect(ret).is.true;
    ret.should.be.true;
    // assert.isTrue(ret);
  })

  it('Moq for IToDoService', () => {
    const moq = new Moq<IRequest>()
      .setup(ins => ins.get).returns(() => Mock.mock({}))
      .setup(ins => ins.del).returns(() => true);
    let service = new ToDoService();
    service.request=moq.object();
    expect(service.delete({})).is.true;
  })

  it('filterToDoList', () => {
    let oldlist = Mock.mock({
      "array|10": [
        "new1",
        "notnew"
      ]
    }).array;
    let newlist = new ToDoService().filterToDoList(oldlist);
    expect(newlist).length.be.lessThan(oldlist.length)

  })

})
