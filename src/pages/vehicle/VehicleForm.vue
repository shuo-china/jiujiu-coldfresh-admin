<template>
  <dialog-form
    v-model:visible="visible"
    :form-props="{ model: formData, rules }"
    :params="id"
    :request="mode === 'update' ? getDetailInfo : undefined"
    @submit="handleSubmit"
  >
    <el-form-item label="车牌号" prop="plate_num">
      <el-input v-model="formData.plate_num" />
    </el-form-item>
  </dialog-form>
</template>

<script setup lang="ts">
import {
  createVehicleApi,
  updateVehicleApi,
  getVehicleDetailApi,
} from "@/api/vehicle";
import { ElMessage, type FormRules } from "element-plus";

const emit = defineEmits(["created", "updated", "finished"]);

const props = defineProps<{
  mode: "create" | "update";
  id?: number;
}>();

const visible = defineModel("visible", { type: Boolean, default: false });

const formData = ref({
  plate_num: "",
});

const rules: FormRules = {
  plate_num: [{ required: true, message: "请输入车牌号" }],
};

const getDetailInfo = async (params) =>
  getVehicleDetailApi(params).then((res) => ({
    plate_num: res.plate_num,
  }));

const handleSubmit = (cb) => {
  return props.mode === "create"
    ? handleCreateSubmit(cb)
    : handleUpdateSubmit(cb);
};

const handleCreateSubmit = (cb) => {
  createVehicleApi(formData.value)
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
  updateVehicleApi({
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
