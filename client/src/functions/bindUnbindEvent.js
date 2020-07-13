/**
 *
 * @param {function} functionToBind function used to handle the click
 *
 * this function purpose is to bind event listener on click and unbind when user clicks outside
 */
function bindUnbindEvent(functionToBind) {
  // Bind the event listener
  document.addEventListener('mousedown', functionToBind);
  return () => {
    // Unbind the event listener on clean up
    document.removeEventListener('mousedown', functionToBind);
  };
}
export default bindUnbindEvent;
