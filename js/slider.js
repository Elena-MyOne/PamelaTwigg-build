function setSlider(item, nextButton, prevButton) {
  let itemClassName = `${item}`;
  let items = document.getElementsByClassName(itemClassName);

  let totalItems = items.length;
  let slide = 0;
  let moving = true;

  function setClasses() {
    items[totalItems - 1].classList.add('prev');
    items[0].classList.add('active');
    items[1].classList.add('next');
  }

  function setListeners() {
    const next = document.querySelector(`.${nextButton}`);
    const prev = document.querySelector(`.${prevButton}`);

    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);
  }

  function disableInteraction() {
    moving = true;

    setTimeout(function () {
      moving = false;
    }, 500);
  }

  function moveSliderTo(slide) {
    if (!moving) {
      disableInteraction();

      let newPrevious = slide - 1,
        newNext = slide + 1,
        oldPrevious = slide - 2,
        oldNext = slide + 2;

      // Test if carousel has more than three items
      if (totalItems - 1 > 3) {
        // Checks if the new potential slide is out of bounds and sets slide numbers
        if (newPrevious <= 0) {
          oldPrevious = totalItems - 1;
        } else if (newNext >= totalItems - 1) {
          oldNext = 0;
        }

        // Check if current slide is at the beginning or end and sets slide numbers
        if (slide === 0) {
          newPrevious = totalItems - 1;
          oldPrevious = totalItems - 2;
          oldNext = slide + 1;
        } else if (slide === totalItems - 1) {
          newPrevious = slide - 1;
          newNext = 0;
          oldNext = 1;
        }

        console.log('totalItems: ', totalItems);

        // Now we've worked out where we are and where we're going, by adding and removing classes, we'll be triggering the carousel's transitions.

        // Based on the current slide, reset to default classes.
        items[oldPrevious].className = itemClassName;
        items[oldNext].className = itemClassName;

        // Add the new classes
        items[newPrevious].className = itemClassName + ' prev';
        items[slide].className = itemClassName + ' active';
        items[newNext].className = itemClassName + ' next';
      }
    }

    console.log(items);
  }

  function moveNext() {
    // Check if moving
    console.log('click');
    if (!moving) {
      // If it's the last slide, reset to 0, else +1
      if (slide === totalItems - 1) {
        slide = 0;
      } else {
        slide++;
      }

      // Move carousel to updated slide
      moveSliderTo(slide);
      console.log(slide);
      console.log(moving);
    }
  }

  function movePrev() {
    // Check if moving
    if (!moving) {
      // If it's the first slide, set as the last slide, else -1
      if (slide === 0) {
        slide = totalItems - 1;
      } else {
        slide--;
      }

      // Move carousel to updated slide
      moveSliderTo(slide);
      console.log(slide);
    }
  }

  function initSlider() {
    setClasses();
    setListeners();
    moving = false;
  }

  initSlider();
}

setSlider('corporate__item', 'corporate__button--next', 'corporate__button--prev');
