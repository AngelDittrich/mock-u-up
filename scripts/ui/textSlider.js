/**
 * TextSliderUpper - Animates text by wrapping characters with animation delays
 */
export class TextSliderUpper {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.delay = 40; // ms between characters
    this._wrapContent();
  }

  /**
   * Wrap content by splitting into words and characters
   * @private
   */
  _wrapContent() {
    const text = this.wrapper.textContent.trim();
    let delay = 0;
    const out = text.split(' ').map(word => {
      const chars = Array.from(word).map(ch => {
        delay += this.delay;
        return `<span style="animation-delay:${delay}ms">${ch}</span>`;
      }).join('');
      return `<span class="word-wrap">${chars}</span>`;
    }).join(' ');
    this.wrapper.innerHTML = out;
  }

  /**
   * Initialize the animation by adding the 'show' class
   */
  init() {
    this.wrapper.classList.add('show');
  }
}

