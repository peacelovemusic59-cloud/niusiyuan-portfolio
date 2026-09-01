const stage = document.querySelector('.stage-image');
const count = document.querySelector('.stage-count');
const name = document.querySelector('.stage-name');
const projects = [...document.querySelectorAll('.project')];

const updateStage = () => {
  const middle = innerHeight * 0.55;
  const active = projects.reduce((closest, project) => {
    const distance = Math.abs(project.getBoundingClientRect().top - middle);
    return distance < closest.distance ? { project, distance } : closest;
  }, { project: projects[0], distance: Infinity }).project;
  const image = active.dataset.image;
  if (stage.dataset.current !== image) {
    stage.dataset.current = image;
    stage.style.opacity = '0';
    setTimeout(() => { stage.style.backgroundImage = `url("${window.PORTFOLIO_ASSETS[image]}")`; stage.style.opacity = '1'; }, 180);
    count.textContent = active.dataset.count;
    name.textContent = active.dataset.name;
  }
};

document.querySelectorAll('[data-asset]').forEach((element) => { element.src = window.PORTFOLIO_ASSETS[element.dataset.asset]; });
document.querySelectorAll('[data-asset-link]').forEach((element) => { element.href = window.PORTFOLIO_ASSETS[element.dataset.assetLink]; });
stage.style.backgroundImage = `url("${window.PORTFOLIO_ASSETS['strategy-1.jpg']}")`;
stage.dataset.current = 'strategy-1.jpg';
addEventListener('scroll', updateStage, { passive: true });
addEventListener('resize', updateStage);
updateStage();

