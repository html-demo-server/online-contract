import $ from "jquery"
$(function () {
    var $wrap = $('#wrap')
    $('#draw').attr('width', $wrap.width())
    $('#draw').attr('height', $wrap.height())
    var context = $('#draw').get(0).getContext('2d')
    context.strokeStyle = "black"
    context.fillStyle = "black"
    context.lineWidth = 4
    let lastPosition = []
    var keyDown = false
    $(document).on('touchstart', (e) => {
        keyDown = true
    })
    $(document).on('touchend', (e) => {
        keyDown = false
        lastPosition = []
    })
    $('#draw').on('touchmove', (e) => {
        e.stopPropagation()
        e.preventDefault()
        if (!keyDown) {
            return
        }
        var mouseX = e.touches[0].pageX - e.target.offsetLeft;
		var mouseY = e.touches[0].pageY - e.target.offsetTop;
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
    var photoScale = 758 / 512
    $('#contract').attr('width', $wrap.width())
    $('#contract').attr('height', $wrap.width() * photoScale)
    drawCompact()
    function drawCompact () {
        var context = $('#contract').get(0).getContext('2d')
        context.drawImage(
            $('#photo').get(0),
            0,
            0,
            $wrap.width(),
            $wrap.width() * photoScale
        )
        var scale = $wrap.height() / $wrap.width()
        var width = 80
        var height = width * scale
        context.drawImage(
            $('#draw').get(0),
            $('#contract').width() - width ,
            $('#contract').height() - height - 50,
            width,
            height
        )
    }
    $('#reset').on('click', function () {
        context.clearRect(0, 0, 9999,9999)
        drawCompact()
    })
})
