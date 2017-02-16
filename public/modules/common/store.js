import {createStore , combineReducers} from "redux";

//组件相关的reducer
var initWiget = {
  addVisible:false,
  updateVisible:false
}
const wigetReducer = function(state = initWiget,action){
  if (action.type == "SHOW_ADD_MODAL") {
    var newState = Object.assign({},state,{addVisible:action.addVisible});
    return newState;
  }else if (action.type == "SHOW_UPDATE_MODAL") {
    var newState = Object.assign({},state,{updateVisible:action.updateVisible});
    return newState;
  }
    return state;
}

//学生数据相关的reducer
var initStudent = {
  data:{},
  updateData:{}
}
const studentReducer = function(state = initStudent,action){
  if (action.type == "SHOW_ALL_STUDENT") {
    var newState = Object.assign({},state,{data:action.data});
    return newState;
  }else if (action.type == "SHOW_STUDENT") {
    var newState = Object.assign({},state,{updateData:action.updateData});
    return newState;
  }
    return state;
}

//组合reducer
const reducers = combineReducers({
  wigetReducer:wigetReducer,
  studentReducer:studentReducer
});

export default createStore (reducers);
