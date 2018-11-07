<template>
<div class="modal">
  <div class="modal-card">
    <div class="modal-header">
      <slot name="header"></slot>
    </div>
    <div class="modal-content">
      <slot name="content"></slot>
    </div>
    <div class="modal-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'PrimaryModal',
};
</script>

<style lang="postcss" scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);

  & .modal-card {
    width: 400px;
    margin: 100px auto;
    background-color: #fff;
    border-radius: 10px;
  }

  & .modal-header {
    padding: 10px;
    border-bottom: 1px solid #d1d1d1;
  }

  & .modal-content {
    padding: 10px;
  }

  & .modal-footer {
    padding: 10px;
    border-top: 1px solid #d1d1d1;
    text-align: center;
  }
}
</style>
