(function(){
  const baseSize = 100;
  function setRem(){
	const sacle = document.documentElement.clientWidth / 750;
	document.documentElement.style.fontSize = (baseSize * Math.min(sacle,1)) + 'px';
  }
  setRem();
  window.onresize = function(){
	setRem();
  };
})()

