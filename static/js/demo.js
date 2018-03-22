import Vue from "vue";

import User from "./components/user"

export default demo = function() {
    const app = new Vue({
        el: "#app",
        components: {
            "carousel": VueCarousel.Carousel,
            "slide": VueCarousel.Slide,
            "user": User
        },
        data: {
            message: "Vue Users",
            details: "This is just a simple remote user retrieval demo",
            users: []
        },
        methods: {
            retryRemote: function() {
                this.remote();
            },
            remote: function() {
                this.message = "Loading...";
                this.$http.get("https://jsonplaceholder.typicode.com/users")
                    .then(response => {
                        this.message = "Success";
                        this.details = "Users loaded from remote data source";
                        this.users = response.data;
                    }, response => {
                        this.message = "Error";
                        this.details = JSON.stringify(response);
                        this.users = [];
                    });
            }
        }
    });
    return app;
};
