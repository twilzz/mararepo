/* eslint-disable camelcase */
export default function clamp(x, from_x, to_x) {
  // eslint-disable-next-line no-param-reassign
  if (x < from_x) x = from_x;
  // eslint-disable-next-line no-param-reassign
  if (x > to_x) x = to_x;

  return x;
}

export function animateEx(dx, startTime, currentTime, speed, looped = false) {
  const diff = currentTime - startTime;
  let time = (speed && diff / speed) || 0;
  if (looped) {
    time %= 1;
  } else if (time > 1) {
    time = 1;
  }
  return { offset: dx * time, progress: time };
}
