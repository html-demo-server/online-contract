import $ from "jquery"
$(function () {
    var $wrap = $('#wrap')
    $('#draw').attr('width', $wrap.width())
    $('#draw').attr('height', $wrap.height())
    var context = $('#draw').get(0).getContext('2d')
    context.strokeStyle = "black"
    context.fillStyle = "black"
    context.lineWidth = 10
    let lastPosition = []
    var keyDown = false
    $(document).on('mousedown', (e) => {
        keyDown = true
    })
    $(document).on('mouseup', (e) => {
        keyDown = false
        lastPosition = []
    })
    $('#draw').on('mousemove', (e) => {
        if (!keyDown) {
            return
        }
        var mouseX = e.pageX - e.target.offsetLeft;
		var mouseY = e.pageY - e.target.offsetTop;
        if (lastPosition.length === 0) {
            lastPosition = [mouseX, mouseY]
        }
        context.beginPath()
        context.moveTo(lastPosition[0], lastPosition[1])
        context.lineTo(mouseX, mouseY)
        context.closePath()
        context.stroke()
        lastPosition = [mouseX, mouseY]
        drawCompact()
    })
    drawCompact()
    function drawCompact () {
        var context = $('#contract').get(0).getContext('2d')
        context.drawImage(
            $('#photo').get(0),
            0,
            0,
            512,
            758
        )
        var scale = $wrap.height() / $wrap.width()
        var width = 100
        var height = width * scale
        context.drawImage(
            $('#draw').get(0),
            512-width-35,
            758-height-70,
            width,
            height
        )
    }
    $('#reset').on('click', function () {
        context.clearRect(0, 0, 9999,9999)
        drawCompact()
    })
})
