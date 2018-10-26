import actionTypes from './actionTypes';
import { message as Message } from 'antd';

//获取数据
export const getData = (params) => async (dispatch, getState, {API}) => {
    dispatch({
        type: actionTypes.CHANGE_LOADING_STATUS,
        payload: true
    })
    const response = await API.fetchUserList(params);
    const {success,message,data} = response;
    if (success) {
        dispatch({
            type: actionTypes.CHANGE_DATA,
            payload: {
                data: data.data,
                total: data.total,
                pageNo: data.pageNo
            }
        });
    } else {
        Message.error(message);
    }
}
//删除
export const deleteData = (id) => async (dispatch,getState) => {
    const {data} = getState().pageReducer;
    dispatch({
        type: actionTypes.CHANGE_DATA,
        payload: {
           data: data.filter((item)=>id!==item.id)
        }
    }); 
}