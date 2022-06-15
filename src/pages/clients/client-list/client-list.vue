<template>
  <div class="clientList">
      <div class="clientList__wrapper">
          <div class="clientList__header">
              <h1>Clients</h1>
              <div class="add-clients">
                  <button-component @click="openModalCreateNewClient" :color="'#29527B'">Add Client</button-component>
              </div>
          </div>
          <div class="clientList__table">
            <p>Total <span>{{ totalClient }}</span> client(s) searched</p>
            <el-table class="clientList__table--container" :data="clientList" border>
                <el-table-column label="Registered Date" width="180">
                    <template #default="scope">
                        <span>{{ converRegistrations(scope.row.registrationDate) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Client Name" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.clientName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Mobile/Phone" width="180">
                    <template #default="scope">
                        <p>{{ formatKRMobileAndPhoneNumber(scope.row.mobileNumber || '') }}</p>
                        <p>{{ formatKRMobileAndPhoneNumber(scope.row.phoneNumber || '') }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="Total Sales" width="180">
                    <template #default="scope">
                        <span>{{ formatMoney(scope.row.totalSalesAmount, 0) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Notes" width="180">
                    <template #default="scope">
                      <el-popover v-if="scope.row.notes && scope.row.notes.length > 100" width="250px" effect="light" trigger="hover" placement="top">
                        <template #default>
                          <span>{{ scope.row.notes ?? '' }}</span>
                        </template>
                        <template #reference>
                         <span>{{ formatNotes(scope.row.notes) }}</span>
                        </template>
                      </el-popover>

                      <span v-else>{{ formatNotes(scope.row.notes) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Operations">
                    <template #default="scope">
                        <el-button class="button-edit" size="small" @click="handleEdit(scope.row.clientId)">Edit</el-button>
                        <el-button class="button-sale" size="small" @click="handleEdit(scope.row.clientId)">Sale</el-button>
                        <el-button class="button-calendar" size="small" @click="handleDelete(scope.row.clientId)">Calendar</el-button>
                    </template>
                </el-table-column>
            </el-table>
          </div>
          <pagination-component :total="totalClient" v-model="currentPage" @change-current-page="handleChangePage"/>
      </div>
      <el-dialog v-model="isOpenModal" :title="modalTitle" draggable>
        <client-action :client-info="clientInfo" :client-image="clientImage" :client-group="clientGroups" @create-client-action="createNewClient"/>
      </el-dialog>
  </div>
</template>

<script>
import { ElNotification } from "element-plus";
import clientApis from "@/apis/client/clientApis";
import { computed, onMounted, reactive, ref } from "@vue/runtime-core";
import {formatMoney} from '@/helpers/utils/format-money/format-money';
import {formatNotes} from '@/helpers/utils/common-ultils/common-ultils';
import ButtonComponent from '@/components/common/button/button-component.vue';
import { getUserLogged } from "@/helpers/utils/sesstion-storage/session-storage";
import {formatDateFromDateString} from '@/helpers/utils/format-time/format-time';
import {formatKRMobileAndPhoneNumber} from '@/helpers/utils/client-ultils/client-ultils';
import paginationComponent from '@/components/common/pagination/pagination-component.vue';
import ClientAction from '@/components/client/client-action/client-action.vue';
import ClientModel from '@/components/client/client-model/client-model';

const openNotification = (status, messages = []) => {
  ElNotification.success({
    title: status,
    message: messages.toString(),
    type: status,
  });
};

export default {
  components: { paginationComponent, ButtonComponent, ClientAction },
  setup() {
    const currentPage = ref(1);
    const modalTitle = ref('');
    const isOpenModal = ref(false);
    const clientList = ref([]);
    const totalClient = ref(0);
    let messages = reactive([]);

    let clientData = reactive({});

    const { shopBasicInfo } = getUserLogged();
    const { shopId } = shopBasicInfo || "";

    onMounted(() => {
      clientData = new ClientModel();
      console.log(clientData);
      loadClientList();
    });

    const handleErrorMessages = (errorMessages) => {
      console.log(errorMessages)
      if (errorMessages)
        errorMessages.forEach((message) => messages.push(message.errorMessage));
    };

    const loadClientList = async () => {
      const options = {
        shopId: shopId,
        pageSize: 10,
        pageNumber: currentPage.value,
      };
      messages = [];
      try {
        const responseClientSetup = await clientApis.getClientSetup({shopId});
        if (!responseClientSetup.data.isOK) {
          throw responseClientSetup.data.errorMessages;
        }

        const responseClientData = await clientApis.getAllClient(options);
        if (!responseClientData.data.isOK) {
          throw responseClientData.data.errorMessages;
        }

        clientData.setClientGroup(responseClientSetup.data.result.clientGroup);
        clientList.value = responseClientData.data.result.items;
        totalClient.value = responseClientData.data.result.pagingInfo.totalItems;
      } catch (error) {
        handleErrorMessages(error);
        openNotification("error", messages);
      } finally {
        console.log("finally");
      }
    };

    const converRegistrations = (date) => {
        return formatDateFromDateString(date);
    };

    const handleChangePage = () => {
      loadClientList();
    };

    const clientInfo = computed(() => {
      if (clientData) return clientData.client;
      return {}
    });

    const clientGroups = computed(() => {
      if (clientData) return clientData.clientGroups;
      return {}
    })

    const clientImage = computed(() => {
      if (clientData) return clientData.clientImage;
      return {}
    })

    const openModalCreateNewClient = () => {
      modalTitle.value = 'Create New Client';
      console.log('clientInfo', clientInfo)
      isOpenModal.value = true;
      console.log('open the modal')
    };

    const createNewClient = async (clientPayload, fileImage) => {
      messages = [];
      try {
        const responseCreateClient = await clientApis.createNewClient(clientPayload);
        console.log(responseCreateClient)

        if(!responseCreateClient.data.isOK) throw responseCreateClient.data.errorMessages;
        if (fileImage) {
          const createdClientId = responseCreateClient.data.result.clientId;
          const clientImageData = {...clientImage.value, formFile: fileImage, clientId: createdClientId}
          const clientImagePayload = clientData.mapClientImageField(clientImageData)
          const responseClientCreateImage = await clientApis.createClientImage(clientImagePayload);

          if (!responseClientCreateImage.data.isOK) throw responseClientCreateImage.data.errorMessages;
        }
        isOpenModal.value = false;
        clientData.resetClientField();
        clientData.resetClientImage();
        loadClientList();
        openNotification("success", 'Create new client successfully');
      } catch(error) {
        handleErrorMessages(error);
        openNotification("error", messages);
      }
      finally {
        console.log('finally');
      }

      console.log('clientPayload', clientPayload);
    };


    return {
      clientInfo,
      clientData,
      clientList,
      modalTitle,
      currentPage,
      clientImage,
      isOpenModal,
      totalClient,
      formatNotes,
      formatMoney,
      clientGroups,
      createNewClient,
      handleChangePage,
      converRegistrations,
      openModalCreateNewClient,
      formatKRMobileAndPhoneNumber,
    };
  },
};
</script>

<style lang="scss" scoped>
@import './client-list.scss';
</style>