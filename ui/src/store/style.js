import Cookies from 'js-cookie';
import Vuetify from '../plugins/vuetify'

export default {
    namespaced: true,
    state: {
        isDark: false
    },
    mutations: {
        setTheme(state, isDark) {
            state.isDark = isDark;

            Cookies.set('style.isDark', isDark);
            Vuetify.framework.theme.dark = isDark;
        },
        switchTheme(state) {
            let isDark = !state.isDark;

            state.isDark = isDark;
            Cookies.set('style.isDark', isDark);
            Vuetify.framework.theme.dark = isDark;
        }
    },
    actions: {
        initialize({commit}) {
            // Ensure that we recieve a boolean, not a string
            let isDark = JSON.parse(Cookies.get('style.isDark').toLowerCase());

            if (isDark) {
                commit('setTheme', isDark);
            }
        }
    }
};
