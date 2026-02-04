/**
 * Projects section: animate cards with Motion (motion.dev).
 * Runs when 'projects-rendered' fires, or on load if cards are already in the DOM.
 */
import { animate, stagger } from 'https://cdn.jsdelivr.net/npm/motion@12/+esm';

function runProjectsEffect() {
  var cards = document.querySelectorAll('#projects-grid .project-card-motion');
  if (cards.length === 0) return;
  // Keyframes: animate from [0, 20px] to [1, 0]. No CSS hiding so cards stay visible if Motion never runs.
  animate('#projects-grid .project-card-motion', { opacity: [0, 1], y: [20, 0] }, {
    delay: stagger(0.08),
    duration: 0.4,
    ease: 'easeOut'
  });
}

document.addEventListener('projects-rendered', runProjectsEffect);
// If the event fired before this script loaded, cards are already in the DOM — run after a short delay
setTimeout(runProjectsEffect, 400);
