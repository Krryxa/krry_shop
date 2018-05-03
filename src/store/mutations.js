//全部导出
import * as Types from './mutations-type.js';

/**
 * 这种取值方式[]
 * 例如：
 * let a = 'b';
 * let b = {a:1};
 * 这样子是会把a当做key值，取出来直接就是a:1
 * 想要在b中引用a的值，就要用[]
 * let c = {[a]:1}
 * 这样取出c来才是b:1
 */

const mutations = {
	[Types.SETUSERNAME](state,username){ //state是自动放入的，默认指的是当前的state
		state.username = username;
	}
};

export default mutations;