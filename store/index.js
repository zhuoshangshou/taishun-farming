import {createStore} from 'vuex'

export default createStore({ 
    state:{ 
        userInfo:{}
    },
    getters:{
        getUserInfo(state){
            return state.userInfo
        }
    },
    mutations:{ 
        setUserInfo(state, value){
            state.userInfo = value
        }
    },
    actions:{ 
        setUserInfo(context, value){ 
            context.commit('setUserInfo', value)
        }
    }, 
})

