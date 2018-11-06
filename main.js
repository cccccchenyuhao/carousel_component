function Carousel($ct) {
    this.init($ct)
    this.bind()
    this.autoPlay()
}

Carousel.prototype = {
    constructor: Carousel,
    init: function ($ct) {
        this.$ct = $ct
        this.$imgCt = this.$ct.find('.img-ct')
        this.$imgs = this.$ct.find('.img-ct > li')
        this.$prevBtn = this.$ct.find('.control .icon-prev')
        this.$nextBtn = this.$ct.find('.control .icon-next')
        this.$dot = this.$ct.find('.curr-img i')

        this.imgCount = this.$imgs.length
        this.imgWidth = this.$imgs.width()
        this.ctWidth = this.imgCount * this.imgWidth

        this.$imgCt.append(this.$imgs.first().clone())
        this.$imgCt.prepend(this.$imgs.last().clone())
        this.$imgCt.css('width', (this.imgCount + 2) * this.imgWidth)
        this.$imgCt.css('left', -this.imgWidth)

        this.pageIdx = 0
        this.isAnimate = false

    },
    bind: function () {
        var _this = this
        this.$prevBtn.on('click', function () {
            _this.playPre()
        })
        this.$nextBtn.on('click', function () {
            _this.playNext()
        })
        this.$dot.on('click', function () {
            _this.$imgCt.css('left', -_this.imgWidth * ($(this).index() + 1))
            _this.pageIdx = $(this).index()
            _this.setDot()
        })
    },
    playPre: function () {
        var _this = this
        if (this.isAnimate) return
        this.isAnimate = true
        this.$imgCt.animate({
            left: '+=' + _this.imgWidth
        }, function () {
            _this.pageIdx -= 1
            if (_this.pageIdx < 0) {
                _this.$imgCt.css('left', -_this.ctWidth)
                _this.pageIdx = _this.imgCount - 1
            }
            _this.isAnimate = false
            _this.setDot()
        })
    },
    playNext: function () {
        var _this = this
        if (this.isAnimate) return
        this.isAnimate = true
        this.$imgCt.animate({
            left: '-=' + _this.imgWidth
        }, function () {
            _this.pageIdx += 1
            if (_this.pageIdx === _this.imgCount) {
                _this.$imgCt.css('left', -_this.imgWidth)
                _this.pageIdx = 0
            }
            _this.isAnimate = false
            _this.setDot()
        })
    },
    setDot: function () {
        this.$dot.eq(this.pageIdx).addClass('icon-current').removeClass('icon-normal').siblings().addClass('icon-normal').removeClass('icon-current')
    },
    autoPlay: function () {
        var _this = this
        this.clock = setInterval(function () {
            _this.playNext()
        }, 1000)
    },
    stopAutoPlay: function () {
        clearInterval(this.clock)
    }
}

var c1 = new Carousel($('.carousel').eq(0))
var c2 = new Carousel($('.carousel').eq(1))
var c3 = new Carousel($('.carousel').eq(2))
