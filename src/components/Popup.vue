<template>
    <div class="popup_wrapper" ref="popup_wrapper">
        <div class='v-popup'>
            <div class="v-popup__header mb-3">
                <span>Редактирование</span>
                <span>
        <i
                class="material-icons"
                @click="closePopup"
        >
          X
        </i>
      </span>
            </div>
            <div class="v-popup__content">
                <slot>
                    <input v-model="newName" type="text" name="name" :placeholder="beerName">
                    <textarea v-model="newDescription" type="text" name="description"
                              :placeholder="beerDescription"></textarea>
                </slot>
            </div>
            <div class="v-popup__footer">
                <button class="close_modal" @click="closePopup">Close</button>
                <button
                        class="submit_btn"
                        @click="saveChanges"
                >
                    {{rightBtnTitle}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Popup",
        props: {
            beerName: {
                type: String,
                default: 'Default beer name'
            },
            beerId: {
                type: Number,
                default: 0
            },
            beerDescription: {
                type: String,
                default: 'Default beer description'
            },
            rightBtnTitle: {
                type: String,
                default: 'Ok'
            }
        },
        data() {
            return {
                newName: '',
                newDescription: '',
            }
        },
        methods: {
            saveChanges() {
                if (this.newName || this.newDescription) {
                    this.closePopup();
                    this.$emit('saveChanges', {
                        name: this.newName ? this.newName : this.beerName,
                        description: this.newDescription ? this.newDescription : this.beerDescription,
                    })
                } else {
                    this.closePopup();
                }
            },
            closePopup() {
                this.$emit('closePopup')
            }
        },
        mounted() {
            let vm = this;
            document.addEventListener('click', function (item) {
                if (item.target === vm.$refs['popup_wrapper']) {
                    vm.closePopup()
                }
            })
        },
    }
</script>

<style lang="scss">
    .popup_wrapper {
        /*background: rgba(64,64,64, .4);*/
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
    }

    .v-popup {
        padding: 16px;
        position: fixed;
        top: 50px;
        width: 400px;
        background: #ffffff;
        box-shadow: 0 0 17px 0 #e7e7e7;
        z-index: 100;

        &__header, &__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        & textarea {
            width: 100%;
            height: 150px;
            margin-bottom: 10px;
            padding: 5px 10px;
            background: #e7e7e7;
            border-radius: 15px;
        }

        & input {
            margin-bottom: 10px;
            width: 100%;
            box-shadow: darkgrey;
            border-radius: 15px;
            padding: 5px 10px;
            background: #e7e7e7;
        }

        .submit_btn {
            padding: 8px;
            color: #ffffff;
            background: #26ae68;
        }

        .close_modal {
            padding: 8px;
            color: #ffffff;
            background: red;
        }
    }
</style>
