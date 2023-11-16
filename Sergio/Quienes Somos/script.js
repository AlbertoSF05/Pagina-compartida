/** Draggable Slider */
const slider = document.getElementById('slider-container')
const sliderFlex = document.getElementById('slider-flex')
const slideritems = document.querySelectorAll('#slider-flex .slider-item')
 
// Variable of X-axis position where Mouse move started
var Xposition = 0;
// Variable of X-axis position when Mouse is moving
var XpositionMove = 0;
// Variable of X-axis position of for slide animation/transition when mousemove
var XNewPosition = 0;
// Variable of X-axis position difference from start to end of mousemove
var slide = 0;
// Variable of X-axis Final position of sliding animation/transition when mousemove end (Updates when mouseup)
var XNewPositionFinal = 0;
// Variable of X-axis current position (Updates when mouseup)
var currentPosition = 0;
// width of the Slider Image
var itemWidth = slideritems[0].clientWidth;
// maximum width for animating the slider items
var maxslide = itemWidth  * (slideritems.length - 1);
 
/**
    * Start of Slider/Image Dragging Function
    */
function startDragging(e){
    e.preventDefault()
    Xposition = e.clientX;
 
    //start slider animation/transition onmousemove
    document.addEventListener('mousemove', startMove)
    //End of mouse move
    document.addEventListener('mouseup', function(e){
        document.removeEventListener('mousemove',startMove)
        XNewPositionFinal = XNewPositionFinal + XNewPosition
        if(slide < 0){
            /** Slide Next */
            if(Math.abs(slide) > 150 && Math.abs(currentPosition - itemWidth) <=  maxslide){
                currentPosition = currentPosition - itemWidth
            }
        }else{
            /** Slide Privous */
            if(Math.abs(slide) > 150  && Math.abs(currentPosition - itemWidth) >  itemWidth){
                currentPosition = currentPosition + itemWidth
            } 
        }
        slideritems.forEach(el => {
            // Add transition to element temporarily
            el.style.transition = `left .5s ease-in-out`;
            el.style.left = `${currentPosition}px`
 
            // Remove transition to element
            setTimeout(()=>{
                el.style.transition = `none`;
            }, 800)
 
        })  
 
        /** Reset Variables */
        XNewPositionFinal = currentPosition
        Xposition = 0;
        XpositionMove = 0;
        XNewPosition = 0;
        slide = 0;
    })
}
/**
    * Animate Slider onmousemove Function
    */
Ezoic
function startMove(e){
    e.preventDefault()
    XpositionMove = e.clientX;
    slide = XpositionMove - Xposition
    XNewPosition = XNewPositionFinal + slide
 
    /** Move Slide Items */
    slideritems.forEach(el => {
        el.style.left = `${XNewPosition}px`
    })
}
 
// Start Drag
slideritems.forEach(slideItem => {
    slideItem.addEventListener('mousedown', startDragging)
})