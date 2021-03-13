<template lang="pug">
  .sidebar
    .sidebar__trigger(@click="$parent.$emit('sidenav:toggle')")
      .sidebar__trigger-inner
        i.sidebar__trigger-icon(:class="{'is-active': $parent.open}")
          span
    //- router-link.sidebar__link(v-if="$can('view', 'Dashboard')" :to="{name: 'dashboard'}" @click="$parent.$emit('sidenav:toggle')"  active-class="sidebar__link--active")
    //-   svgicon.sidebar__icon( name="sidebar-menu-new/dashboard" v-tooltip.right-start="{content: showTooltipText('tooltips.main_navbar.dashboard'), classes: ['offset-tooltip-navsidebar']}")
    //-   span.sidebar__title {{$t('navbarleft.dashboard')}}
    .sidebar__divider

    router-link.sidebar__link(v-if="$can('view', 'JobType')" :to="{name: 'job-schedule'}" active-class="sidebar__link--active" :class="{ 'sidebar__link--active': this.$route.path === '/jobs' }")
      svgicon.sidebar__icon(name="sidebar-menu-new/calendar" v-tooltip.right-start="{content: showTooltipText('tooltips.main_navbar.jobschedule'), classes: ['offset-tooltip-navsidebar']}")
      span.sidebar__title {{$t('navbarleft.jobschedule')}}
    router-link.sidebar__link(v-if="$can('view', 'JobType')" :to="{name: 'job-timesheet'}" active-class="sidebar__link--active" :class="{ 'sidebar__link--active': this.$route.path === '/timesheets' }")
      svgicon.sidebar__icon(name="job-schedule/change-view/time-sheet" v-tooltip.right-start="{content: showTooltipText('tooltips.job_submit.switcher_timesheet'), classes: ['offset-tooltip-navsidebar']}")
      span.sidebar__title {{$t('navbarleft.timesheets')}}
    router-link.sidebar__link(v-if="$can('view', 'Job')" :to="{path: '/invoices'}"   active-class="sidebar__link--active"  :class="{ 'sidebar__link--active': this.$route.path === '/invoices' || this.$route.path === '/shifts' }")
      svgicon.sidebar__icon(name="sidebar-menu-new/billing-finance" v-tooltip.right-start="{content: showTooltipText('tooltips.main_navbar.billing'), classes: ['offset-tooltip-navsidebar']}")
      span.sidebar__title {{$t('navbarleft.billing')}}

    .sidebar__divider(v-if="$can('create', 'Client') || $can('view', 'Temp') || $can('view', 'Document')")

    router-link.sidebar__link(v-if="$can('create', 'Client')" :to="{name: 'clients'}"   active-class="sidebar__link--active" :class="{ 'sidebar__link--active': ['/clients', '/client-admins', '/clients-map'].includes(this.$route.path)}")
      svgicon.sidebar__icon(  name="sidebar-menu-new/clients-location" v-tooltip.right-start="{content: showTooltipText('tooltips.main_navbar.clients'), classes: ['offset-tooltip-navsidebar']}")
      span.sidebar__title {{$t('navbarleft.clients')}}
    router-link.sidebar__link(v-if="$can('view', 'Temp')" :to="{name: 'candidates'}"   active-class="sidebar__link--active" :class="{ 'sidebar__link--active': ['/candidates', '/requests', '/candidate-pools'].includes(this.$route.path)}")
      svgicon.sidebar__icon(  name="sidebar-menu-new/candidates" v-tooltip.right-start="{content: showTooltipText('tooltips.main_navbar.candidates'), classes: ['offset-tooltip-navsidebar']}")
      span.sidebar__title {{$t('navbarleft.candidates')}}
    router-link.sidebar__link(v-if="$can('view', 'Document')" :to="{name: 'documents-&-compliance'}"   active-class="sidebar__link--active" :class="{ 'sidebar__link--active': this.$route.path === '/documents' || this.$route.path === '/documents-by-candidate' || this.$route.path === '/inspect-uploaded-documents' }")
      svgicon.sidebar__icon(  name="sidebar-menu-new/doc-compliance" v-tooltip.right-start="{content: showTooltipText('tooltips.main_navbar.documents'), classes: ['offset-tooltip-navsidebar']}")
      span.sidebar__title {{$t('navbarleft.documents')}}

    .sidebar__divider

    router-link.sidebar__link(v-if="$can('use', 'AgencyAdmin')" :to="{path: '/agency-structure#agency'}"   active-class="sidebar__link--active" :class="{ 'sidebar__link--active': this.$route.path === '/agency-structure' }")
      svgicon.sidebar__icon(  name="sidebar-menu-new/agency-structure" v-tooltip.right-start="{content: showTooltipText('tooltips.main_navbar.agency'), classes: ['offset-tooltip-navsidebar']}")
      span.sidebar__title {{$t('navbarleft.agency')}}

    router-link.sidebar__link(v-if="$can('view', 'PayRate')" :to="{name: 'rate-current'}"   active-class="sidebar__link--active" :class="{ 'sidebar__link--active': this.$route.path === '/rates-current' || this.$route.path === '/rates-margins' || this.$route.path === '/bonuses' }")
      svgicon.sidebar__icon(  name="sidebar-menu-new/rate-editing" v-tooltip.right-start="{content: showTooltipText('tooltips.main_navbar.rates'), classes: ['offset-tooltip-navsidebar']}")
      span.sidebar__title {{$t('navbarleft.rates')}}

    router-link.sidebar__link(v-if="$can('view', 'User')" :to="{name: 'internal-users'}"   active-class="sidebar__link--active")
        svgicon.sidebar__icon(  name="sidebar-menu-new/internal-users" v-tooltip.right-start="{content: showTooltipText('tooltips.main_navbar.users'), classes: ['offset-tooltip-navsidebar']}")
        span.sidebar__title {{$t('navbarleft.users')}}

    router-link.sidebar__link(v-if="canUseReports()" :to="{name: 'reporting'}" active-class="sidebar__link--active" :class="{ 'sidebar__link--active': this.$route.path === '/reports' || this.$route.path === '/reports-hours' || this.$route.path === '/reports-jobs' || this.$route.path === '/reports-activity' || this.$route.path === '/reports-worklog' || this.$route.path === '/reports-payroll' }")
      svgicon.sidebar__icon(  name="sidebar-menu-new/reporting" :fill="false" v-tooltip.right-start="{content: showTooltipText('tooltips.main_navbar.reporting'), classes: ['offset-tooltip-navsidebar']}")
      span.sidebar__title {{$t('navbarleft.reporting')}}
    router-link.sidebar__link(v-if="$can('view', 'User')" :to="{path: '/absence-overview/reports-inactivity' }"   active-class="sidebar__link--active" :class="{ 'sidebar__link--active': this.$route.path === '/absence-overview/reports-inactivity' || this.$route.path === '/absence-overview/calendar' || this.$route.path === '/absence-overview/requests' }")
      svgicon.sidebar__icon.pill( name="candidates/sick-leave" :fill="false" width="20px" min-width="20px" height="20px" v-tooltip.right-start="{content: showTooltipText('tooltips.main_navbar.absenceOverview'), classes: ['offset-tooltip-navsidebar']}")
      span.sidebar__title {{$t('navbarleft.absenceOverview')}}
</template>

<script>
import '@/compiled-icons/sidebar-menu-new'
export default {
  methods: {
    canUseReports() {
      return this.$ability.rules.some((i) => i.subject[0] === 'Report')
    },
    showTooltipText(text) {
      if (this.$parent.open) {
        return
      } else {
        return this.$t(text)
      }
    }
  }
}
</script>

<style lang="stylus">
.offset-tooltip-navsidebar {
  left: 20px !important;
}
</style>
<style lang="stylus" scoped>


.sidebar {
  padding: 0 12px 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: $primarySideNav;
  height: 100%;
  border-right: 1px solid $primaryGray;

  .has-tooltip {
    outline: none;
  }

  &__trigger {
    height: 38px;
    position: relative;
    margin-top: 5px;
    width: 100%;

    // &:after {
    //   position: absolute;
    //   height: 2px;
    //   left: -12px;
    //   right: -12px;
    //   bottom: 0;
    //   content: '';
    //   background: #254353;
    // }
  }

  &__trigger-inner {
    position: absolute;
    top: 0;
    left: -12px;
    right: -12px;
    bottom: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      .sidebar__trigger-icon span, .sidebar__trigger-icon span:after, .sidebar__trigger-icon span:before {
        background-color: $primary;
      }
    }

    // &:after {
    //   position: absolute;
    //   height: 12px;
    //   width: 100%;
    //   left: 0;
    //   top: 0;
    //   content: '';
    //   box-shadow: inset 0px 4px 8px 0 rgba(0, 0, 0, 0.25);
    // }
  }

  &__trigger-icon {
    font-size: 14px;
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    cursor: pointer;

    &.is-active {
      width: 14px;

      span {
        &:after {
          transform: translateY(-4px) translateX(-5px) rotate(-45deg) scaleX(0.9);
        }

        &:before {
          transform: translateY(4px) translateX(-5px) rotate(45deg) scaleX(0.9);
        }
      }
    }

    span {
      position: absolute;
      top: 50%;
      left: 0;
      display: block;
      width: 100%;
      height: 2px;
      margin-top: -0.1em;
      background-color: $primarySideNavIcon;
      user-select: none;
      transition: background-color 0.3s ease;

      &:after, &:before {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        background: $primarySideNavIcon;
        content: '';
        transition: all 0.3s ease;
      }

      &:after {
        transform: translateY(0.5em);
      }

      &:before {
        transform: translateY(-0.5em);
      }
    }
  }

  &__divider {
    width: calc(100% - 20px);
    margin: 10px 10px;
    padding: 0px 10px;
    border-bottom: 1px solid $primarySideNavIcon;
    opacity: 0.4;
  }

  &__toggle-divider {
    width: calc(100% + 48px);
    border-bottom: 1px solid white;
    opacity: 0.4;
    margin-left: -24px;
  }

  &__title {
    margin-left: 5px;
    overflow: hidden;
    white-space: nowrap;
  }

  &__toggle {
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
    width: 100%;
    background-color: $primarySideNav;

    svg {
      stroke: #6A7390;
    }

    &:hover {
      svg {
        stroke: white;
      }
    }
  }

  &__link {
    color: $primarySideNavIcon;
    display: flex;
    width: 100%;
    cursor: pointer;
    align-content: center;
    align-items: center;
    margin-top: 5px;

    svg {
      margin-left: 7px;
      color: $primarySideNavIcon;
    }

    &--active {
      border-radius: 6px;
      color: $primary;
      background-color: $primaryOpacity;
      svg {
        color: $primary
      }
    }

    &:hover {
      background-color: $primaryOpacity;
      transition: background-color 0.4s linear;
      color: $primary;
      border-radius: 6px;
      svg {
        color: $primary
      }
    }
  }

  &__icon {
    margin: 5px;
    width: 28px;
    min-width: 28px;
    height: 28px;
    &.pill {
      margin 10px 7px
    }
  }
}
</style>
