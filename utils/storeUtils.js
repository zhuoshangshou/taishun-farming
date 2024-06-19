import store from '@/store';
//import {useStore} from 'vuex';

//初始化写入信息
const storageStoreInit =()=>{
	//const store = useStore();
	const storage_user_info = uni.getStorageSync('userInfo');
	//console.log('storageStoreInit',storage_user_info,store)
	if(store && storage_user_info){
		store.dispatch('setUserInfo',storage_user_info)
	}
}

//写入会员信息
const setStoreUserInfo =(userInfo)=>{
	//console.log('setStoreUserInfo',store)
	uni.setStorageSync('userInfo',userInfo)
	if(store){
		store.dispatch('setUserInfo',userInfo)
	}
	
}

export default {
	storageStoreInit,
	setStoreUserInfo
}
