<template>
  <div class="text-field-tip">
    <div class="wrapper"
         v-show="is_error || is_correct">

      <transition name="slide-up">
        <!-- 成功提示 -->
        <span class="correct-sign" v-if="is_correct"><icon class="icon" name="i-check" color="#4fae9B"></icon></span>
        <!-- 错误提示 -->
        <p class="tip" v-else-if="is_error"> * {{ self_tip }}</p>
      </transition>

    </div>
  </div>
</template>

<style scoped>
  .text-field-tip { color:#f02f45;font-size: 12px;position: absolute;z-index:4;top:0;right:0;padding-right:10px;height:100%;background-color: rgba(255,255,255,.9);}
  .text-field-tip .wrapper {display: inline-block;vertical-align: middle;}
  .text-field-tip:after{ content: '';display: inline-block;height: 100%;vertical-align: middle; }
  .text-field-tip .correct-sign { position:relative;vertical-align:middle;text-align: center;border: 1px solid #333;display: inline-block;border-radius: 100%;width:18px;height:18px; }
  .text-field-tip .correct-sign .icon{ width:14px;height:14px;position:absolute;z-index:1;top:50%;left:50%;transform:translate(-50%,-50%) }
  .slide-up-enter-active, .slide-up-leave-active {transition: opacity .3s, transform .3s; }
  .slide-up-enter, .slide-up-leave-active {opacity: 0;transform: translateY(15px) }
</style>

<script>
  const BASIC_VERIFY_TIP = {
    phone: '手机格式不正确',
    password: '密码长度为6~20位',
    email: '邮箱格式不正确',
    empty: '不能为空'
  }
  export default{
    props: {
      tip: String,
      verify: [String, Array],
      is_error: Boolean,
      is_correct: Boolean
    },
    computed: {
      self_tip: function () {
        const {verify} = this;
        return this.tip || BASIC_VERIFY_TIP[verify] || '输入格式不正确';
      }
    }
  };
</script>
