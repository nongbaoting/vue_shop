<template>
  <div>
    <div id="molstar"></div>
  </div>
</template>

<script>
export default {
  name: 'Molstar',
  data() {
    return {}
  },
  mounted() {
    this.molstar('molstar')
  },
  methods: {
    molstar(app_id) {
      this.$nextTick(function () {
        // Code that will run only after the
        // entire view has been re-rendered
        var viewer = new this.$molstar(app_id, {
          layoutIsExpanded: true,
          layoutShowControls: false,
          layoutShowRemoteState: false,
          layoutShowSequence: true,
          layoutShowLog: false,
          layoutShowLeftPanel: true,

          viewportShowExpand: true,
          viewportShowSelectionMode: false,
          viewportShowAnimation: false,

          pdbProvider: 'rcsb',
          emdbProvider: 'rcsb',
        })
        viewer.loadPdb('7bv2')
        viewer.loadEmdb('EMD-30210', { detail: 6 })
      })
    },
  },
}
</script>

<style lang="less" scoped>
#molstar {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>