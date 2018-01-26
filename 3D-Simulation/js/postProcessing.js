var dof,postprocessing = {};
function initPostProcessing() {
  console.log(THREE.BokehPass);

  var composer = new THREE.EffectComposer(renderer);
  var renderPass = new THREE.RenderPass(scene, camera);
  var bokehPass = new THREE.BokehPass(scene, camera, {
    focus: 1.0,
    aperture: 0.0000000001,
    maxblur: 0.00999,
    width: WIDTH,
    height: HEIGHT,
  });

  bokehPass.renderToScreen = true;

  composer.addPass( renderPass );
  composer.addPass( bokehPass );

  postprocessing.composer = composer;
  postprocessing.bokeh = bokehPass;
}