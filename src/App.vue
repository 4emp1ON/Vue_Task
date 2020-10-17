<template>
    <v-app>
        <v-container>
            <v-app-bar
                    app
                    color="primary"
                    dark
            >
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                <v-toolbar-title>Beers</v-toolbar-title>

                <v-spacer></v-spacer>

            </v-app-bar>

            <v-main>
                <BeersCatalog/>
            </v-main>
        </v-container>
    </v-app>
</template>

<script>
    import BeersCatalog from './components/BeersCatalog';

    export default {
        name: 'App',

        components: {
            BeersCatalog,
        },

        data: () => ({
            //
        }),
    };
</script>
