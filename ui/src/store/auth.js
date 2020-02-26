import Cookies from 'js-cookie';

export default {
    namespaced: true,
    state: {
        user: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            Cookies.set('user', user)
        },
        logout(state) {
            state.user = null;
            Cookies.set('user', null);
        }
    },
    actions: {
        initialize({commit}) {
            let user = Cookies.get('user');

            if (user) {
                commit('setUser', JSON.parse(user));
            }
        }
    },
    getters: {
        username: state => {
            return state.user && state.user.username
        }
    }
};
