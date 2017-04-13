<template>
  <input v-if="type !== 'textarea'"
         class="text-field-input"
         :class="[{ float }, type]"
         :type="type"
         :placeholder="placeholder"
         :disabled="disabled"
         :readonly="readonly"
         :value="value"
         @focus="$emit('focus')"
         @blur="$emit('blur')"
         @keyup.enter="$emit('enter')"
         @input="$emit('input', $event.target.value)"
         @change="$emit('input', reformStr($event.target.value))">

  <textarea v-else
            class="text-field-text-area"
            cols="30" rows="20"
            :class="[{ float }, type]"
            :placeholder="placeholder"
            :value="value"
            @focus="$emit('focus')"
            @blur="$emit('blur')"
            @keyup.enter="$emit('enter')"
            @input="$emit('input', $event.target.value)"
            @change="$emit('input', reformStr($event.target.value))"></textarea>
</template>

<style scoped>
  .text-field-input { padding: 2px 30px 2px 10px; display: block; width: 100%; height: 100%; }
  .text-field-input.date { line-height: 48px }
  /*fix: date类型无法垂直居中*/
  .text-field-input.float { padding-top: 22px; line-height: inherit; }
  .text-field-text-area { padding: 2px 30px 2px 10px; display: block; width: 100%; min-height: 100px; resize: none; appearance: none; outline: none; border: none; border-radius: 0 0 0 0; box-shadow: none; }
  .text-field-text-area.float { padding-top: 22px; line-height: inherit; }
</style>

<script>
  export default{
    props: {
      value: [String, Number],
      type: {
        type: String,
        default: 'text'
      },
      placeholder: String,
      disabled: Boolean,
      readonly: Boolean,
      float: Boolean,
      format: Boolean,
      verify: [String, Array],
      reg: [RegExp, String]
    },
    watch: {
      verify_result: function () {
        this.$emit('verify', this.verify_result)
      }
    },
    created: function () {
      this.$emit('verify', this.verify_result)
    },
    methods: {
      reformStr: function (str) {
        let result = str.trim();
        if (this.type === 'number') result = parseFloat(result);
        if (this.format) result = this.dealSpecialSymbol(result);
        return result;
      },
      dealSpecialSymbol: function (str) {
        const CHINESE_SYMBOL = '，。！？【】（）％＃＠＆１２３４５６７８９０'
        const REFORM_SYMBOL = ',.!?[]()%#@&1234567890'
        const TRANS_SYMBOL = {'.': true, '(': true, ')': true, '{': true, '}': true, '?': true}
        if (typeof str.normalize === 'function') str = str.normalize('NFKC');
        let arr = str.split('');
        let arr_deal = arr.map((item) => {
          let idx;
          let condition;
          condition = TRANS_SYMBOL[item] ? '\\' + item : item;
          idx = CHINESE_SYMBOL.search(condition);
          return idx !== -1 ? REFORM_SYMBOL.charAt(idx) : item;
        })
        return arr_deal.join('');
      }
    }
  };
</script>
