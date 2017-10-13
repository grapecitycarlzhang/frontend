import { bindingCollection } from 'grapecity-grapeleaf-common'
import { TYPES } from './types';
import { IToDoService, ToDoService } from './todo/index';

bindingCollection.push((container) => {
    container.bind<IToDoService>(TYPES.IToDoService).to(ToDoService);
});
