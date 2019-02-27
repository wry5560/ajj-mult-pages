<template>
  <div class="hello">
    <a-cascader
      :options="options"
      @change="onChange"
      :loadData="loadData"
      placeholder="Please select"
      changeOnSelect
    />
  </div>
</template>

<script>
  export default {
    name: "test",
    props: {},
    data() {
      return {
        options: [
          {
            value: "zhejiang",
            label: "Zhejiang",
            isLeaf: false
          },
          {
            value: "jiangsu",
            label: "Jiangsu",
            isLeaf: false
          },
          {
            value: "jiangsu1",
            label: "Jiangsu",
            isLeaf: false
          },
          {
            value: "jiangsu2",
            label: "Jiangsu",
            isLeaf: false
          },
          {
            value: "jiangsu3",
            label: "Jiangsu",
            isLeaf: false
          }
        ]
      };
    },
    methods: {
      onChange(value) {
        console.log(value);
      },
      loadData(selectedOptions) {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        // load options lazily
        setTimeout(() => {
          targetOption.loading = false;
          targetOption.children = [
            {
              label: `${targetOption.label} Dynamic 1`,
              value: "dynamic1"
            },
            {
              label: `${targetOption.label} Dynamic 2`,
              value: "dynamic2"
            }
          ];
          this.options = [...this.options];
        }, 1000);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
