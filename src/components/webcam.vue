<template>
    <div>
        <!-- 视频区 -->
        <div id="my_camera"></div>
        <!-- 映射区 -->
        <canvas id="canvas" width="1000" height="565"></canvas>
    </div>
</template>

<script>
export default {
    name: 'webcam',
    data() {
        return {}
    },
    mounted() {
        this.Webcam()
        this.Track()
    },
    methods: {
        // 摄像
        Webcam() {
            // eslint-disable-next-line
            Webcam.set({
                width: 1000,
                height: 565,
                image_format: 'jpeg',
                jpeg_quality: 90
            })
            // eslint-disable-next-line
            Webcam.attach('#my_camera')
        },
        // 活检
        Track() {
            const that = this
            let video = document.getElementsByTagName('video')[0]
            let canvas = document.getElementById('canvas')
            let context = canvas.getContext('2d')
            // eslint-disable-next-line
            let tracker = new tracking.ObjectTracker('face')

            // 检出率参数
            tracker.setInitialScale(3.3)
            tracker.setStepSize(1.8)
            tracker.setEdgesDensity(0.12)

            // 监听摄像头中是否有人脸
            tracker.on('track', function(event) {
                // // 画出人脸
                context.clearRect(0, 0, canvas.width, canvas.height)
                event.data.forEach(function (rect) {
                    context.strokeStyle = '#fff'
                    context.strokeRect(rect.x, rect.y, rect.width, rect.height)
                    context.font = '11px Helvetica'
                    context.fillStyle = '#fff' 
                    context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11)
                    context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22)
                })

                // 获取图片url
                if (event.data.length >= 1) {
                    // eslint-disable-next-line
                    Webcam.snap(function (url) {
                       // 向父组件传值
                       that.$emit('on-change', url)
                    })
                    context.clearRect(0, 0, canvas.width, canvas.height)
                    // 停止侦测
                    // that.trackerTask.stop()
                } else {
                    console.log('识别失败')
                    // 引导用户正对摄像头中心
                    // context.strokeRect(350, 110, 300, 360)
                    // 头部
                    that.roundedRect(context, 500, 245, 150, 180)
                    // 左眼
                    that.roundedRect(context, 445, 250, 40, 25)
                    // 右眼
                    that.roundedRect(context, 555, 250, 40, 25)
                    // 嘴唇
                    that.roundedRect(context, 500, 355, 40, 25)
                    context.font = '24px'
                    context.fillStyle = '#fff'
                    context.fillText('尽量请将头部置于框内，并保证光线充足', 410, 120)
                }
            })
            //激活
            // eslint-disable-next-line
            tracking.track(video, tracker)
        },
        // 圆角矩形
        roundedRect(ctx, x, y, width, height) {
            ctx.beginPath()
            ctx.lineWidth = 0.5
            ctx.strokeStyle = '#fff'
            // ctx.moveTo(x, y + radius)
            // ctx.lineTo(x, y + height - radius)
            // ctx.quadraticCurveTo(x, y + height, x + radius, y + height)
            // ctx.lineTo(x + width - radius, y + height)
            // ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
            // ctx.lineTo(x + width, y + radius)
            // ctx.quadraticCurveTo(x + width, y, x + width - radius, y)
            // ctx.lineTo(x + radius, y)
            // ctx.quadraticCurveTo(x, y, x, y + radius)
            ctx.ellipse(x, y, width, height, 0, 0, Math.PI * 2, true)
            ctx.stroke()
        }
    },
    deactivated() {
        // 停止侦测
        this.trackerTask.stop()
        // 关闭摄像头
        window.tracking.closeCamera()
    } 
}
</script>
<style>
#canvas, #my_camera{
    position: absolute;
    top: 0;
    left: 0;
}
</style>
