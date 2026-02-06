<template>
  <page>
    <div class="mb-4">
      <el-button icon="Plus" type="primary" @click="handleCreate">新增司机</el-button>
    </div>
    <pro-table ref="tableRef" :request="getDriverPaginationApi">
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="手机号" prop="mobile" />
      <el-table-column label="操作" fixed="right" :width="170">
        <template #default="{ row }">
          <action-group>
            <action-item>
              <el-button link type="primary" @click="handleUpdate(row)">
                编辑
              </el-button>
            </action-item>
            <action-item>
              <el-button link type="primary" @click="handleDelete(row.id)">删除</el-button>
            </action-item>
          </action-group>
        </template>
      </el-table-column>
    </pro-table>
    <driver-form v-model:visible="formVisible" :id="id" :mode="mode" @finished="tableRef?.refresh()" />
  </page>
</template>

<script setup lang="ts">
import { deleteDriverApi, getDriverPaginationApi } from "@/api/driver";
import type { ProTableInstance } from "@/components/ProTable/type";
import { ElMessageBox } from "element-plus";
import DriverForm from "./DriverForm.vue";

const tableRef = ref<ProTableInstance>();

const formVisible = ref(false);
const id = ref<number>();
const mode = ref<"create" | "update">("create");

const handleCreate = () => {
  mode.value = "create";
  id.value = undefined;
  formVisible.value = true;
};

const handleUpdate = (item) => {
  mode.value = "update";
  id.value = item.id;
  formVisible.value = true;
};

const handleDelete = (id: number) => {
  ElMessageBox.confirm("确定要删除吗？", {
    type: "warning",
  })
    .then(() => {
      return deleteDriverApi(id);
    })
    .then(() => {
      tableRef.value?.refresh();
    });
};
</script>
