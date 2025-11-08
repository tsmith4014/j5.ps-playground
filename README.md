# Creative Coding Playground

Welcome to your p5.js creative coding workspace! This is your sandbox for exploring generative art, animations, and interactive visualizations.

## Getting Started

1. **Open `index.html` in your browser**

   - Just double-click the file, or
   - Use a local server: `python3 -m http.server 8000` then visit `http://localhost:8000`
   - A live demo of what you are building is here - https://tsmith4014.github.io/j5.ps-playground/

2. **Explore the examples**

   - Click through the different animation buttons
   - Move your mouse around to see interactions
   - Open the browser console (F12) to see any debug info

3. **Start modifying**
   - Open `sketches.js` in your editor
   - Make changes and refresh the browser to see results
   - Experiment with numbers, colors, and behavior

## The 5 Example Sketches

### 1. Waves

**Concepts:** Sine functions, animation timing, color gradients

- Shows how to create flowing, organic motion
- Demonstrates layering and mathematical curves
- **Try changing:** Wave amplitude, speed, number of layers

### 2. Particles

**Concepts:** Object-oriented programming, physics simulation, arrays

- Particle system that responds to mouse position
- Shows how to manage many objects efficiently
- **Try changing:** Particle colors, attraction strength, spawn rate

### 3. Spiral

**Concepts:** Polar coordinates, rotation, mathematical patterns

- Creates mesmerizing spiraling patterns
- Demonstrates coordinate transformations
- **Try changing:** Spiral speed, radius growth, point size

### 4. Dancing Grid

**Concepts:** 2D loops, Perlin noise, responsive interaction

- Grid of shapes that react to mouse position
- Uses noise for smooth, natural-looking randomness
- **Try changing:** Grid resolution, rotation speed, shape sizes

### 5. Mouse Trail

**Concepts:** Smooth interpolation, trails, custom rendering

- Creates flowing ribbons that follow your mouse
- Shows lerping for smooth animation
- **Try changing:** Trail length, smoothing amount, colors

## Your Learning Path

### Phase 1: Understand the Basics (You are here!)

- [ ] Run all 5 example sketches
- [ ] Read through the code comments
- [ ] Make small tweaks to numbers and see what happens
- [ ] Understand `setup()` vs `draw()`

### Phase 2: Modify & Experiment

- [ ] Change colors in each sketch
- [ ] Adjust speeds and sizes
- [ ] Add your own variations
- [ ] Combine elements from different sketches

### Phase 3: Create Your Own

- [ ] Start with a blank sketch
- [ ] Implement a simple shape animation
- [ ] Add mouse or keyboard interaction
- [ ] Create something completely unique

### Phase 4: Advanced Concepts

- [ ] Work with images and textures
- [ ] Add sound/music visualization
- [ ] Create 3D graphics (p5.js supports WebGL)
- [ ] Build interactive art installations

## Core p5.js Concepts Reference

### Canvas & Drawing

```javascript
createCanvas(width, height); // Create drawing area
background(color); // Clear background
fill(color); // Set fill color
stroke(color); // Set outline color
noFill() / noStroke(); // Disable fill/stroke
```

### Shapes

```javascript
circle(x, y, diameter);
rect(x, y, width, height);
ellipse(x, y, width, height);
line(x1, y1, x2, y2);
triangle(x1, y1, x2, y2, x3, y3);
```

### Animation & Interaction

```javascript
mouseX, mouseY; // Current mouse position
pmouseX, pmouseY; // Previous mouse position
mouseIsPressed; // Boolean for mouse state
keyIsPressed; // Boolean for key state
frameCount; // Number of frames drawn
```

### Math & Utility

```javascript
map(value, start1, stop1, start2, stop2); // Remap numbers
lerp(start, stop, amount); // Linear interpolation
dist(x1, y1, x2, y2); // Distance between points
sin(), cos(), tan(); // Trigonometry
noise(x, y, z); // Perlin noise
random(min, max); // Random numbers
```

## Experimentation Ideas

1. **Change colors dynamically**

   - Use `colorMode(HSB)` for easier color manipulation
   - Animate hue values for rainbow effects
   - Map colors to mouse position or time

2. **Add randomness vs noise**

   - `random()` gives jumpy, chaotic results
   - `noise()` gives smooth, natural-looking results
   - Experiment with both

3. **Create rhythm and patterns**

   - Use `sin()` and `cos()` for oscillation
   - Use modulo `%` for repeating patterns
   - Combine multiple waves for complexity

4. **Make it interactive**
   - Track mouse movement
   - Respond to clicks
   - Use keyboard for controls

## Resources for Learning More

- **p5.js Reference**: https://p5js.org/reference/
- **p5.js Examples**: https://p5js.org/examples/
- **The Coding Train** (YouTube): Amazing p5.js tutorials by Daniel Shiffman
- **OpenProcessing**: https://openprocessing.org/ - Community of creative coders
- **Book**: "The Nature of Code" by Daniel Shiffman (free online)

## Tips

1. **Start small**: Don't try to build everything at once. Master one concept before moving on.

2. **Embrace happy accidents**: Sometimes the best art comes from bugs or unexpected results.

3. **Use console.log()**: When something isn't working, print values to understand what's happening.

4. **Study examples**: When you see cool sketches online, try to recreate them to learn techniques.

5. **Iterate rapidly**: Make a change, refresh, see result. The faster this loop, the more you learn.

6. **Save your progress**: When you create something you like, save it as a new file!

## Next Steps

Ready to create? Here's what I recommend:

1. Spend 10-15 minutes with each example sketch
2. Change at least 5 values in each to see what happens
3. Pick your favorite sketch and make it "yours" by customizing it heavily
4. Then try creating a blank sketch from scratch

Remember: There's no "wrong" in creative coding. If it looks interesting to you, it's art!

---
