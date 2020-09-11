import Player from './player';
import Tiles from './tiles';

export default class Controls {
  control = {
    up: false,
    down: false,
    left: false,
    right: false,
  };

  constructor(public player: Player) {
    window.addEventListener('keydown', this.onkeydown);
    window.addEventListener('keyup', this.onkeyup);
    const arrows = document.getElementsByClassName('arrow');
    for (let i = 0; i < arrows.length; i++) {
      arrows[i].addEventListener('touchstart', (e: TouchEvent) => {
        if (e.target != null) {
          let targetEl = <HTMLElement>e.target;
          if (targetEl.tagName === 'svg') {
            if (targetEl.parentElement !== null) {
              targetEl = targetEl.parentElement;
            }
          }
          targetEl.style.background = '#121212';
          this.onkeydown({ keyCode: Number(targetEl.id) });
        }
      });
      arrows[i].addEventListener('touchend', e => {
        if (e.target != null) {
          let targetEl = <HTMLElement>e.target;
          if (targetEl.tagName === 'svg') {
            if (targetEl.parentElement !== null) {
              targetEl = targetEl.parentElement;
            }
          }
          targetEl.style.background = 'none';
          this.onkeyup({ keyCode: Number(targetEl.id) });
        }
      });
    }
  }

  onkeydown = (e: { keyCode: number }): void => {
    // Up (up / W / Z)
    if (e.keyCode === 38 || e.keyCode === 90 || e.keyCode === 87) {
      this.control.up = true;
    }

    // Down (down / S)
    if (e.keyCode == 40 || e.keyCode == 83) {
      this.control.down = true;
    }

    // Right (right / D)
    if (e.keyCode === 39 || e.keyCode === 68) {
      this.control.right = true;
    }

    // Left (left / A / Q)
    if (e.keyCode === 37 || e.keyCode === 65 || e.keyCode === 81) {
      this.control.left = true;
    }
  };

  onkeyup = (e: { keyCode: number }): void => {
    // Up (up / W / Z)
    if (e.keyCode === 38 || e.keyCode === 90 || e.keyCode === 87) {
      this.control.up = false;
    }

    if (e.keyCode == 40 || e.keyCode == 83) {
      this.control.down = false;
    }

    // Right (right / D)
    if (e.keyCode === 39 || e.keyCode === 68) {
      this.control.right = false;
    }

    // Left (left / A / Q)
    if (e.keyCode === 37 || e.keyCode === 65 || e.keyCode === 81) {
      this.control.left = false;
    }

    if (e.keyCode === 32) {
      Tiles.reloadbtn();
      this.player.state.falling = true;
    }

    if (e.keyCode === 82) {
      this.player.dead();
    }
  };

  showControls(): void {
    if (/iPhone|iPad|Android/i.test(navigator.userAgent)) {
      const controlEl = document.getElementById('controls');
      if (controlEl !== null) controlEl.style.visibility = 'visible';
    }
  }
  hideControls(): void {
    if (/iPhone|iPad|Android/i.test(navigator.userAgent)) {
      const controlEl = document.getElementById('controls');
      if (controlEl !== null) controlEl.style.visibility = 'hidden';
    }
  }
}
