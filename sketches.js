// ============================================================================
// CREATIVE CODING PLAYGROUND - p5.js Sketch Collection
// ============================================================================
// This file contains multiple interactive sketches demonstrating different
// creative coding concepts. Each sketch is fully adjustable through both
// code and UI controls.
// ============================================================================

const sketches = {};

// ============================================================================
// SKETCH 1: FLOWING WAVES
// ============================================================================
// CONCEPTS: Sine waves, color gradients, animation timing, layering
// DIFFICULTY: Beginner-Intermediate
//
// WHAT IT DOES:
// - Creates multiple layers of flowing sine waves
// - Each layer has different frequency and amplitude
// - Colors transition smoothly using HSB color mapping
// - Waves move continuously over time
//
// KEY ADJUSTABLE PARAMETERS:
// - numLayers: Number of wave layers (try 5-20)
// - waveSpeed: How fast waves move (try 0.01-0.1)
// - waveAmplitude: Height of waves (try 40-150)
// - layerSpacing: Vertical distance between layers (try 20-50)
// - strokeThickness: Line thickness (try 1-5)
// ============================================================================

sketches.waves = function (p) {
  // ===== ADJUSTABLE PARAMETERS =====
  let params = {
    numLayers: 10, // ADJUST: Number of wave layers to draw
    waveSpeed: 0.05, // ADJUST: Animation speed (higher = faster)
    waveAmplitude: 80, // ADJUST: Wave height (primary wave)
    secondaryAmplitude: 40, // ADJUST: Wave height (secondary wave)
    layerSpacing: 30, // ADJUST: Vertical distance between layers
    strokeThickness: 2, // ADJUST: Line thickness
    colorStart: 180, // ADJUST: Starting hue (HSB color)
    colorEnd: 320, // ADJUST: Ending hue (HSB color)
  };

  let time = 0; // Animation timer - increments each frame

  p.setup = function () {
    p.createCanvas(800, 600);
    p.noFill(); // Waves are outlines only (no fill)
    p.strokeWeight(params.strokeThickness);
  };

  p.draw = function () {
    // BACKGROUND: Dark blue gradient - creates "ocean" feel
    // RGB values (10, 10, 30) = very dark blue
    p.background(10, 10, 30);

    // LOOP: Draw each wave layer
    for (let i = 0; i < params.numLayers; i++) {
      p.beginShape(); // Start drawing a continuous line

      // COLOR: Map layer index to color gradient
      // p.map converts layer number (i) to a hue value
      // Result: First layer = cyan (180), last layer = magenta (320)
      let hue = p.map(
        i,
        0,
        params.numLayers,
        params.colorStart,
        params.colorEnd
      );
      p.stroke(hue, 80, 90); // HSB: hue, saturation, brightness

      // INNER LOOP: Draw points along the wave from left to right
      for (let x = 0; x <= p.width; x += 5) {
        // WAVE CALCULATION: Combine two sine waves for complexity
        //
        // Primary wave: sin(x * 0.01 + time * speed + layer_offset)
        //   - x * 0.01: Frequency (how many peaks across screen)
        //   - time * speed: Makes it move horizontally
        //   - i * 0.3: Phase offset (layers don't sync perfectly)
        //
        // Secondary wave: Smaller, different frequency, adds organic feel
        let y =
          p.height / 2 + // Start at center of screen
          p.sin(x * 0.01 + time * params.waveSpeed + i * 0.3) *
            params.waveAmplitude +
          p.sin(x * 0.02 + time * (params.waveSpeed * 0.6) + i * 0.5) *
            params.secondaryAmplitude;

        // Add vertical spacing between layers
        p.vertex(x, y + i * params.layerSpacing);
      }
      p.endShape();
    }

    time++; // Increment timer for next frame
  };

  // Allow external control updates
  p.updateParams = function (newParams) {
    Object.assign(params, newParams);
    p.strokeWeight(params.strokeThickness);
  };
};

// ============================================================================
// SKETCH 2: PARTICLE SYSTEM
// ============================================================================
// CONCEPTS: Object-oriented programming, arrays, physics simulation,
//           mouse interaction, fade effects
// DIFFICULTY: Intermediate
//
// WHAT IT DOES:
// - Spawns particles at mouse position continuously
// - Each particle has random velocity and color
// - Particles are attracted toward mouse when nearby
// - Particles fade out over time and get removed
// - Creates trailing, swirling effects
//
// KEY ADJUSTABLE PARAMETERS:
// - spawnRate: How often to spawn particles (try 1-10)
// - fadeSpeed: How fast particles disappear (try 1-5)
// - attractionRadius: Distance for mouse attraction (try 100-400)
// - attractionStrength: How strongly particles are pulled (try 0.00001-0.001)
// - velocityRange: Initial particle speed (try 1-5)
// ============================================================================

sketches.particles = function (p) {
  // ===== ADJUSTABLE PARAMETERS =====
  let params = {
    spawnRate: 2, // ADJUST: Spawn every N frames (lower = more particles)
    fadeSpeed: 2, // ADJUST: How fast alpha decreases (higher = faster fade)
    attractionRadius: 200, // ADJUST: Distance where mouse attraction occurs
    attractionStrength: 0.0001, // ADJUST: Force of attraction (higher = stronger pull)
    velocityRange: 2, // ADJUST: Random initial velocity range
    minSize: 3, // ADJUST: Minimum particle size
    maxSize: 8, // ADJUST: Maximum particle size
    trailAlpha: 25, // ADJUST: Background transparency (lower = longer trails)
  };

  let particles = []; // Array to store all active particles

  // ===== PARTICLE CLASS =====
  // Each particle is an independent object with its own properties
  class Particle {
    constructor(x, y) {
      // POSITION: Where particle is created (usually mouse position)
      this.x = x;
      this.y = y;

      // VELOCITY: Random starting direction and speed
      // p.random(-N, N) gives random value between -N and N
      this.vx = p.random(-params.velocityRange, params.velocityRange);
      this.vy = p.random(-params.velocityRange, params.velocityRange);

      // FADE: Starts fully opaque (255), decreases to 0
      this.alpha = 255;

      // SIZE: Random diameter for variety
      this.size = p.random(params.minSize, params.maxSize);

      // COLOR: Random pastel-ish colors
      // R: 200-255 (bright red channel)
      // G: 100-200 (medium green channel)
      // B: 200-255 (bright blue channel)
      // Result: Pink, purple, cyan tones
      this.color = p.color(
        p.random(200, 255),
        p.random(100, 200),
        p.random(200, 255)
      );
    }

    // UPDATE: Called every frame to move particle and handle physics
    update() {
      // MOVEMENT: Add velocity to position (basic physics)
      this.x += this.vx;
      this.y += this.vy;

      // FADE: Decrease alpha over time (particle disappears)
      this.alpha -= params.fadeSpeed;

      // MOUSE ATTRACTION: Pull particles toward mouse if close enough
      let dx = p.mouseX - this.x; // Horizontal distance to mouse
      let dy = p.mouseY - this.y; // Vertical distance to mouse
      let distance = p.sqrt(dx * dx + dy * dy); // Pythagorean theorem

      // Only apply attraction if within radius
      if (distance < params.attractionRadius) {
        // Add force proportional to distance (closer = stronger)
        this.vx += dx * params.attractionStrength;
        this.vy += dy * params.attractionStrength;
      }
    }

    // DISPLAY: Draw the particle on screen
    display() {
      p.noStroke();
      this.color.setAlpha(this.alpha); // Set transparency based on fade
      p.fill(this.color);
      p.circle(this.x, this.y, this.size);
    }

    // LIFECYCLE: Check if particle should be removed
    isDead() {
      return this.alpha <= 0; // Remove when fully transparent
    }
  }

  p.setup = function () {
    p.createCanvas(800, 600);
    p.background(20);
  };

  p.draw = function () {
    // BACKGROUND: Semi-transparent to create trail effect
    // Alpha value (4th parameter) controls trail length
    // Lower alpha = longer trails, higher alpha = shorter trails
    p.background(20, 20, 40, params.trailAlpha);

    // SPAWN: Add new particles at mouse position
    // frameCount % N == 0 runs every N frames
    if (p.frameCount % params.spawnRate === 0) {
      particles.push(new Particle(p.mouseX, p.mouseY));
    }

    // UPDATE AND DRAW: Loop through all particles
    // Loop backwards so we can safely remove dead particles
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update(); // Update physics
      particles[i].display(); // Draw particle

      // CLEANUP: Remove dead particles from array
      if (particles[i].isDead()) {
        particles.splice(i, 1); // Remove 1 element at index i
      }
    }

    // DEBUG INFO: Display particle count
    p.fill(255);
    p.noStroke();
    p.textSize(12);
    p.text(`Particles: ${particles.length}`, 10, 20);
  };

  // Allow external control updates
  p.updateParams = function (newParams) {
    Object.assign(params, newParams);
  };
};

// ============================================================================
// SKETCH 3: EXPANDING SPIRAL
// ============================================================================
// CONCEPTS: Polar coordinates, rotation, mathematical patterns, array management
// DIFFICULTY: Intermediate
//
// WHAT IT DOES:
// - Creates points in a spiral pattern using polar coordinates
// - Each point has position calculated from angle and radius
// - Radius grows as angle increases (Archimedean spiral)
// - Colors cycle through rainbow as spiral expands
// - Point size oscillates using sine wave
// - Old points fade and get removed (controlled history)
//
// POLAR COORDINATES EXPLAINED:
// - Instead of (x, y), we use (angle, radius)
// - x = cos(angle) * radius
// - y = sin(angle) * radius
// - As angle increases, we rotate around center
// - As radius increases with angle, we spiral outward
//
// KEY ADJUSTABLE PARAMETERS:
// - spiralSpeed: How fast angle increases (try 0.05-0.3)
// - spiralTightness: Gap between spiral rings (try 0.2-2.0)
// - maxPoints: How many points to keep (try 200-2000)
// - minSize/maxSize: Range of point sizes
// - colorSpeed: How fast colors cycle (try 5-20)
// ============================================================================

sketches.spiral = function (p) {
  // ===== ADJUSTABLE PARAMETERS =====
  let params = {
    spiralSpeed: 0.1, // ADJUST: Angle increment per frame (rotation speed)
    spiralTightness: 0.5, // ADJUST: Radius growth rate (lower = tighter spiral)
    maxPoints: 500, // ADJUST: Number of points to keep in history
    minSize: 2, // ADJUST: Minimum point diameter
    maxSize: 8, // ADJUST: Maximum point diameter
    colorSpeed: 10, // ADJUST: How fast colors cycle (higher = faster)
    fadeAlpha: 10, // ADJUST: Background fade (lower = longer trails)
  };

  let angle = 0; // Current angle (increments over time)
  let points = []; // Array storing point history (x, y, color, size)

  p.setup = function () {
    p.createCanvas(800, 600);
    p.background(15, 15, 25); // Dark purple background
  };

  p.draw = function () {
    // FADE EFFECT: Semi-transparent background creates ghosting
    // Lower alpha = points fade slower = longer trails
    p.background(15, 15, 25, params.fadeAlpha);

    // COORDINATE TRANSFORM: Move origin to center of canvas
    // Now (0, 0) is center instead of top-left corner
    p.translate(p.width / 2, p.height / 2);

    // SPIRAL CALCULATION: Convert polar to cartesian coordinates
    // radius = angle * tightness (linear growth = Archimedean spiral)
    let radius = angle * params.spiralTightness;

    // POSITION: Polar to Cartesian conversion
    // cos(angle) gives x-position on unit circle, multiply by radius
    // sin(angle) gives y-position on unit circle, multiply by radius
    let x = p.cos(angle) * radius;
    let y = p.sin(angle) * radius;

    // COLOR: Map angle to hue value (creates rainbow)
    // Modulo (%) wraps value back to 0 when it exceeds 360
    // Result: Colors cycle continuously as spiral grows
    let hue = (angle * params.colorSpeed) % 360;

    // SIZE: Oscillate size using sine wave
    // sin(angle * 0.1) creates slow size pulsing
    // p.map converts sine output (-1 to 1) to size range (min to max)
    let size = p.map(p.sin(angle * 0.1), -1, 1, params.minSize, params.maxSize);

    // STORE POINT: Add to array with all its properties
    points.push({
      x: x,
      y: y,
      hue: hue,
      size: size,
    });

    // MEMORY MANAGEMENT: Remove oldest point when we exceed max
    // shift() removes first element (FIFO - First In First Out)
    if (points.length > params.maxPoints) {
      points.shift();
    }

    // DRAW ALL POINTS: Loop through entire history
    p.noStroke();
    for (let i = 0; i < points.length; i++) {
      let pt = points[i];

      // FADE IN: Newer points are brighter than older points
      // Maps index to alpha (0 to points.length → 50 to 255)
      // Oldest point (index 0) = dim, newest point (last index) = bright
      let alpha = p.map(i, 0, points.length, 50, 255);

      // DRAW: HSB color with calculated alpha
      p.fill(pt.hue % 255, 200, 255, alpha);
      p.circle(pt.x, pt.y, pt.size);
    }

    // INCREMENT: Move to next angle (makes spiral grow)
    angle += params.spiralSpeed;
  };

  // Allow external control updates
  p.updateParams = function (newParams) {
    Object.assign(params, newParams);
  };
};

// ============================================================================
// SKETCH 4: DANCING GRID
// ============================================================================
// CONCEPTS: 2D loops, Perlin noise, color theory, transformations, HSB color
// DIFFICULTY: Intermediate-Advanced
//
// WHAT IT DOES:
// - Creates a grid of rotating squares
// - Size of each square determined by Perlin noise (smooth randomness)
// - Color changes based on distance from mouse
// - Rotation animated using noise + time
// - Creates organic, flowing patterns despite being a grid
//
// PERLIN NOISE EXPLAINED:
// - Unlike random(), noise() gives smooth, natural-looking values
// - Same input = same output (deterministic)
// - Similar inputs = similar outputs (continuous)
// - Perfect for natural-looking animation and terrain
// - Takes up to 3 parameters: noise(x, y, z) for 3D noise space
//
// HSB COLOR EXPLAINED:
// - H (Hue): Color itself (0-360 degrees on color wheel)
// - S (Saturation): Intensity/purity (0=gray, 100=vivid)
// - B (Brightness): Light/dark (0=black, 100=full brightness)
// - Easier than RGB for color transitions and effects
//
// KEY ADJUSTABLE PARAMETERS:
// - cols/rows: Grid dimensions (try 10-40)
// - noiseScale: Smoothness of noise (try 0.05-0.3)
// - rotationSpeed: How fast shapes rotate (try 0.005-0.05)
// - minSize/maxSize: Range of shape sizes
// ============================================================================

sketches.grid = function (p) {
  // ===== ADJUSTABLE PARAMETERS =====
  let params = {
    cols: 20, // ADJUST: Number of columns in grid
    rows: 15, // ADJUST: Number of rows in grid
    noiseScale: 0.1, // ADJUST: Perlin noise frequency (lower = smoother)
    timeSpeed: 0.01, // ADJUST: Animation speed (higher = faster changes)
    rotationSpeed: 0.01, // ADJUST: Base rotation speed
    minSize: 10, // ADJUST: Minimum square size
    saturation: 70, // ADJUST: Color intensity (0-100)
    brightness: 90, // ADJUST: Color brightness (0-100)
    cornerRadius: 5, // ADJUST: Rounded corners (0 = sharp)
  };

  let cellSize; // Width/height of each grid cell (calculated)
  let time = 0; // Animation timer for noise/rotation

  p.setup = function () {
    p.createCanvas(800, 600);
    cellSize = p.width / params.cols;

    // HSB COLOR MODE: Easier to work with for color cycling
    // Parameters: (max hue, max saturation, max brightness)
    p.colorMode(p.HSB, 360, 100, 100);
  };

  p.draw = function () {
    p.background(0); // Black background

    // NESTED LOOPS: Iterate through every cell in grid
    // Outer loop: columns (left to right)
    // Inner loop: rows (top to bottom)
    for (let i = 0; i < params.cols; i++) {
      for (let j = 0; j < params.rows; j++) {
        // POSITION: Calculate center of current cell
        // i * cellSize = left edge of cell
        // + cellSize / 2 = moves to center
        let x = i * cellSize + cellSize / 2;
        let y = j * cellSize + cellSize / 2;

        // PERLIN NOISE: Get smooth random value for this cell
        // 3D noise(x, y, z): x and y = grid position, z = time
        // Multiplying by noiseScale changes "zoom level" of noise
        // Result: Value between 0 and 1
        let noiseVal = p.noise(
          i * params.noiseScale, // X in noise space
          j * params.noiseScale, // Y in noise space
          time * params.timeSpeed // Z in noise space (time dimension)
        );

        // SIZE: Map noise value to size range
        // noise returns 0-1, we map to minSize to (cellSize - 5)
        // -5 prevents squares from touching
        let size = p.map(noiseVal, 0, 1, params.minSize, cellSize - 5);

        // COLOR: Calculate distance from mouse
        // p.dist() uses Pythagorean theorem: √((x2-x1)² + (y2-y1)²)
        let d = p.dist(x, y, p.mouseX, p.mouseY);

        // HUE: Map distance to color
        // Close to mouse = low hue (red/orange)
        // Far from mouse = high hue (blue/purple)
        // Creates a color gradient radiating from mouse
        let hue = p.map(d, 0, p.width, 0, 360);

        // ROTATION: Combine noise and time for organic rotation
        // noiseVal * TWO_PI = base rotation from noise (0 to 2π)
        // time * rotationSpeed = continuous rotation over time
        let rotation = noiseVal * p.TWO_PI + time * params.rotationSpeed;

        // TRANSFORMATION BLOCK: push/pop create isolated coordinate system
        p.push();

        // TRANSLATE: Move origin to cell center
        p.translate(x, y);

        // ROTATE: Spin the coordinate system
        p.rotate(rotation);

        // DRAW: Rectangle at (0,0) because we translated
        p.fill(hue, params.saturation, params.brightness);
        p.noStroke();
        p.rectMode(p.CENTER); // Draw rect centered on (0,0)
        p.rect(0, 0, size, size, params.cornerRadius);

        p.pop(); // Restore original coordinate system
      }
    }

    time++; // Increment time for next frame
  };

  // Allow external control updates
  p.updateParams = function (newParams) {
    Object.assign(params, newParams);
    if (newParams.cols || newParams.rows) {
      cellSize = p.width / params.cols;
    }
  };
};

// ============================================================================
// SKETCH 5: MOUSE TRAIL
// ============================================================================
// CONCEPTS: Mouse interaction, lerping (smooth interpolation), arrays,
//           gradient effects, layered rendering
// DIFFICULTY: Intermediate
//
// WHAT IT DOES:
// - Creates a smooth cursor that follows your mouse with a delay
// - Records position history in an array (trail)
// - Draws connecting lines between trail points
// - Lines get thicker and brighter toward the cursor
// - Colors shift through rainbow gradient
// - Overlays circles at each trail point for ribbon effect
//
// LERP (LINEAR INTERPOLATION) EXPLAINED:
// - lerp(a, b, amount) returns value between a and b
// - amount = 0 returns a, amount = 1 returns b
// - amount = 0.5 returns middle between a and b
// - Using lerp creates smooth, eased motion
// - Example: lerp(0, 100, 0.1) = 10 (10% of the way from 0 to 100)
// - In animation: currentValue = lerp(currentValue, targetValue, 0.1)
//   Result: Gradually moves toward target, slowing as it gets closer
//
// KEY ADJUSTABLE PARAMETERS:
// - maxTrail: Number of trail points (try 20-100)
// - smoothAmount: How closely cursor follows mouse (try 0.05-0.3)
// - lineWeightMin/Max: Thickness range for lines
// - circleMin/Max: Size range for circles
// - colorStart/End: Hue range for gradient
// ============================================================================

sketches.mouse = function (p) {
  // ===== ADJUSTABLE PARAMETERS =====
  let params = {
    maxTrail: 50, // ADJUST: Number of points in trail history
    smoothAmount: 0.1, // ADJUST: Lerp amount (lower = smoother/laggier)
    fadeAlpha: 30, // ADJUST: Background fade (lower = longer persist)
    lineWeightMin: 1, // ADJUST: Thinnest line (trail start)
    lineWeightMax: 8, // ADJUST: Thickest line (trail end)
    circleMin: 5, // ADJUST: Smallest circle size
    circleMax: 20, // ADJUST: Largest circle size
    colorStart: 180, // ADJUST: Starting hue (cyan)
    colorEnd: 320, // ADJUST: Ending hue (magenta)
    cursorSize: 25, // ADJUST: Main cursor size
    cursorInnerSize: 10, // ADJUST: Cursor center dot size
  };

  let trail = []; // Array storing position history [{x, y}, {x, y}, ...]
  let smoothX = 0; // Smoothed cursor X position
  let smoothY = 0; // Smoothed cursor Y position

  p.setup = function () {
    p.createCanvas(800, 600);
    p.background(25, 25, 50); // Dark blue-purple background

    // INITIALIZE: Start smooth cursor at center
    smoothX = p.width / 2;
    smoothY = p.height / 2;
  };

  p.draw = function () {
    // FADE BACKGROUND: Semi-transparent overlay creates trail fade
    // Lower alpha = trails persist longer before fading
    p.background(25, 25, 50, params.fadeAlpha);

    // SMOOTH FOLLOWING: Use lerp for eased motion
    // Instead of: smoothX = mouseX (instant jump)
    // We use: smoothX = lerp(smoothX, mouseX, 0.1)
    // Result: Cursor gradually "catches up" to mouse
    // The lower smoothAmount, the more laggy/smooth the motion
    smoothX = p.lerp(smoothX, p.mouseX, params.smoothAmount);
    smoothY = p.lerp(smoothY, p.mouseY, params.smoothAmount);

    // RECORD POSITION: Add current smooth position to trail history
    trail.push({ x: smoothX, y: smoothY });

    // LIMIT TRAIL: Remove oldest point when we exceed max length
    // shift() removes first element (FIFO queue)
    if (trail.length > params.maxTrail) {
      trail.shift();
    }

    // ===== LAYER 1: CONNECTING LINES =====
    // Draw lines between consecutive trail points
    // Creates flowing ribbon effect
    p.noFill();
    for (let i = 0; i < trail.length - 1; i++) {
      // GRADIENT: Map position in trail to visual properties
      // Older points (low i) = thin, transparent, cyan
      // Newer points (high i) = thick, opaque, magenta

      // ALPHA: Fade from transparent to opaque
      let alpha = p.map(i, 0, trail.length, 0, 255);

      // LINE WEIGHT: Thin to thick creates tapering effect
      let weight = p.map(
        i,
        0,
        trail.length,
        params.lineWeightMin,
        params.lineWeightMax
      );

      // HUE: Cycle through color gradient
      let hue = p.map(i, 0, trail.length, params.colorStart, params.colorEnd);

      // DRAW LINE: Connect this point to next point
      p.stroke(hue, 200, 255, alpha);
      p.strokeWeight(weight);
      p.line(trail[i].x, trail[i].y, trail[i + 1].x, trail[i + 1].y);
    }

    // ===== LAYER 2: CIRCLE OVERLAY =====
    // Draw circles at each trail point
    // Adds depth and visual interest to ribbon
    for (let i = 0; i < trail.length; i++) {
      // SIZE: Small to large creates widening effect
      let size = p.map(i, 0, trail.length, params.circleMin, params.circleMax);

      // HUE: Slightly different gradient than lines
      // Creates subtle color variation
      let hue = p.map(
        i,
        0,
        trail.length,
        params.colorEnd - 40,
        params.colorStart + 20
      );

      // DRAW CIRCLE: Semi-transparent for layering effect
      p.fill(hue, 200, 255, 200);
      p.noStroke();
      p.circle(trail[i].x, trail[i].y, size);
    }

    // ===== LAYER 3: MAIN CURSOR =====
    // Draw a two-layer cursor at smooth position

    // Outer circle: Bright magenta
    p.fill(320, 255, 255);
    p.circle(smoothX, smoothY, params.cursorSize);

    // Inner circle: White center
    p.fill(255);
    p.circle(smoothX, smoothY, params.cursorInnerSize);
  };

  // Allow external control updates
  p.updateParams = function (newParams) {
    Object.assign(params, newParams);
  };
};
