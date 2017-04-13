<template>
  <label class="text-field"
         :class="{ error: is_error }">

    <!-- 标题 -->
    <text-field-label :label="label"
                      :float="label_float"
                      :sink="sink"></text-field-label>

    <section class="input-area"
             :style="{ height: height + 'px', border: border ? '' : '0' }">

      <!-- inputs -->
      <text-field-input v-if="type !== 'enum'"
                        :class="{sink}"
                        :type="type"
                        :placeholder="placeholder_deal"
                        :disabled="disabled"
                        :readonly="readonly"
                        :float="label_float"
                        :format="format"
                        :reg="reg"
                        :verify="verify"
                        :value="value"
                        @focus="focusHandler"
                        @blur="blurHandler(is_edited)"
                        @enter="enterHandler"
                        @input="inputHandler"
                        @verify="verifyHandler"></text-field-input>
      <!-- 枚举类型 -->
      <text-field-select v-else
                         :class="{sink}"
                         :placeholder="placeholder_deal"
                         :disabled="disabled"
                         :readonly="readonly"
                         :float="label_float"
                         :value="value"
                         :enums="enums"
                         :default_first="default_first"
                         @focus="focusHandler"
                         @blur="blurHandler(true)"
                         @enter="enterHandler"
                         @input="inputHandler"
                         @verify="verifyHandler"></text-field-select>

      <!-- 提示 -->
      <text-field-tip v-if="!no_verify"
                      v-show="!is_focus"
                      :tip="tip"
                      :verify="verify"
                      :is_error="is_error"
                      :is_correct="is_correct"></text-field-tip>

      <!-- 清空按钮 -->
      <div v-if="type !== 'enum' && type !== 'date' && type !== 'textarea'"
           v-show="value && is_focus"
           class="clear-all-btn"
           @touchend="$emit('input', '')">
        <span class="x">&times;</span>
      </div>


    </section>

  </label>
</template>

<style scoped>
  .text-field { position: relative; display: block; background-color: #fff }
  .text-field .input-area { position: relative; height: 50px; border-bottom: 1px solid #eee; }
  .text-field.error .input-area { border-color: #f02f45; }
  .text-field .clear-all-btn { display: block; width: 18px; height: 18px; border-radius: 100%; background-color: #eee; color: #eee; position: absolute; z-index: 99; right: 10px; top: 50%; transform: translateY(-50%); }
  .text-field .clear-all-btn > .x { color: #333; font-size: 14px; background-color: transparent; position: absolute; z-index: 1; left: 50%; top: 50%; transform: translate(-50%, -50%); border: 0; outline: none }
</style>

<script>
  export default{
    props: {
      format: Boolean,
      disabled: Boolean,
      readonly: Boolean,
      label_float: Boolean,
      label: String,
      type: {
        type: String,
        default: 'text'
      },
      placeholder: String,
      value: [String, Number],
      verify: [String, Array],
      reg: [RegExp, String],
      tip: String,
      enums: Array,
      height: Number,
      default_first: Boolean,
      border: {
        type: Boolean,
        default: true
      }
    },
    data: function () {
      return {
        is_edited: false,
        is_focus: false,
        is_error: false,
        is_correct: false,
        verify_result: false
      }
    },
    computed: {
      // 处理后的placeholder
      placeholder_deal: function () {
        return !this.label_float || this.is_focus ? this.placeholder : '';
      },
      // 默认focus动画开关
      sink: function () {
        return this.label_float && !!(this.is_focus || this.value || this.value === 0);
      },
      // 无验证需求
      no_verify: function () {
        return (!this.verify || (this.verify && !this.verify.length)) && !this.reg
      }
    },
    components: {
      'text-field-label': require('./text_field_label.vue'),
      'text-field-input': require('./text_field_input.vue'),
      'text-field-select': require('./text_field_select.vue'),
      'text-field-tip': require('./text_field_tip.vue')
    },
    watch: {
      value: function (value) {
        if (!value) {
          this.is_error = false;
          this.is_correct = false;
        }
      }
    },
    created: function () {
      this.registerEvents();
    },
    methods: {
      verifyHandler: function (verify_result) {
        this.verify_result = verify_result;
        this.$emit('verify', this.no_verify || verify_result)
      },
      focusHandler: function () {
        this.is_focus = true
        this.is_error = false
      },
      blurHandler: function (is_edited) {
        this.is_focus = false
        if (is_edited) {
          this.is_error = !this.no_verify && !this.verify_result;
          this.is_correct = !this.no_verify && this.verify_result;
        }
      },
      enterHandler: function () {
        this.$emit('enter');
      },
      inputHandler: function (val) {
        this.is_edited = true;
        this.is_correct = false
        this.$emit('input', val);
      },
      registerEvents: function () {
        const handler = () => {
          this.verifyHandler(this.verify_result);
          this.blurHandler(true);
        }
        this.$root.$on('form-verify', handler)
        this.$on('form-verify', handler)
      },
      test: function () {
        console.log(11111)
      }
    }
  };
</script>
