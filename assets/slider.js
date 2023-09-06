const createDot = (current = false) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');

    if (current) {
        dot.classList.add('slider-dot-current');
    }

    document.querySelector('.slider-dots-container').appendChild(dot);
}

const handleSliderChange = (index, max) => {

    if (index === max) {
        index = 0
    } else {
        index += 1
    }

    const elements = Array.from(document.querySelectorAll('.slider-element'))
    const dots = Array.from(document.querySelectorAll('.slider-dot'))

    const currElement = elements.find(element => element.classList.contains('slider-element-current'))

    currElement.animate(
        [{
            opacity: 0
        }],
        { duration: 500 }
    )

    setTimeout(() => {
        const currDot = dots.find(dot => dot.classList.contains('slider-dot-current'))

        currElement.classList.remove('slider-element-current')
        currElement.style.display = 'none'

        elements[index].style.display = 'block'
        elements[index].animate(
            [{
                opacity: 1
            }],
            { duration: 500 }
        )
        setTimeout(() => {
            elements[index].classList.add('slider-element-current')
        }, 500)

        dots[index].classList.add('slider-dot-current')
        currDot.classList.remove('slider-dot-current')
    }, 500)


    return index
}

const slider = document.querySelector('.slider');

if (slider) {
    const sliderChildren = Array.from(slider.children)

    sliderChildren.forEach(child => {
        const isCurrent = child.classList.contains('slider-element-current')
        if (isCurrent) {
            createDot(true)
        } else {
            createDot()
        }
    })

    if (sliderChildren.length !== 0 && sliderChildren.length !== 1) {
        let index = 0

        setInterval(() => {
            index = handleSliderChange(index, sliderChildren.length - 1)
        }, 5000)
    }
}
