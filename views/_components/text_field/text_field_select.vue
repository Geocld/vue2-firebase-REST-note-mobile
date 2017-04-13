<template>
  <div class="text-field-select"
       :class="{ float }">
    <select class="selected"
            :disabled="disabled"
            :readonly="readonly"
            @change="changeHandler"
            @focus="focusHandler"
            @blur="blurHandler"
            v-model="val">
      <option v-for="(option, index) in enums"
              :value="option.value || option.value === 0 ? option.value : index">
        {{ option.title || option }}
      </option>
    </select>
    <select v-model="val">
      <option v-for="(option, index) in enums"
              :value="option.value || option.value === 0 ? option.value : index">
        {{ option.title || option }}
      </option>
    </select>
  </div>
</template>

<style scoped>
  .text-field-select { display: inline-block;width: 100%;height: 100%; }
  .text-field-select.float{ padding-top:20px; }
  .text-field-select > select{ -webkit-appearance: none;  -moz-appearance: none;padding-left:10px;outline: none;border: 0;display: inline-block;width:100%;height:100%;background-color: transparent;}
  .text-field-select > select.selected{ position: absolute;z-index:4;top:0;left:0;width:100%;height:100%;opacity: 0; }
</style>

<script>
  export default{
    props: {
      enums: Array,
      value: {},
      placeholder: String,
      default_first: Boolean,
      disabled: Boolean,
      readonly: Boolean,
      float: Boolean
    },
    data: function () {
      return {
        val: ''
      }
    },
    watch: {
      value: function (value) {
        this.val = value;
        this.$emit('verify', !!this.val || this.val === 0)
      }
    },
    created: function () {
      this.val = this.value;
      this.$emit('verify', !!this.val || this.val === 0)
      if (this.default_first) {
        // 默认选中第一个，除非已有选择，如使用localStorge的数据。
        this.$emit('input', this.val || this.enums[0].value || 0)
      }
    },
    methods: {
      changeHandler: function ({target: {value}}) {
        this.$emit('input', value);
        this.$emit('verify', !!value || value === 0)
      },
      focusHandler: function () {
        this.$emit('focus');
        // 解决ios下，select默认选择第一个，但实际未选中的bug
        if (!this.val) this.val = this.enums[0].value;
        this.$emit('input', this.val);
      },
      blurHandler: function ({target: {value}}) {
        this.$emit('input', value);
        this.$emit('verify', !!value || value === 0)
        this.$emit('blur');
      }
    }
  };
</script>
