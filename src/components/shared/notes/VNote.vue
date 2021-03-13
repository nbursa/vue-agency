<template lang="pug">
div.note
    .note__header
        p.note__header-author 
            span.note__name {{`${note.user.firstName} ${note.user.lastName}`}}
            span.note__role {{note.user.role ? note.user.role.label : ""}}
        p.note__header-date {{noteDate}}
    .note__body {{note.note}}
    .note__footer
        a.red(@click="showPopup = !showPopup") {{$t("global.delete")}}
        .note__delete-popup(
            v-show="showPopup"
        )
            a.red(@click="$emit('note:delete', note.id); showPopup = false") {{$t("global.yes")}}
            a(@click="showPopup = false") {{$t("global.cancel")}}

</template>
<script>
import DateTimeUtils from "@/utils/dateUtils.js"

export default {
    props: {
        note: {
            type: Object,
            required: true,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            showPopup: false
        }
    },
    computed: {
        noteDate() {
            return DateTimeUtils.getCalendarFormat(this.note.createdAt)
        }
    }
}
</script>
<style lang="stylus" scoped>
.note
    padding 20px
    border-bottom 1px solid rgba(151,151,151, 0.2)
    &__header
        padding-bottom 12px
        display flex
        justify-content space-between
        align-items center
    &__body
        padding-bottom 12px
        word-break break-word
        color #2F3439
    &__footer 
        display flex
        justify-content flex-end
        position relative
        .red 
            color #FB0000
        a 
            font-weight 600
    &__delete-popup
            position absolute
            bottom -60px
            background white
            border-radius 2px
            box-shadow 0 2px 20px 0 rgba(0,0,0,0.09) 
            padding 10px
            right 0
            min-width 120px
            min-height 56px
            display flex
            justify-content space-between
            align-items center
    &__header-author
        display flex
        align-items center
        flex-wrap wrap
    &__name 
        color #838D98
        font-weight 600
    &__role
        font-size 12px
        border-radius 3px	
        background-color rgba(200,218,229, 0.32)
        margin-left 5px
        padding 5px
        color #7A838D
    &__header-date 
        font-size: 12px;
</style>