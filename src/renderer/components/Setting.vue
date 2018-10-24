<template>
    <div class="form" @change="formChanged">
        <!-- Width -->
        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Width</label>
            </div>
             <div class="field-body">
                 <div class="field">
                    <div class="control">
                         <input class="input is-info" type="number" placeholder="Auto" v-model="width">
                    </div>
                 </div>
             </div>
        </div>

        <!-- Height -->
        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Height</label>
            </div>
             <div class="field-body">
                 <div class="field">
                    <div class="control">
                         <input class="input is-info" type="number" placeholder="Auto" v-model="height">
                    </div>
                 </div>
             </div>
        </div>

        <!-- Quality -->
        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Quality</label>
            </div>
             <div class="field-body">
                 <div class="field">
                    <div class="control">
                         <input class="input is-info" type="number" placeholder="100" v-model="quality">
                    </div>
                 </div>
             </div>
        </div>

        <!-- Format -->
        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Format</label>
            </div>
             <div class="field-body">
                 <div class="field">
                    <div class="control">
                         <div class="select">
                            <select v-model="format">
                                <option value=''>Original file type</option>
                                <option value="png">png</option>
                                <option value="jpeg">jpeg</option>
                                <option value="jpg">jpg</option>
                                <option value="bmp">bmp</option>
                            </select>
                        </div>
                    </div>
                 </div>
             </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'setting-form',
    data() {
        return {
            width: '',
            height: '',
            quality: 100,
            format: ''
        }
    },
    methods: {
        formChanged() {
            this.$store.dispatch('updateSetting', {
                width: this.width,
                height: this.height,
                quality: this.quality,
                format: this.format
            })
        }
    }
}
</script>