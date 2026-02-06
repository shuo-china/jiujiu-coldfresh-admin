<template>
  <dialog-form v-model:visible="visible" :form-props="{ model: formData, rules }" :params="id"
    :request="mode === 'update' ? getDetailInfo : undefined" @submit="handleSubmit">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="formData.name" />
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-input v-model="formData.mobile" />
    </el-form-item>
  </dialog-form>
</template>

<script setup lang="ts">
import {
  createDriverApi,
  updateDriverApi,
  getDriverDetailApi,
} from "@/api/driver";

import { ElMessage, type FormRules } from "element-plus";

const emit = defineEmits(["created", "updated", "finished"]);

const props = defineProps<{
  mode: "create" | "update";
  id?: number;
}>();

const visible = defineModel("visible", { type: Boolean, default: false });

const formData = ref({
  name: "",
  mobile: "",
  dest_value: null,
  vehicle_id: null,
});

const rules: FormRules = {
  name: [{ required: true, message: "请输入姓名" }],
  mobile: [{ required: true, message: "请输入手机号" }],
  vehicle_id: [{ required: true, message: "请选择车辆" }],
  dest_value: [{ required: true, message: "请选择目的地" }],
};

const getDetailInfo = async (params) =>
  getDriverDetailApi(params).then((res) => ({
    name: res.name,
    mobile: res.mobile,
    dest_value: res.dest_value,
    vehicle_id: res.vehicle_id,
  }));

const handleSubmit = (cb) => {
  return props.mode === "create"
    ? handleCreateSubmit(cb)
    : handleUpdateSubmit(cb);
};

const handleCreateSubmit = (cb) => {
  createDriverApi(formData.value)
    .then(() => {
      ElMessage.success("提交成功");
      emit("created");
      emit("finished");
      cb(true);
    })
    .catch(() => {
      cb(false);
    });
};

const handleUpdateSubmit = (cb) => {
  updateDriverApi({
    ...formData.value,
    id: props.id,
  })
    .then(() => {
      ElMessage.success("提交成功");
      emit("updated", props.id);
      emit("finished");
      cb(true);
    })
    .catch(() => {
      cb(false);
    });
};
</script>
