<template>
    <div class="client-action-wrapper">
        <div class="form-client-wrapper">
            <form-client-action v-model="clientData" :client-group-list="clientGroup"></form-client-action>
        </div>
        <div class="image-upload-wrapper">
            <div class="image-border">
                <upload-image v-model="files" @crooper-image-file="cropperFile">
                </upload-image>
            </div>
        </div>
        <div class="button-group">
            <button @click="handleCreateClient">Create Client</button>
        </div>
    </div>
</template>

<script>
import UploadImage from '@/components/common/upload-image/upload-image.vue'
import formClientAction from '../form-client/form-client-action.vue'
import { reactive, ref, watch } from 'vue';
import moment from 'moment';
    export default {
        components: { formClientAction, UploadImage },

        props: {
            clientInfo: {
                type: Object,
                default: () => {},
            },

            clientGroup: {
                type: Array,
                default: () => [],
            },

            clientImage: {
                type: Object,
                default: () => {},
            }

        },

        setup(props, {emit}) {
            const files = ref([]);
            const hasFile = ref(false);
            let clientData = reactive(props.clientInfo);

            const handleCreateClient = () => {
                const {registrationDate, ...clientPayload} = clientData;
                if (registrationDate) {
                    const date = moment(registrationDate).format("YYYY-MM-DD")
                    clientPayload.createdDateTimeTS = Date.parse(date)/ 1000;
                    clientPayload.clientInputDateTimeTS = Date.parse(date)/ 1000;
                }

                if (clientPayload.clientGroupId) {
                    const clientGroupSelected = props.clientGroup.find(group => group.clientGroupId == clientPayload.clientGroupId)
                    const clientGroupName = clientGroupSelected.itemName;
                    clientPayload.clientGroupName = clientGroupName;
                }

                const sexFormatNumber = parseInt(clientPayload.sex);
                clientPayload.sex = sexFormatNumber;

                const memberNumberFormatNumber = parseInt(clientPayload.memberNumber);
                clientPayload.memberNumber = memberNumberFormatNumber;

                delete clientPayload.clientId;

                let fileImage = null;
                if (hasFile.value) {
                    fileImage = files.value[0].file
                }

                emit('create-client-action', clientPayload, fileImage)
            };

            const cropperFile = () => {
                console.log('cropperFiles', files.value[0].file);
                hasFile.value = true;
            };

            watch(props.clientInfo, (value) => {
                console.log(value)
                clientData = {...value},
                {immediate: true}
            })

            return {
                files,
                clientData,
                cropperFile,
                handleCreateClient,
            }
        }
        
    }
</script>

<style lang="scss" scoped>
@import './client-action.scss';
</style>