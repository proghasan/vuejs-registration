export default {
    namespaced: true,

    state: () => ({
        application: null,
        applications: [],
        divisions: [],
        districts: [],
        upazilas: [],
    }),
    
    getters: {
        application: (state) => {
            return state.application;
        },

        applications: (state) => {
            return state.applications;
        },

        divisions: (state) => {
            return state.divisions;
        },

        districts: (state) => {
            return state.districts;
        },

        upazilas: (state) => {
            return state.upazilas;
        }
    },

    mutations: {
        setApplication: (state,payload) => {
            state.application = payload;
        },

        setApplications: (state,payload) => {
            state.applications = payload;
        },

        setDivisions: (state,payload) => {
            state.divisions = payload;
        },

        setDistricts: (state,payload) => {
            state.districts = payload;
        },

        setUpazilas: (state,payload) => {
            state.upazilas = payload;
        }

    },

    actions: {
        save: function(context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('save_registration', payload, {
                    headers: {
                        "Accept": "application/json"
                    }
                }).then(response => resolve(response.data.message))
                .catch((error) => reject(error.response.data.message))
            })
        },

        getDivisions: async function(context,payload) {
            await axios.get('get_divisions', {
                headers: {
                    "Accept": "application/json"
                }
            }).then(res => {
                context.commit('setDivisions', res.data.divisions);
            })
        },

        getDistricts: async function(context,payload) {
            await axios.post('get_districts', payload, {
                headers: {
                    "Accept": "application/json"
                }
            }).then(res => {
                context.commit('setDistricts', res.data.districts);
            })
        },

        getUpazilas: async function(context,payload) {
            await axios.post('get_upazilas', payload, {
                headers: {
                    "Accept": "application/json"
                }
            }).then(res => {
                context.commit('setUpazilas', res.data.upazilas);
            })
        },
    }
}