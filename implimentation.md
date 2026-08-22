Step-by-Step: Building Infinite Canvas Drag-to-Pan
Step 1: The HTML Structure
Two divs — one clips, one moves:
// The OUTER div = viewport (clips content)
<div style={{ 
  width: '100vw', 
  height: '100vh', 
  overflow: 'hidden',
  position: 'relative'
}}>

  // The INNER div = canvas (moves via transform)
  <div style={{
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    position: 'absolute',
    // No width/height — it's infinite
  }}>
    {/* All your content goes here */}
  </div>
</div>
Why this works:
- Outer div has overflow: hidden → clips anything outside viewport
- Inner div moves via transform: translate() → everything inside moves together
- Content inside uses position: absolute with left/top values → placed anywhere on infinite plane
Step 2: Track Mouse Drag
State + event handlers:
const [offset, setOffset] = useState({ x: 0, y: 0 });
const [isDragging, setIsDragging] = useState(false);
const lastMouse = useRef({ x: 0, y: 0 });

const handleMouseDown = (e: MouseEvent) => {
  setIsDragging(true);
  lastMouse.current = { x: e.clientX, y: e.clientY };
};

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging) return;
  
  const dx = e.clientX - lastMouse.current.x;
  const dy = e.clientY - lastMouse.current.y;
  
  setOffset(prev => ({
    x: prev.x + dx,
    y: prev.y + dy
  }));
  
  lastMouse.current = { x: e.clientX, y: e.clientY };
};

const handleMouseUp = () => {
  setIsDragging(false);
};
The math:
- dx = currentX - lastX → how far mouse moved since last frame
- offset.x += dx → move canvas by same amount
- Result: canvas follows mouse exactly
Step 3: Add Inertia (Smooth Stop)
When user releases mouse, canvas keeps moving then slows down:
const velocity = useRef({ x: 0, y: 0 });
const animationFrame = useRef<number>();

// In handleMouseMove, calculate velocity:
const dx = e.clientX - lastMouse.current.x;
const dy = e.clientY - lastMouse.current.y;

velocity.current = { x: dx, y: dy }; // Store velocity

// In handleMouseUp, start inertia:
const animate = () => {
  velocity.current.x *= 0.95; // Friction (decay by 5%)
  velocity.current.y *= 0.95;
  
  if (Math.abs(velocity.current.x) > 0.1 || 
      Math.abs(velocity.current.y) > 0.1) {
    setOffset(prev => ({
      x: prev.x + velocity.current.x,
      y: prev.y + velocity.current.y
    }));
    animationFrame.current = requestAnimationFrame(animate);
  }
};

animationFrame.current = requestAnimationFrame(animate);
Why:
- velocity tracks last mouse movement speed
- After release, keep applying velocity with decay (*= 0.95)
- Stop when velocity near zero
- requestAnimationFrame = smooth 60fps animation
Step 4: Navigation (Pan to Section)
Function to smoothly move to a specific coordinate:
const panTo = (targetX: number, targetY: number) => {
  const startX = offset.x;
  const startY = offset.y;
  const duration = 1000; // ms
  const startTime = Date.now();
  
  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease-out cubic (decelerate)
    const ease = 1 - Math.pow(1 - progress, 3);
    
    setOffset({
      x: startX + (targetX - startX) * ease,
      y: startY + (targetY - startY) * ease
    });
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  
  requestAnimationFrame(animate);
};

// Usage:
<button onClick={() => panTo(-400, -600)}>Go to About</button>
Why:
- Linear interpolation (lerp) from start to target
- Ease-out curve = starts fast, ends slow (natural feel)
- requestAnimationFrame = smooth animation
Step 5: Position Content on Canvas
Each section gets absolute position:
// Hero at center
<div style={{ position: 'absolute', left: 0, top: 0 }}>
  Hi! I make cook stuff
</div>

// About section (above hero)
<div style={{ position: 'absolute', left: -200, top: -600 }}>
  About me...
</div>

// Projects (left of hero)
<div style={{ position: 'absolute', left: -800, top: 200 }}>
  Projects...
</div>
Step 6: Touch Support (Mobile)
Same logic, different events:
const handleTouchStart = (e: TouchEvent) => {
  setIsDragging(true);
  lastMouse.current = { 
    x: e.touches[0].clientX, 
    y: e.touches[0].clientY 
  };
};

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging) return;
  
  const dx = e.touches[0].clientX - lastMouse.current.x;
  const dy = e.touches[0].clientY - lastMouse.current.y;
  
  setOffset(prev => ({
    x: prev.x + dx,
    y: prev.y + dy
  }));
  
  lastMouse.current = { 
    x: e.touches[0].clientX, 
    y: e.touches[0].clientY 
  };
};
