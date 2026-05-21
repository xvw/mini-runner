const config = {
  // Canvas data
  width       : 720,
  height      : 200,
  ground_h    : 16,
  player_h    : 54,
  player_w    : 32,
  cloud_rayon : 20,
  obstacle_h  : 20,
  obstacle_w  : 15,

  // Character
  gravity  : 12,
  inertia  : 180,
  walkrate : 24,

  // Colors (for boxes)
  colors : {
    player   : '#DBDFE8',
    cloud    : '#DBDFE8',
    ground   : '#24476F',
    score    : '#ECD900',
    obstacle : '#DBDFE8'
  }
}

export default config
